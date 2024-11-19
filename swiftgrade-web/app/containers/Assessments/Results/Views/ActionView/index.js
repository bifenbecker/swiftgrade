import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import CloseIcon from '@material-ui/icons/Close';
import { FormattedMessage } from 'react-intl';
import { Chip, Grid, Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import _ from 'lodash';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { isValidEmail } from 'utils/validations';
import { styles } from './styles';
import messages from './messages';

import { ACTIONS } from './config';

class ActionView extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openTooltip: false,
    };
  }

  componentDidUpdate() {
    const { openTooltip } = this.state;
    if (openTooltip) {
      setTimeout(() => this.setState({ openTooltip: false }), 1500);
    }
  }

  renderTooltip = (item, content) => {
    const { isMobile } = this.props;
    const { openTooltip } = this.state;

    if (item.tooltip_message) {
      if (item.disabled && isMobile) {
        return (
          <Tooltip open={openTooltip} placement="top" title={item.tooltip_message}>
            <div>{content}</div>
          </Tooltip>
        );
      }
      return (
        <Tooltip placement="top" title={item.tooltip_message}>
          <div>{content}</div>
        </Tooltip>
      );
    }
    return <Fragment>{content}</Fragment>;
  };

  onClickActionButton = item => {
    this.props.onChangeState('action', item);
    this.props.onAction(item);
  };

  renderAction = (result, item) => {
    const { classes, type } = this.props;
    const { disabled } = item;
    if (item.key === 'preview' && type !== 'paper') {
      return null;
    }

    if ((item.key === 'edit' || item.key === 'preview') && !result) {
      return null;
    }
    const content = (
      <Grid
        item
        className={classNames(classes.action_view, { disabled })}
        key={item.key}
        onClick={() => (disabled ? this.setState({ openTooltip: true }) : this.onClickActionButton(item))}
      >
        <div className={classes.action_icon_wrapper}>{item.icon}</div>
        <div>{item.message}</div>
      </Grid>
    );

    return (
      <div className={classNames(classes.action_view_wrapper, { disabled })}>{this.renderTooltip(item, content)}</div>
    );
  };

  isCanSendResultsToStudents = () => {
    const { results, scans } = this.props;
    const availableToSendResults = results.filter(result => {
      const { username, email } = result;
      return scans.includes(result.id) && ((isValidEmail(username) && username) || (email && isValidEmail(email)));
    });
    return availableToSendResults.length === scans.length;
  };

  render() {
    const { classes, color, scans, results } = this.props;
    const result = scans.length === 1 ? results.find(r => r.id === scans[0]) : null;
    const isCanSendResultsToStudents = this.isCanSendResultsToStudents();
    const resultKind = !_.isNull(result) ? result.kind : null;
    return (
      <Fragment>
        <Grid
          container
          direction="row"
          justify="space-around"
          alignItems="center"
          className={classNames(classes.actions_view)}
        >
          <Grid item onClick={() => this.props.onChangeState('scans', [])}>
            <Chip
              className={classes.selected_item}
              label={<FormattedMessage {...messages.selectedItem} values={{ count: scans.length }} />}
              clickable
              deleteIcon={<CloseIcon className={classes.close_icon} />}
              style={{ backgroundColor: color, color: 'white' }}
              onDelete={() => this.props.onChangeState('scans', [])}
            />
          </Grid>
          {ACTIONS(classes, isCanSendResultsToStudents, resultKind).map(item => this.renderAction(result, item))}
        </Grid>
      </Fragment>
    );
  }
}

ActionView.propTypes = {
  type: PropTypes.string,
  color: PropTypes.string,
  results: PropTypes.array,
  scans: PropTypes.array,
  classes: PropTypes.object,
  isMobile: PropTypes.bool,
  onChangeState: PropTypes.func,
  onAction: PropTypes.func,
};

export default compose(withStyles(styles))(ActionView);
