import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import SubmissionError from 'redux-form/lib/SubmissionError';
import { UserHeaderLayout } from 'components/Layouts';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { updateLoginDeviceType } from 'utils/helpers/usersHelper';
import { resetForm } from 'containers/App/actions';
import { signInRequest } from 'containers/Users/actions';
import { withStyles, CircularProgress, Grid } from '@material-ui/core';
import { IconLogoBold } from 'components/Svgs';
import saga from 'containers/Users/saga';
import injectSaga from 'utils/injectSaga';
import { AuthForm } from 'components/Forms';
import AuthButtonsView from '../../Views/AuthButtonsView';
import messages from './messages';
import { styles } from './styles';

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
    };
  }

  componentWillUnmount() {
    this.props.resetForm('AuthForm');
  }

  handleSubmit = formData => {
    const { isMobile, isMobileIOS, isMobileAndroid } = this.props;
    let data = formData && formData.toJS ? formData.toJS() : null;
    data = updateLoginDeviceType(data, 'login_device', isMobile, isMobileIOS, isMobileAndroid);
    return this.signIn(data, 'sign_in');
  };

  handleLoading = loading => this.setState({ isLoading: loading });

  signIn = (data, key) =>
    new Promise((resolve, reject) => {
      const handleErrors = response => {
        this.handleLoading(false);
        reject(new SubmissionError(response.errors));
      };
      const handleSuccess = (isUserInfoFilledIn, role) => {
        const { history } = this.props;
        const path = isUserInfoFilledIn
          ? '/'
          : `/${role === 'teacher' ? 'account_setup/?key=sign_in' : 'student_name'}/`;
        this.handleLoading(false);
        history.push(path);
      };
      this.handleLoading(true);
      this.props.signInRequest({ data, key, handleErrors, handleSuccess });
    });

  renderFooterButtons = classes => {
    const { history } = this.props;
    return (
      <div className={classes.login_footer_links}>
        <p className={classes.forgot_password}>
          <a role="button" onClick={() => history.push('/recover/')} tabIndex={0}>
            <FormattedMessage {...messages.forgotPassword} />
          </a>
        </p>
        <p className={classes.login_signup}>
          <FormattedMessage {...messages.dontHaveAccount} />
          <a role="button" onClick={() => history.push('/select_type/')} tabIndex={0}>
            <FormattedMessage {...messages.signUp} />
          </a>
        </p>
      </div>
    );
  };

  renderContent = classes => {
    const { isMobile, intl, location } = this.props;
    return (
      <div>
        <Helmet>
          <title>{intl.formatMessage(messages.pageTitle)}</title>
          <meta name="description" content={intl.formatMessage(messages.pageDescription)} />
        </Helmet>
        <div className={classNames(classes.content_container, { isMobile })}>
          <div className={classes.login_content}>
            <div className={classes.login_header}>
              <h1>
                <FormattedMessage {...messages.logIn} />
              </h1>
            </div>
            <div className={classes.inner_content}>
              <AuthButtonsView isMobile={isMobile} location={location} signIn={this.signIn} />
              <AuthForm isLogin onSubmit={this.handleSubmit} />
              {this.renderFooterButtons(classes)}
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { classes, history, isMobile, location } = this.props;
    const { isLoading } = this.state;

    if (isLoading && location.search !== '') {
      return (
        <Grid container className={classes.loading_progress_container}>
          <Grid item>
            <IconLogoBold width={isMobile ? '100%' : '510'} height={isMobile ? '60' : '100'} />
          </Grid>
          <Grid item className={classes.loading_progress_wrapper}>
            <CircularProgress className={isMobile ? classes.mobile_loading_progress : classes.loading_progress} />
          </Grid>
        </Grid>
      );
    }
    return (
      <div className={classes.sign_in_container}>
        <UserHeaderLayout isLogin history={history} />
        {this.renderContent(classes)}
      </div>
    );
  }
}

SignIn.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  intl: intlShape.isRequired,
  isMobile: PropTypes.bool,
  isMobileIOS: PropTypes.bool,
  isMobileAndroid: PropTypes.bool,
  location: PropTypes.object,
  resetForm: PropTypes.func,
  signInRequest: PropTypes.func,
};

const mapDispatchToProps = {
  resetForm,
  signInRequest,
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
)(SignIn);
