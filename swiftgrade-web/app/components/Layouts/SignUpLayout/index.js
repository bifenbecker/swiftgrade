import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { AuthForm, StudentSignUpForm } from 'components/Forms';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';
import { UserHeaderLayout, UserFooterLayout } from 'components/Layouts';
import SubmissionError from 'redux-form/lib/SubmissionError';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { signInRequest, signUpRequest } from 'containers/Users/actions';
import { getPathAfterAuth, updateLoginDeviceType } from 'utils/helpers/usersHelper';
import { withStyles } from '@material-ui/core';
import injectSaga from 'utils/injectSaga';
import saga from 'containers/Users/saga';
import AuthButtonsView from 'containers/Users/Views/AuthButtonsView';
import { styles } from './styles';
import messages from './messages';
import { LINKS, MESSAGES, META_TEXTS } from './constants';

class SignUpLayout extends Component {
  signIn = (data, key) =>
    new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };
      const handleSuccess = (isUserInfoFilledIn, role) => {
        const { history } = this.props;
        history.push(getPathAfterAuth(isUserInfoFilledIn, role));
      };
      _.set(data, 'role', this.props.type);
      this.props.signInRequest({ data, key, handleErrors, handleSuccess });
    });

  signUp = formData => {
    const { isMobile, isMobileIOS, isMobileAndroid, type } = this.props;
    let data = formData && formData.toJS ? formData.toJS() : null;
    data = updateLoginDeviceType(data, 'sign_up_device', isMobile, isMobileIOS, isMobileAndroid);
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };
      const handleSuccess = () => {
        const { history } = this.props;
        history.push('/thankyou/');
      };
      this.props.signUpRequest({ data, type, handleErrors, handleSuccess });
    });
  };

  render() {
    const { classes, history, intl, icon, isMobile, location, type } = this.props;
    const Form = type === 'teacher' ? AuthForm : StudentSignUpForm;
    return (
      <div>
        <Helmet>
          <title>{intl.formatMessage(META_TEXTS[type].title)}</title>
          <meta name="description" content={intl.formatMessage(META_TEXTS[type].description)} />
        </Helmet>
        <div className={classes.wrapper_component}>
          <div className={classes.component}>
            <UserHeaderLayout history={history} />
            <div className={classes.component_inner}>
              {icon}
              <h1>
                <FormattedMessage {...MESSAGES[type].title} />
              </h1>
              <AuthButtonsView
                history={history}
                isMobile={isMobile}
                location={location}
                signIn={this.signIn}
                type={type}
              />
              <Form onSubmit={this.signUp} />
              <p className={classes.terms_text}>
                <FormattedMessage {...MESSAGES[type].p} />
                <a href={LINKS.privatePolicy} target="_blank">
                  <FormattedMessage {...messages.privacyPolicy} />
                </a>
                <FormattedMessage {...messages.and} />
                <a href={LINKS.termsAndConditions} target="_blank">
                  <FormattedMessage {...messages.termsService} />
                </a>
                .
                <br /> <FormattedMessage {...messages.joinClassDescEnd} />.
              </p>
              <p className={classes.login_signup}>
                <FormattedMessage {...messages.alreadyHaveAnAccount} />
                <a role="button" onClick={() => history.push('/sign_in/')} tabIndex={0}>
                  <FormattedMessage {...messages.logIn} />
                </a>
              </p>
            </div>
          </div>
          <UserFooterLayout />
        </div>
      </div>
    );
  }
}

SignUpLayout.propTypes = {
  type: PropTypes.string,
  content: PropTypes.any,
  intl: intlShape.isRequired,
  icon: PropTypes.any,
  isMobile: PropTypes.bool,
  isMobileIOS: PropTypes.bool,
  isMobileAndroid: PropTypes.bool,
  classes: PropTypes.object,
  location: PropTypes.object,
  history: PropTypes.object,
  signInRequest: PropTypes.func,
  signUpRequest: PropTypes.func,
};

SignUpLayout.defaultProps = {
  type: 'teacher',
  content: null,
  icon: null,
};

const mapDispatchToProps = {
  signInRequest,
  signUpRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'users', saga });
export default compose(
  injectIntl,
  withConnect,
  withSaga,
  withStyles(styles),
)(SignUpLayout);
