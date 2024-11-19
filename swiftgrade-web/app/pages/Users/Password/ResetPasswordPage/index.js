import React from 'react';
import PropTypes from 'prop-types';
import { ResetPassword } from 'containers/Users/Password';
import queryString from 'query-string';
import _ from 'lodash';

export class ResetPasswordPage extends React.PureComponent {
  render() {
    const { history, location } = this.props;
    const params = queryString.parse(location.search);
    const code = _.has(params, 'code') ? params.code : null;
    return <ResetPassword history={history} location={location} code={code} />;
  }
}

ResetPasswordPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default ResetPasswordPage;
