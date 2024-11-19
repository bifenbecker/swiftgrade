import React from 'react';
import PropTypes from 'prop-types';
import { Assessment } from 'containers/Assessments';
import { Layout } from 'components/Layouts';

export class AssessmentPage extends React.PureComponent {
  render() {
    const { history, location, match } = this.props;
    const { assessmentId, groupId } = match.params;
    return (
      <Layout>
        <Assessment history={history} location={location} assessmentId={assessmentId} groupId={groupId} />
      </Layout>
    );
  }
}

AssessmentPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default AssessmentPage;
