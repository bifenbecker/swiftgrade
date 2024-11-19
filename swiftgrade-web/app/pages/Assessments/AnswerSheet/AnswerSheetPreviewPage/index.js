import React from 'react';
import PropTypes from 'prop-types';
import { AnswerSheetPreview } from 'containers/Assessments';

export class AnswerSheetPreviewPage extends React.PureComponent {
  render() {
    const { history, match } = this.props;
    const { assessmentId, groupId } = match.params;
    return <AnswerSheetPreview history={history} assessmentId={assessmentId} groupId={groupId} />;
  }
}

AnswerSheetPreviewPage.propTypes = {
  history: PropTypes.object,
  match: PropTypes.object,
};

export default AnswerSheetPreviewPage;
