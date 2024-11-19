import React from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';
import _ from 'lodash';
import { AssessmentStudentResults } from 'containers/Assessments';
import { Layout } from 'components/Layouts';

export class AssessmentStudentResultsPage extends React.PureComponent {
  render() {
    const { history, location, match } = this.props;
    const { assessmentId, completedAssessmentId, groupId } = match.params;
    const params = queryString.parse(location.search);
    const kind = _.has(params, 'kind') ? params.kind : null;
    return (
      <Layout>
        <AssessmentStudentResults
          assessmentId={assessmentId}
          completedAssessmentId={completedAssessmentId}
          groupId={groupId}
          history={history}
          kind={kind}
        />
      </Layout>
    );
  }
}

AssessmentStudentResultsPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default AssessmentStudentResultsPage;
