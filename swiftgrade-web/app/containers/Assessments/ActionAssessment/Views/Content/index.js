import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AssessmentFormInit, AssessmentAnswerForm } from 'components/Forms';

function Content(props) {
  const {
    assessment,
    assessmentDetails,
    group,
    isAssessmentChanged,
    isMobile,
    onAssessmentChange,
    size,
    history,
    renderCalculatorComponent,
    calculator,
  } = props;
  const handleSubmit = assessment ? props.updateAssessment : props.selectAssessmentType;
  return (
    <Fragment>
      <AssessmentFormInit assessment={assessment} assessmentDetails={assessmentDetails} group={group} />
      <AssessmentAnswerForm
        assessment={assessment}
        group={group}
        isAssessmentChanged={isAssessmentChanged}
        isMobile={isMobile}
        size={size}
        onAssessmentChange={onAssessmentChange}
        onSubmit={handleSubmit}
        history={history}
        renderCalculatorComponent={renderCalculatorComponent}
        calculator={calculator}
      />
    </Fragment>
  );
}

Content.propTypes = {
  isAssessmentChanged: PropTypes.bool,
  isMobile: PropTypes.bool,
  assessment: PropTypes.object,
  assessmentDetails: PropTypes.object,
  group: PropTypes.object,
  size: PropTypes.object,
  selectAssessmentType: PropTypes.func,
  history: PropTypes.object,
  onAssessmentChange: PropTypes.func,
  updateAssessment: PropTypes.func,
  renderCalculatorComponent: PropTypes.func,
  calculator: PropTypes.object,
};

Content.defaultProps = {
  assessment: null,
  assessmentDetails: null,
  isMobile: false,
  selectAssessmentType: null,
  updateAssessment: null,
};

export default Content;
