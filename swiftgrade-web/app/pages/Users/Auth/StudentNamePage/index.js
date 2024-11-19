import React from 'react';
import PropTypes from 'prop-types';
import { StudentName } from 'containers/Users';
import { UpdateUserLayout } from 'components/Layouts';
import queryString from 'query-string';
import _ from 'lodash';

class StudentNamePage extends React.PureComponent {
  render() {
    const { location, history } = this.props;
    const params = queryString.parse(location.search);
    const code = _.has(params, 'code') ? params.code : null;
    return (
      <UpdateUserLayout code={code} history={history}>
        <StudentName history={history} />
      </UpdateUserLayout>
    );
  }
}

StudentNamePage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.any,
};

export default StudentNamePage;
