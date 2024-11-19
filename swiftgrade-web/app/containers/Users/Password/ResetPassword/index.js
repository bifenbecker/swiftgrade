import React from 'react';
import PropTypes from 'prop-types';
import SubmissionError from 'redux-form/lib/SubmissionError';
import Loading from 'components/Controls/Loading';
import { UserHeaderLayout, UserFooterLayout } from 'components/Layouts';
import { IconResetPassword } from 'components/Svgs';
import { ResetPasswordForm } from 'components/Forms';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getPathAfterAuth } from 'utils/helpers/usersHelper';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { resetForm } from 'containers/App/actions';
import { resetUserPasswordRequest, checkUserVerificationCodeRequest } from 'containers/Users/actions';
import { withStyles } from '@material-ui/core/styles';
import injectSaga from 'utils/injectSaga';
import saga from 'containers/Users/saga';
import { styles } from './styles';

class ResetPassword extends React.Component {
  componentWillMount() {
    const { code } = this.props;

    if (code) {
      this.checkVerificationCode(code);
    }
  }

  componentWillUnmount() {
    this.props.resetForm('ResetPasswordForm');
  }

  checkVerificationCode = code => {
    const { history } = this.props;
    return new Promise(() => {
      const handleErrors = () => {
        history.push('/novalidlink/');
      };
      this.props.checkUserVerificationCodeRequest({
        data: { code, kind: 'password_reset' },
        handleErrors,
      });
    });
  };

  handleSubmit = formData => {
    const { history, user } = this.props;
    const data = formData && formData.toJS ? formData.toJS() : null;
    if (data) {
      return new Promise((resolve, reject) => {
        const handleErrors = response => {
          reject(new SubmissionError(response.errors));
        };
        const handleSuccess = (isUserInfoFilledIn, role) => {
          history.push(getPathAfterAuth(isUserInfoFilledIn, role));
        };
        const userId = user ? user.id : null;
        this.props.resetUserPasswordRequest({ data, userId, handleErrors, handleSuccess });
      });
    }
  };

  render() {
    const { classes, history, user } = this.props;
    const email = user && user.email ? user.email : null;

    if (_.isNull(user)) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }

    return (
      <div className={classes.wrapper_component}>
        <UserHeaderLayout history={history} />
        <div className={classes.reset_password}>
          <div className={classes.reset_password_inner}>
            <IconResetPassword className={classes.reset_main_icon} />
            <div>
              <ResetPasswordForm email={email} onSubmit={this.handleSubmit} />
            </div>
          </div>
        </div>
        <UserFooterLayout />
      </div>
    );
  }
}

ResetPassword.propTypes = {
  classes: PropTypes.object,
  checkUserVerificationCodeRequest: PropTypes.func,
  code: PropTypes.string,
  history: PropTypes.object,
  resetForm: PropTypes.func,
  resetUserPasswordRequest: PropTypes.func,
  user: PropTypes.object,
};

const mapDispatchToProps = {
  checkUserVerificationCodeRequest,
  resetUserPasswordRequest,
  resetForm,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withConnect,
  withSaga,
  withStyles(styles),
)(ResetPassword);
