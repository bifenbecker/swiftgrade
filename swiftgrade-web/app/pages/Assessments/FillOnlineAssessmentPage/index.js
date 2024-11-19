import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'components/Layouts';
import { FillOnlineAssessment } from 'containers/Assessments';

export class FillOnlineAssessmentPage extends React.PureComponent {
  render() {
    const { history, location, match } = this.props;
    const { assessmentId, groupId } = match.params;
    return (
      <Layout>
        <FillOnlineAssessment history={history} assessmentId={assessmentId} groupId={groupId} location={location} />
      </Layout>
    );
  }
}

FillOnlineAssessmentPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default FillOnlineAssessmentPage;
