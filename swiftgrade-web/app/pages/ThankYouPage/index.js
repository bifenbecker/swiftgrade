import React from 'react';
import PropTypes from 'prop-types';
import ThankYou from 'containers/Auth/ThankYou';

export class ThankYouPage extends React.PureComponent {
  render() {
    const { history, location } = this.props;
    return <ThankYou history={history} location={location} />;
  }
}

ThankYouPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default ThankYouPage;
