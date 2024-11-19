import { FormattedMessage } from 'react-intl';
import React from 'react';
import DefaultButton from 'components/Controls/Buttons/DefaultButton';
import { getAssessmentErrors } from 'utils/helpers/assessments';
import _ from 'lodash';
import messages from './messages';
import { AssessmentErrors, AssessmentValidationInfo } from './index';

export const onInternetConnectionLoss = props => {
  const { classes, group, onShowModal, onClose } = props;
  onShowModal({
    title: <FormattedMessage {...messages.internetConnectionLossTitle} />,
    body: (
      <div>
        <FormattedMessage {...messages.internetConnectionLossBody} />
        <div className={classes.no_internet_button}>
          <DefaultButton
            text={<FormattedMessage {...messages.ok} />}
            onClick={() => onClose()}
            backgroundColor={group.color}
          />
        </div>
      </div>
    ),
  });
};

export const showAnswersErrors = (errors, props) => {
  const { assessmentDetails, group, onClose, onShowSelectTypeModal, onShowModal, setAssessmentDetails } = props;
  const data = getAssessmentErrors(errors);

  if (_.isNull(data)) {
    return null;
  }
  const errorData = {
    type: 'error',
    overflow: '',
    body: (
      <AssessmentErrors
        assessmentDetails={assessmentDetails}
        data={data}
        group={group}
        onClose={onClose}
        setAssessmentDetails={setAssessmentDetails}
      />
    ),
  };

  const getAssessmentValidationModalData = onAction => ({
    title: <FormattedMessage {...messages.MFCouldNotBeValidatedTitle} />,
    body: (
      <AssessmentValidationInfo
        data={data}
        group={group}
        formData={props.formData}
        onClose={onClose}
        onCreate={formData => onAction(formData)}
      />
    ),
  });

  let modalData;
  if (_.has(data, 'compare_by_characters') && !_.has(data, 'answer')) {
    const onAction = formData => {
      if (props.updateAssessment) {
        props.updateAssessment(formData, true);
      } else {
        props.createAssessment(formData, '').catch(({ errors: responseErrors }) => {
          if (
            _.isEqual(Object.keys(responseErrors), ['assessment_items', 'type']) &&
            _.isEqual(Object.keys(data), ['compare_by_characters'])
          ) {
            onShowSelectTypeModal(props.formData, true);
          }
        });
      }
    };
    modalData = getAssessmentValidationModalData(onAction);
  } else {
    modalData = errorData;
  }

  onShowModal(modalData);
};
