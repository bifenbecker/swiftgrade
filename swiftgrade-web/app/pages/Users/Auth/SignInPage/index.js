import React from 'react';
import PropTypes from 'prop-types';
import { SignIn } from 'containers/Users';
import { Layout } from 'components/Layouts';

export class SignInPage extends React.PureComponent {
  render() {
    const { history, location } = this.props;
    return (
      <Layout>
        <SignIn history={history} location={location} />
      </Layout>
    );
  }
}

SignInPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default SignInPage;
