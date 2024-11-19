import React from 'react';
import PropTypes from 'prop-types';
import { ClassCode } from 'containers/Users';
import queryString from 'query-string';
import _ from 'lodash';

class ClassCodePage extends React.PureComponent {
  render() {
    const { history, location } = this.props;
    const params = queryString.parse(location.search);
    const key = _.has(params, 'key') ? params.key : null;
    return <ClassCode history={history} signInKey={key} location={location} />;
  }
}

ClassCodePage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.any,
};

export default ClassCodePage;
