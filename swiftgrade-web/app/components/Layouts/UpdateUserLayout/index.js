import React from 'react';
import PropTypes from 'prop-types';
import { SubmissionError } from 'redux-form';
import { checkUserVerificationCodeRequest, updateUserRequest } from 'containers/Users/actions';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import injectSaga from 'utils/injectSaga';
import saga from 'containers/Users/saga';
import { isTeacher } from 'utils/helpers/usersHelper';

class UpdateUserLayout extends React.Component {
  componentDidMount() {
    const { code } = this.props;

    if (code) {
      this.checkVerificationCode(code);
    }
  }

  checkVerificationCode = code => {
    const { history } = this.props;
    return new Promise(() => {
      const handleErrors = () => {
        history.push('/novalidlink/');
      };
      const handleSuccess = (isUserInfoFilledIn, role) => {
        if (isUserInfoFilledIn) {
          history.push(role === 'teacher' ? '/teacher/' : `/student/new/`);
        }
      };
      this.props.checkUserVerificationCodeRequest({
        data: { code, kind: 'email_confirmation_for_user' },
        handleSuccess,
        handleErrors,
      });
    });
  };

  updateUser = formData => {
    const { user } = this.props;
    const data = formData && formData.toJS ? formData.toJS() : null;

    if (user) {
      if (data && user.email && !user.username) {
        data.username = user.email;
      }
      return new Promise((resolve, reject) => {
        const handleErrors = response => {
          reject(new SubmissionError(response.errors));
        };
        const handleSuccess = () => {
          const { history } = this.props;
          history.push(isTeacher(user) ? '/teacher/' : `/student/new/`);
        };

        this.props.updateUserRequest({ data, userId: user.id, handleErrors, handleSuccess });
      });
    }
  };

  render() {
    const { children, user } = this.props;
    const content = React.cloneElement(children, { user, updateUser: this.updateUser });
    return content;
  }
}

UpdateUserLayout.propTypes = {
  children: PropTypes.any,
  code: PropTypes.string,
  history: PropTypes.object,
  user: PropTypes.object,
  updateUserRequest: PropTypes.func,
  checkUserVerificationCodeRequest: PropTypes.func,
};

const mapDispatchToProps = {
  checkUserVerificationCodeRequest,
  updateUserRequest,
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
)(UpdateUserLayout);
