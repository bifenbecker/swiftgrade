import React from 'react';
import DraftsTwoToneIcon from '@material-ui/icons/DraftsTwoTone';
import DeleteIcon from '@material-ui/icons/Delete';
import { FormattedMessage } from 'react-intl';
import { EmailForm } from 'components/Forms';
import { IconEditStudent, IconGenerateSheet, IconCustomSheet } from 'components/Svgs';
import messages from './messages';

import DeleteResultBody from '../DeleteResultBody';
import EditStudentInfoView from '../EditStudentInfoView';
import PreviewStudentImgView from '../PreviewStudentImgView';

const EMAIL_DISABLED = classes => ({
  form: null,
  formName: null,
  icon: <DraftsTwoToneIcon className={classes.action_icon} style={{ color: '#919191' }} />,
  key: 'emailDisabled',
  disabled: true,
  message: <FormattedMessage {...messages.send} />,
  tooltip_message: <FormattedMessage {...messages.studentMissedEmail} />,
});

const EMAIL = classes => ({
  form: EmailForm,
  formName: 'EmailForm',
  icon: <DraftsTwoToneIcon className={classes.action_icon} style={{ color: '#4f4f4f' }} />,
  key: 'email',
  message: <FormattedMessage {...messages.send} />,
  tooltip_message: <FormattedMessage {...messages.emailStudentResults} />,
});

const ACTIONS = (classes, isEmailEnabled, resultKind) => [
  isEmailEnabled ? EMAIL(classes) : EMAIL_DISABLED(classes),
  {
    form: EditStudentInfoView,
    formName: 'InfoStudentsForm',
    icon: <IconEditStudent className={classes.action_icon} style={{ color: '#4f4f4f' }} />,
    key: 'edit',
    message: <FormattedMessage {...messages.info} />,
    tooltip_message: <FormattedMessage {...messages.resultInfo} />,
  },
  {
    form: DeleteResultBody,
    formName: null,
    icon: <DeleteIcon className={classes.action_icon} style={{ color: '#4f4f4f' }} />,
    key: 'remove',
    message: <FormattedMessage {...messages.delete} />,
    tooltip_message: <FormattedMessage {...messages.deleteStudentResults} />,
  },
  {
    form: PreviewStudentImgView,
    formName: null,
    icon:
      resultKind === 'generic' ? (
        <IconGenerateSheet className={classes.action_icon} style={{ color: '#4f4f4f' }} />
      ) : (
        <IconCustomSheet className={classes.action_icon} style={{ color: '#4f4f4f' }} />
      ),
    key: 'preview',
    message: <FormattedMessage {...messages.view} />,
    tooltip_message: <FormattedMessage {...messages.viewAnswerSheet} />,
  },
];

export { ACTIONS };
