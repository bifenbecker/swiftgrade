import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { FormattedMessage } from 'react-intl';
import { Grid, Chip, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

import { ACTIONS } from './config';

class ActionView extends Component {
  renderAction = (student, studentsIds, item) => {
    const { classes, onAction } = this.props;

    if (
      item.key !== 'delete' &&
      item.key !== 'add_students_to_classes' &&
      item.key !== 'add_students_to_classes_disabled' &&
      !student
    ) {
      return null;
    }

    const content = (
      <Grid
        item
        className={classNames(classes.action_view, { disabled: item.disabled })}
        key={item.key}
        onClick={() => onAction(item, student)}
      >
        <div className={classes.action_icon_wrapper}>{item.icon}</div>
        <div>{item.message}</div>
      </Grid>
    );

    return (
      <div className={classNames(classes.action_view_wrapper, { disabled: item.disabled })}>
        {item.tooltip_message ? (
          <Tooltip title={item.tooltip_message({ count: studentsIds.length })} placement="top">
            <div>{content}</div>
          </Tooltip>
        ) : (
          <Fragment>{content}</Fragment>
        )}
      </div>
    );
  };

  render() {
    const { students, classes, onChangeState, studentsIds, color, groups } = this.props;

    const student = studentsIds.length === 1 ? students.find(a => a.user_id === studentsIds[0]) : null;
    const addToClassesEnabled = groups.length > 1;
    return (
      <Fragment>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          wrap="nowrap"
          className={classNames(classes.actions_view, { with_custom: studentsIds.length === 1 })}
        >
          <Grid item onClick={() => onChangeState('studentsIds', [])}>
            <Chip
              className={classes.selected_item}
              clickable
              deleteIcon={<CloseIcon className={classes.close_icon} />}
              label={<FormattedMessage {...messages.selectedAssessment} values={{ count: studentsIds.length }} />}
              style={{ backgroundColor: color, color: 'white' }}
              onDelete={() => onChangeState('studentsIds', [])}
            />
          </Grid>
          <Grid container className={classes.action_items} spacing={3}>
            {ACTIONS(classes, addToClassesEnabled).map(item => this.renderAction(student, studentsIds, item))}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

ActionView.propTypes = {
  color: PropTypes.string,
  studentsIds: PropTypes.array,
  students: PropTypes.object,
  classes: PropTypes.object,
  group: PropTypes.object,
  groups: PropTypes.array,
  onAction: PropTypes.func,
  onChangeState: PropTypes.func,
};

export default compose(withStyles(styles))(ActionView);
