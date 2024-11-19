import React from 'react';
import PropTypes from 'prop-types';
import { SelectType } from 'containers/Users';

export class SelectTypePage extends React.PureComponent {
  render() {
    const { history, location } = this.props;
    return <SelectType history={history} location={location} />;
  }
}

SelectTypePage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default SelectTypePage;
