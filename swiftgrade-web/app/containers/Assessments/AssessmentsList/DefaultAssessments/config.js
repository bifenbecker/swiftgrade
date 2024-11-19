import React from 'react';
import { FormattedMessage } from 'react-intl';
import { POPUP_CHECKLIST_CREATE_ASSESSMENT, POPUP_CHECKLIST_GET_AS } from 'globalConstants';
import { RenameAssessmentNameForm, CopyAssessmentForm } from 'components/Forms';
import { DeleteAssessmentsBody } from '../Views';
import messages from './messages';

const CHECKLIST_DATA = (assessmentType = null) => ({
  [POPUP_CHECKLIST_CREATE_ASSESSMENT]: {
    bodyTitle: null,
    footerTitle: <FormattedMessage {...messages.createAKFooterTitle} />,
    footerButtonTitle: <FormattedMessage {...messages.createAKFooterButtonTitle} />,
    headerTitle: <FormattedMessage {...messages.createAKTitle} />,
  },
  [POPUP_CHECKLIST_GET_AS]:
    assessmentType === 'paper' ? CHECKLIST_PRINTED_ASSESSMENT_DATA : CHECKLIST_RELEASED_ASSESSMENT_DATA,
});

const CHECKLIST_PRINTED_ASSESSMENT_DATA = {
  bodyTitle: null,
  footerTitle: <FormattedMessage {...messages.printASFooterTitle} />,
  footerButtonTitle: <FormattedMessage {...messages.printASFooterButtonTitle} />,
  headerTitle: <FormattedMessage {...messages.printASTitle} />,
};

const CHECKLIST_RELEASED_ASSESSMENT_DATA = {
  bodyTitle: null,
  footerTitle: <FormattedMessage {...messages.releaseASFooterTitle} />,
  footerButtonTitle: <FormattedMessage {...messages.releaseASFooterButtonTitle} />,
  headerTitle: <FormattedMessage {...messages.releaseASTitle} />,
};

const FORM_DATA = {
  copy: {
    form: CopyAssessmentForm,
    title: <FormattedMessage {...messages.copyAssessment} />,
  },
  delete: {
    form: DeleteAssessmentsBody,
    title: <FormattedMessage {...messages.delete} />,
  },
  rename: {
    form: RenameAssessmentNameForm,
    title: <FormattedMessage {...messages.renameAssessment} />,
  },
};

const LINKS = (assessment, groupId, key) =>
  ({
    assign: `/groups/${groupId}/assessments/${assessment.id}/settings/`,
    preview: `/groups/${groupId}/assessments/${assessment.id}/preview/`,
    start: `/groups/${groupId}/assessments/${assessment.id}/start/`,
  }[key]);

const STATUSES = {
  assigned: 'result',
  completed_unassigned: 'result',
  ready_for_assignment: 'assign',
  ready_for_generation: 'preview',
  ready_for_scan: 'scan',
  ready_to_start: 'start',
  scanned: 'result',
};

export { CHECKLIST_DATA, FORM_DATA, LINKS, STATUSES };
