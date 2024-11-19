import React from 'react';
import PropTypes from 'prop-types';
import { RecoverPassword } from 'containers/Users/Password';

export class RecoverPasswordPage extends React.PureComponent {
  render() {
    const { history, location } = this.props;
    return <RecoverPassword history={history} location={location} />;
  }
}

RecoverPasswordPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default RecoverPasswordPage;
