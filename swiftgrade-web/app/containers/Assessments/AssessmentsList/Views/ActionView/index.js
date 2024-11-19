import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { FormattedMessage } from 'react-intl';
import { Grid, Chip, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { NEW_TAB_LINKS } from 'utils/helpers/assessments/constants';

import { styles } from './styles';
import messages from './messages';

import { ACTIONS, isAssessment } from './config';

class ActionView extends Component {
  setLinkToButton = (content, item) => {
    const { assessmentsIds, group } = this.props;
    return _.isObject(group) && item.can_open_new_tab && isAssessment(assessmentsIds) && !item.disabled ? (
      <a style={{ textDecoration: 'none', color: 'black' }} href={NEW_TAB_LINKS(assessmentsIds[0], group.id, item.key)}>
        {content}
      </a>
    ) : (
      content
    );
  };

  renderAction = item => {
    const { classes, onChangeState } = this.props;
    if (!item.is_render) {
      return null;
    }

    let content = (
      <Grid
        item
        className={classNames(classes.action_view, { disabled: item.disabled })}
        key={item.key}
        onClick={() => onChangeState('action', item)}
      >
        <div className={classes.action_icon_wrapper}>{item.icon}</div>
        <div>{item.message}</div>
      </Grid>
    );

    content = this.setLinkToButton(content, item);

    return (
      <div className={classNames(classes.action_view_wrapper, { disabled: item.disabled })}>
        {item.tooltip_message ? (
          <Tooltip title={item.tooltip_message} placement="top">
            <div>{content}</div>
          </Tooltip>
        ) : (
          <Fragment>{content}</Fragment>
        )}
      </div>
    );
  };

  render() {
    const { assessmentsIds, classes, color, user, onChangeState } = this.props;
    const assessments = this.props.assessments.filter(a => assessmentsIds.includes(a.id));
    const firstAssessment = assessmentsIds.length === 1 ? assessments.find(a => a.id === assessmentsIds[0]) : null;
    const withCustom =
      (firstAssessment && ['ready_for_download', 'ready_for_scan'].includes(firstAssessment.status)) ||
      (firstAssessment && ['ready_for_generation'].includes(firstAssessment.status));
    const withScanning = firstAssessment && ['scanning', 'scanned'].includes(firstAssessment.status);
    return (
      <Fragment>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          wrap="nowrap"
          className={classNames(classes.actions_view, {
            with_custom: withCustom,
            with_scanning: withScanning,
            multiple_selected: assessmentsIds.length > 1,
          })}
        >
          <Grid item onClick={() => onChangeState('assessmentsIds', [])}>
            <Chip
              className={classes.selected_item}
              clickable
              deleteIcon={<CloseIcon className={classes.close_icon} />}
              label={<FormattedMessage {...messages.selectedAssessment} values={{ count: assessmentsIds.length }} />}
              style={{ backgroundColor: color, color: 'white' }}
              onDelete={() => onChangeState('assessmentsIds', [])}
            />
          </Grid>
          <Grid container className={classes.action_items}>
            {ACTIONS(assessments, classes, user).map(item => this.renderAction(item))}
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

ActionView.propTypes = {
  color: PropTypes.string,
  assessmentsIds: PropTypes.array,
  assessments: PropTypes.object,
  classes: PropTypes.object,
  group: PropTypes.object,
  onChangeState: PropTypes.func,
  user: PropTypes.object,
};

export default compose(withStyles(styles))(ActionView);
