import React from 'react';
import PropTypes from 'prop-types';
import { CongratulationsStudent } from 'containers/Students';
import _ from 'lodash';
import queryString from 'query-string';

export class CongratulationsStudentPage extends React.PureComponent {
  render() {
    const { history, location } = this.props;
    const params = queryString.parse(location.search);
    return (
      <CongratulationsStudent code={_.has(params, 'code') ? params.code : null} history={history} location={location} />
    );
  }
}

CongratulationsStudentPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default CongratulationsStudentPage;
