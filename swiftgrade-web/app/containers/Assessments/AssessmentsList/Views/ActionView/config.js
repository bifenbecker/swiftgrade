import React from 'react';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { FormattedMessage } from 'react-intl';
import { IconAssignArrowUp, IconCopy, IconRename, IconCustom } from 'components/Svgs';
import { isTeacher } from 'utils/helpers/usersHelper';
import messages from './messages';
import '../../styles.scss';

const getDisabledEditTooltip = assessments => {
  if (isEditDisabled(assessments)) {
    return assessments[0].status === 'assigned' ? (
      <FormattedMessage {...messages.unreleaseBeforeEditing} />
    ) : (
      <FormattedMessage {...messages.disabledIcon} />
    );
  }
  return <FormattedMessage {...messages.editTooltip} />;
};

const isAssessment = assessments => assessments.length === 1;

const isEditDisabled = assessments =>
  isAssessment(assessments) && ['assigned', 'cropping', 'generating', 'scanning'].includes(assessments[0].status);

const isRenderAssignAction = (assessment, user) =>
  isTeacher(user) &&
  assessment.type === 'online' &&
  assessment.status === 'ready_for_assignment' &&
  assessment.results_exist;

const isRenderUnassignAction = (assessment, user) =>
  isTeacher(user) && assessment.type === 'online' && assessment.status === 'assigned';

const isRenderPreview = assessment => {
  const { kind, status } = assessment;
  return (
    kind === 'custom' && ['cropping', 'ready_for_download', 'ready_for_scan', 'scanning', 'scanned'].includes(status)
  );
};

const isDeleteDisabled = assessments => assessments.filter(a => a.status === 'assigned').length > 0;

const ACTIONS = (assessments, classes, user) => [
  {
    key: 'assign',
    icon: <IconAssignArrowUp className={classes.action_icon} style={{ color: '#4f4f4f' }} />,
    message: <FormattedMessage {...messages.release} />,
    formName: null,
    tooltip_message: <FormattedMessage {...messages.releaseOnlineAS} />,
    disabled: false,
    is_render: isAssessment(assessments) && isRenderAssignAction(assessments[0], user),
  },
  {
    key: 'unassign',
    icon: (
      <IconAssignArrowUp className={classes.action_icon} style={{ color: '#4f4f4f', transform: 'rotate(180deg)' }} />
    ),
    message: <FormattedMessage {...messages.unrelease} />,
    formName: null,
    tooltip_message: <FormattedMessage {...messages.unreleaseOnlineAS} />,
    disabled: false,
    is_render: isAssessment(assessments) && isRenderUnassignAction(assessments[0], user),
  },
  {
    key: 'edit',
    icon: (
      <EditIcon
        className={classes.action_icon}
        style={isEditDisabled(assessments) ? { color: '#00000061' } : { color: '#4f4f4f' }}
      />
    ),
    message: <FormattedMessage {...messages.edit} />,
    formName: null,
    tooltip_message: getDisabledEditTooltip(assessments),
    disabled: isEditDisabled(assessments),
    is_render: isAssessment(assessments),
    can_open_new_tab: true,
  },
  {
    key: 'rename',
    icon: <IconRename className={classes.action_icon} color="#4f4f4f" />,
    message: <FormattedMessage {...messages.rename} />,
    formName: 'RenameAssessmentNameForm',
    disabled: false,
    is_render: isAssessment(assessments),
  },
  {
    key: 'copy',
    icon: <IconCopy className={classes.action_icon} color="#4f4f4f" />,
    message: <FormattedMessage {...messages.copy} />,
    formName: 'CopyAssessmentForm',
    disabled: false,
    is_render: isAssessment(assessments),
  },
  {
    key: 'preview',
    icon: <IconCustom className={classes.action_icon} style={{ color: '#4f4f4f' }} />,
    message: <FormattedMessage {...messages.print} />,
    formName: null,
    tooltip_message: <FormattedMessage {...messages.customTooltip} />,
    disabled: false,
    is_render: isAssessment(assessments) && isRenderPreview(assessments[0]),
  },
  {
    key: 'scan',
    icon: <PhotoCameraIcon className={classes.action_icon} style={{ color: '#4f4f4f' }} />,
    message: <FormattedMessage {...messages.scan} />,
    formName: null,
    tooltip_message: <FormattedMessage {...messages.scanTooltip} />,
    disabled: false,
    is_render: isAssessment(assessments) && ['cropping', 'scanning', 'scanned'].includes(assessments[0].status),
  },
  {
    key: 'delete',
    icon: (
      <DeleteIcon
        className={classes.action_icon}
        style={isDeleteDisabled(assessments) ? { color: '#00000061' } : { color: '#4f4f4f' }}
      />
    ),
    message: <FormattedMessage {...messages.delete} />,
    formName: null,
    disabled: isDeleteDisabled(assessments),
    is_render: true,
    tooltip_message: isDeleteDisabled(assessments) ? <FormattedMessage {...messages.unreleaseFirst} /> : null,
  },
];

export { ACTIONS, isAssessment };
