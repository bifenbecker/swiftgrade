import React from 'react';
import PropTypes from 'prop-types';
import { StudentAssessments } from 'containers/Assessments';
import { AssessmentsStudentsLayout, Layout } from 'components/Layouts';
import RealtimeUpdate from 'containers/RealtimeUpdate';

export class AssignedAssessmentsListPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: '-settings__created_at',
    };
  }

  render() {
    const { history, location, match } = this.props;
    const { orderBy } = this.state;
    const { groupId } = match.params;

    return (
      <RealtimeUpdate location={location} orderBy={orderBy}>
        <Layout>
          <AssessmentsStudentsLayout groupId={groupId} history={history} keyName="assigned_assessments">
            <StudentAssessments
              groupId={groupId}
              history={history}
              kind="assigned"
              location={location}
              orderBy={orderBy}
            />
          </AssessmentsStudentsLayout>
        </Layout>
      </RealtimeUpdate>
    );
  }
}

AssignedAssessmentsListPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default AssignedAssessmentsListPage;
