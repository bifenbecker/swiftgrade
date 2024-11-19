import React from 'react';
import PropTypes from 'prop-types';
import { AssessmentSettings } from 'containers/Assessments';

export class AssessmentSettingsPage extends React.PureComponent {
  render() {
    const { history, location, match } = this.props;
    const { assessmentId, groupId } = match.params;
    return (
      <AssessmentSettings
        assessmentId={assessmentId}
        groupId={groupId}
        history={history}
        location={location}
        match={match}
      />
    );
  }
}

AssessmentSettingsPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default AssessmentSettingsPage;
