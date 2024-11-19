import React from 'react';
import PropTypes from 'prop-types';
import { StudentAssessments } from 'containers/Assessments';
import { AssessmentsStudentsLayout, Layout } from 'components/Layouts';

export class CompletedAssessmentsListPage extends React.PureComponent {
  render() {
    const { history, location, match } = this.props;
    const { groupId } = match.params;
    return (
      <Layout>
        <AssessmentsStudentsLayout groupId={groupId} history={history} keyName="completed_assessments">
          <StudentAssessments groupId={groupId} history={history} kind="completed" location={location} />
        </AssessmentsStudentsLayout>
      </Layout>
    );
  }
}

CompletedAssessmentsListPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default CompletedAssessmentsListPage;
