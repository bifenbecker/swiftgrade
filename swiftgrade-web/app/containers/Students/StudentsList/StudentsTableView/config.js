import React from 'react';
import classNames from 'classnames';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { ActionIcon } from 'components/DataDisplay';
import { IconAccount } from 'components/Svgs';
import { Tooltip } from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { STUDENT_TUTORIAL_CIRCLE_ID, STUDENT_TUTORIAL_ICON_ID } from 'globalConstants';
import messages from './messages';

const SELECT_ICON_STYLES = group => ({
  select_icon: { backgroundColor: 'transparent' },
  select_icon_content: {
    color: group.color,
    fontSize: 28,
    width: 28,
    height: 28,
    borderRadius: '50%',
    fill: group.color,
  },
});

const SELECT_ICON_STYLES_ACTIVE = (color, styles) => {
  const newStyles = _.cloneDeep(styles);
  newStyles.select_icon.backgroundColor = color;
  newStyles.select_icon_content.backgroundColor = color;
  newStyles.select_icon_content.padding = 1;
  newStyles.select_icon_content.width = 19;
  newStyles.select_icon_content.height = 'auto';
  newStyles.select_icon_content.fill = 'white';
  return newStyles;
};

const SELECT_ICON = (student, classes, icon, style, studentsIds, onStudentsIdsChange) => (
  <ActionIcon
    id={STUDENT_TUTORIAL_ICON_ID}
    icon={icon}
    style={style}
    className={classes.class_icons}
    onChange={() => onStudentsIdsChange(student, studentsIds)}
  />
);

const getActionRender = (classes, group, value, studentsIds, onStudentsIdsChange, color) => {
  const styles = SELECT_ICON_STYLES(group);
  const index = studentsIds.indexOf(value.user_id);
  if (index >= 0) {
    return SELECT_ICON(
      value,
      classes,
      CheckIcon,
      SELECT_ICON_STYLES_ACTIVE(color, styles),
      studentsIds,
      onStudentsIdsChange,
    );
  }
  return SELECT_ICON(value, classes, IconAccount, styles, studentsIds, onStudentsIdsChange);
};

const actionLabel = (allStudentsSelected, group, classes, onAllStudentsSelect, color) => {
  const styles = SELECT_ICON_STYLES(group);
  if (allStudentsSelected) {
    return (
      <ActionIcon
        onChange={() => onAllStudentsSelect(!allStudentsSelected)}
        icon={CheckIcon}
        style={SELECT_ICON_STYLES_ACTIVE(color, styles)}
      />
    );
  }
  return (
    <Tooltip title={<FormattedMessage {...messages.selectAll} />} arrow placement="right">
      <div className={classes.circle_icon}>
        <div
          id={STUDENT_TUTORIAL_CIRCLE_ID}
          className={classes.circle}
          role="button"
          onClick={() => onAllStudentsSelect(!allStudentsSelected)}
          style={{ background: group.color }}
          tabIndex={-1}
        />
      </div>
    </Tooltip>
  );
};

export const COLUMNS = (
  allStudentsSelected,
  classes,
  group,
  studentsIds,
  onStudentsIdsChange,
  onAllStudentsSelect,
  color,
  isMobile,
) => [
  actionColumn(
    allStudentsSelected,
    classes,
    color,
    group,
    isMobile,
    studentsIds,
    onAllStudentsSelect,
    onStudentsIdsChange,
  ),
  firstNameColumn(classes, isMobile),
  lastNameColumn(classes, isMobile),
  usernameOrEmailColumn(classes, isMobile),
];

const actionColumn = (
  allStudentsSelected,
  classes,
  color,
  group,
  isMobile,
  studentsIds,
  onAllStudentsSelect,
  onStudentsIdsChange,
) => ({
  id: 'action',
  label: actionLabel(allStudentsSelected, group, classes, onAllStudentsSelect, color),
  align: 'left',
  render: (text, value) => getActionRender(classes, group, value, studentsIds, onStudentsIdsChange, color),
  width: '1%',
  classNames: {
    body: classNames(classes.student_table_column, { isMobile }),
  },
});

const firstNameColumn = (classes, isMobile) => ({
  id: 'first_name',
  label: 'First',
  align: 'left',
  width: '33%',
  classNames: {
    body: classNames(classes.student_table_column, { isMobile }),
  },
  enableSort: true,
});

const lastNameColumn = (classes, isMobile) => ({
  id: 'last_name',
  label: 'Last',
  align: 'left',
  width: '33%',
  classNames: {
    body: classNames(classes.student_table_column, { isMobile }),
  },
  enableSort: true,
});

const usernameOrEmailColumn = (classes, isMobile) => ({
  id: 'username',
  label: isMobile ? 'Username' : 'Email or Username',
  align: 'center',
  width: '33%',
  classNames: {
    head: classNames(classes.username_or_email_column_head, { isMobile }),
    body: classNames(classes.student_table_column, { isMobile }),
  },
  enableSort: false,
});

export const MOBILE_PORTRAIT_TABLE_CONTAINER_STYLE = {
  maxHeight: '100%',
  overflowY: 'auto',
  paddingTop: '100px',
  position: 'absolute',
};

export const MOBILE_PORTRAIT_TABLE_STYLE = {
  width: '93%',
  margin: '15px auto 100px',
  border: '1px solid rgba(224, 224, 224, 1)',
};

export const TABLE_STYLE = { width: '80%', margin: 'auto auto 80px', border: '1px solid rgba(224, 224, 224, 1)' };
