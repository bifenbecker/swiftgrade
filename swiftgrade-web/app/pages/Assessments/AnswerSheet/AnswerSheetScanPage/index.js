import React from 'react';
import PropTypes from 'prop-types';
import { AnswerSheetScan } from 'containers/Assessments';

export class AnswerSheetDownloadPage extends React.PureComponent {
  render() {
    const { history, match } = this.props;
    const { assessmentId, groupId } = match.params;
    return <AnswerSheetScan assessmentId={assessmentId} groupId={groupId} history={history} />;
  }
}

AnswerSheetDownloadPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default AnswerSheetDownloadPage;
