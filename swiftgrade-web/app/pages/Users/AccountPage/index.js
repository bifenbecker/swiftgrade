import React from 'react';
import PropTypes from 'prop-types';
import { Account } from 'containers/Users';

export class AccountPage extends React.PureComponent {
  render() {
    const { history, location } = this.props;
    return <Account history={history} location={location} />;
  }
}

AccountPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default AccountPage;
