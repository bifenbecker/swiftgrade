import React from 'react';
import PropTypes from 'prop-types';
import NoValidLink from 'containers/Auth/NoValidLink';

export class NoValidLinkPage extends React.PureComponent {
  render() {
    const { history, location } = this.props;
    return <NoValidLink history={history} location={location} />;
  }
}

NoValidLinkPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default NoValidLinkPage;
