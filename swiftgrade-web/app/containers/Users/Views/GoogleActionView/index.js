import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { IconGoogleButton } from 'components/Svgs';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import queryString from 'query-string';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { updateLoginDeviceType } from 'utils/helpers/usersHelper';
import { styles } from './styles';
import messages from './messages';

class GoogleActionView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstTimeCode: true,
    };
  }

  componentDidUpdate() {
    const { isMobile, isMobileIOS, isMobileAndroid, location } = this.props;
    const { firstTimeCode } = this.state;
    const params = _.has(location, 'search') && queryString.parse(location.search);
    const authCode = _.has(params, 'code') ? params.code : null;
    if (authCode && firstTimeCode) {
      this.setState({ firstTimeCode: false });
      const data = updateLoginDeviceType({ token: authCode }, 'login_device', isMobile, isMobileIOS, isMobileAndroid);
      this.props.signIn(data, 'google_sign_in');
    }
  }

  render() {
    const { classes, history, type } = this.props;

    return (
      <Fragment>
        <a
          role="button"
          tabIndex={0}
          className={classes.google_action}
          onClick={() => {
            if (type && type === 'student') {
              history.push('/class_code/?key=google');
            } else {
              window.open(
                `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&prompt=select_account&client_id=${
                  process.env.CLIENT_ID
                }&scope=openid%20email%20profile&redirect_uri=${process.env.HOST_URL}sign_in/`,
                '_self',
              );
            }
          }}
        >
          <IconGoogleButton />
          <p className={classes.google_action_text}>
            <FormattedMessage {...messages.googleAccount} />
          </p>
        </a>
      </Fragment>
    );
  }
}

GoogleActionView.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  isMobile: PropTypes.bool,
  isMobileIOS: PropTypes.bool,
  isMobileAndroid: PropTypes.bool,
  location: PropTypes.object,
  signIn: PropTypes.func,
  type: PropTypes.string,
};

export default compose(withStyles(styles))(GoogleActionView);
