import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import VpnKey from '@material-ui/icons/VpnKey';
import PersonAdd from '@material-ui/icons/PersonAdd';

import { IconEditStudent } from 'components/Svgs';
import { FormattedMessage } from 'react-intl';
import { InfoStudentsForm } from 'components/Forms';
import DeleteStudent from 'containers/Students/DeleteStudent';
import ResetPasswordStudent from 'containers/Students/ResetPasswordStudent';
import AddStudentsToClass from 'containers/Students/AddStudentsToClass';

import messages from './messages';

const ADD_TO_CLASSES_DISABLED = classes => ({
  key: 'add_students_to_classes_disabled',
  disabled: true,
  icon: <PersonAdd className={classes.action_icon} style={{ color: '#919191' }} />,
  message: <FormattedMessage {...messages.addStudentsToClasses} />,
  form: null,
  formName: null,
  tooltip_message: () => <FormattedMessage {...messages.addToClassDisabled} />,
});

const ADD_TO_CLASSES = classes => ({
  key: 'add_students_to_classes',
  icon: <PersonAdd className={classes.action_icon} style={{ color: '#4f4f4f' }} />,
  message: <FormattedMessage {...messages.addStudentsToClasses} />,
  form: AddStudentsToClass,
  title: data => (
    <FormattedMessage
      {...messages.addToClassTitle}
      values={{ count: data.count, student: data.count === 1 ? 'student' : 'students' }}
    />
  ),
  tooltip_message: () => <FormattedMessage {...messages.addStudentsToClasses} />,
});

const ACTIONS = (classes, addToClassesEnabled) => [
  {
    key: 'edit',
    icon: <IconEditStudent className={classes.action_icon} style={{ color: '#4f4f4f' }} />,
    message: <FormattedMessage {...messages.edit} />,
    form: InfoStudentsForm,
    title: () => <FormattedMessage {...messages.studentInfo} />,
    tooltip_message: () => <FormattedMessage {...messages.studentInfo} />,
  },
  {
    key: 'delete',
    icon: <DeleteIcon className={classes.action_icon} style={{ color: '#4f4f4f' }} />,
    message: <FormattedMessage {...messages.delete} />,
    form: DeleteStudent,
    title: data => (
      <FormattedMessage
        {...messages.studentDelete}
        values={{ count: data.count, student: data.count === 1 ? 'student' : 'students' }}
      />
    ),
    tooltip_message: data => (
      <FormattedMessage
        {...messages.studentDelete}
        values={{ count: data.count, student: data.count === 1 ? 'student' : 'students' }}
      />
    ),
  },
  {
    key: 'reset_password',
    icon: <VpnKey className={classes.action_icon} style={{ color: '#4f4f4f' }} />,
    message: <FormattedMessage {...messages.studentResetPassword} />,
    form: ResetPasswordStudent,
    title: () => <FormattedMessage {...messages.studentResetPasswordTitle} />,
    tooltip_message: () => <FormattedMessage {...messages.studentResetPasswordTooltipMessage} />,
  },
  addToClassesEnabled ? ADD_TO_CLASSES(classes) : ADD_TO_CLASSES_DISABLED(classes),
];

export { ACTIONS };
