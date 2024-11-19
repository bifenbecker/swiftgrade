import React from 'react';
import PropTypes from 'prop-types';
import RealtimeUpdate from 'containers/RealtimeUpdate';
import { AnswerSheetDownload } from 'containers/Assessments';

export class AnswerSheetDownloadPage extends React.PureComponent {
  render() {
    const { history, location, match } = this.props;
    const { assessmentId, groupId } = match.params;
    return (
      <RealtimeUpdate location={location}>
        <AnswerSheetDownload assessmentId={assessmentId} groupId={groupId} history={history} />
      </RealtimeUpdate>
    );
  }
}

AnswerSheetDownloadPage.propTypes = {
  history: PropTypes.object,
  location: PropTypes.object,
  match: PropTypes.object,
};

export default AnswerSheetDownloadPage;
