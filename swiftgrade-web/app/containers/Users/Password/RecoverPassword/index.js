import React from 'react';
import PropTypes from 'prop-types';
import { UserHeaderLayout, UserFooterLayout } from 'components/Layouts';
import { IconForgotPassword } from 'components/Svgs';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import SubmissionError from 'redux-form/lib/SubmissionError';
import { connect } from 'react-redux';
import { sendPasswordRecoveryLinkRequest } from 'containers/Users/actions';
import { RecoverPasswordForm } from 'components/Forms';
import injectSaga from 'utils/injectSaga';
import saga from 'containers/Users/saga';
import { resetForm } from 'containers/App/actions';
import { styles } from './styles';
import CheckEmailModal from './CheckEmailModal';

class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      isOpen: false,
    };
  }

  componentWillUnmount() {
    this.props.resetForm('RecoverPasswordForm');
  }

  onCheckEmailPopup = () => {
    const { history } = this.props;
    const { email, isOpen } = this.state;
    if (!isOpen) {
      return null;
    }
    return (
      <CheckEmailModal
        history={history}
        email={email}
        isOpen={isOpen}
        onChangeIsOpen={value => this.setState({ isOpen: value })}
      />
    );
  };

  handleSubmit = formData => {
    const data = formData && formData.toJS ? formData.toJS() : null;

    if (data) {
      return new Promise((resolve, reject) => {
        const handleErrors = response => {
          reject(new SubmissionError(response.errors));
        };
        const handleSuccess = () => {
          this.setState({ isOpen: true, email: data.email.toLowerCase() });
        };
        this.props.sendPasswordRecoveryLinkRequest({ data, handleErrors, handleSuccess });
      });
    }
  };

  render() {
    const { classes, history } = this.props;

    return (
      <div className={classes.wrapper_component}>
        <UserHeaderLayout history={history} />
        <div className={classes.forgot_password}>
          <div className={classes.forgot_password_inner}>
            <IconForgotPassword />
            <div>
              <RecoverPasswordForm onSubmit={this.handleSubmit} />
              <div>{this.onCheckEmailPopup()}</div>
            </div>
          </div>
        </div>
        <UserFooterLayout />
      </div>
    );
  }
}

RecoverPassword.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  resetForm: PropTypes.func,
  sendPasswordRecoveryLinkRequest: PropTypes.func,
};

const mapDispatchToProps = {
  resetForm,
  sendPasswordRecoveryLinkRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'users', saga });

export default compose(
  withConnect,
  withSaga,
  withStyles(styles),
)(RecoverPassword);
