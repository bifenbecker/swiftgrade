import React from 'react';
import PropTypes from 'prop-types';
import { StudentsList } from 'containers/Students';
import { AssessmentsStudentsLayout, Layout } from 'components/Layouts';

export class StudentsPage extends React.PureComponent {
  render() {
    const { history, location, match } = this.props;
    const { groupId } = match.params;

    return (
      <Layout>
        <AssessmentsStudentsLayout groupId={groupId} history={history} keyName="students">
          <StudentsList history={history} location={location} groupId={groupId} />
        </AssessmentsStudentsLayout>
      </Layout>
    );
  }
}

StudentsPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default StudentsPage;
