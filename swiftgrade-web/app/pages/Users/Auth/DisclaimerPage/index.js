import React from 'react';
import PropTypes from 'prop-types';
import { Disclaimer } from 'containers/Users';

class DisclaimerPage extends React.PureComponent {
  render() {
    const { history } = this.props;
    return <Disclaimer history={history} />;
  }
}

DisclaimerPage.propTypes = {
  history: PropTypes.object,
};

export default DisclaimerPage;
