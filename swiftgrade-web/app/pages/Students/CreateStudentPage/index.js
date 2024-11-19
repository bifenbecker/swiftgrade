import React from 'react';
import PropTypes from 'prop-types';
import { CreateStudent } from 'containers/Students';

export class CreateStudentPage extends React.PureComponent {
  render() {
    const { history, location } = this.props;
    return <CreateStudent history={history} location={location} />;
  }
}

CreateStudentPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
};

export default CreateStudentPage;
