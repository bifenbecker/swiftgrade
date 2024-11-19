import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'components/Layouts';
import { AssessmentStart } from 'containers/Assessments';

export class StartOnlineAssessmentPage extends React.PureComponent {
  render() {
    const { history, location, match } = this.props;
    const { assessmentId, groupId } = match.params;
    return (
      <Layout>
        <AssessmentStart history={history} assessmentId={assessmentId} groupId={groupId} location={location} />
      </Layout>
    );
  }
}

StartOnlineAssessmentPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default StartOnlineAssessmentPage;
