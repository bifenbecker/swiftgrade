import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Paper, ClickAwayListener, Tooltip, Typography } from '@material-ui/core';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { logoutRequest } from 'containers/App/actions';
import ExpandableList from 'components/DataDisplay/ExpandableList';

import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { isTeacher } from 'utils/helpers/usersHelper';
import { GET_STUDENT_MENU_ITEMS, GET_TEACHER_MENU_ITEMS } from './config';
import { styles } from './styles';
import { IconButton } from '../../Controls';

class AccountLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  renderUserIcon = isOpen => {
    const { classes, history, user } = this.props;
    const { first_name: firstName, last_name: lastName, email, role } = user;
    const msg = (
      <div
        role="button"
        tabIndex="0"
        align="center"
        className={classes.account_tooltip}
        onClick={() => history.push('/account/')}
      >
        <Typography className={classes.account_tooltip_name}>{`${firstName} ${lastName}`}</Typography>
        <Typography className={classes.account_tooltip_role}>
          {`${role.charAt(0).toUpperCase()}${role.substring(1)}`}
        </Typography>
      </div>
    );
    return (
      <IconButton
        onClick={() => this.setState(prev => ({ isOpen: !prev.isOpen }))}
        borderRadius="50%"
        className={classes.profile_icon_container}
        icon={
          <Tooltip
            title={msg}
            arrow
            classes={{ popper: isOpen && classes.hidden, tooltip: classes.tooltip, arrow: classes.arrow }}
          >
            <div className={classes.icon_logged_user}>
              <span>{firstName ? firstName[0].toLocaleUpperCase() : email[0].toLocaleUpperCase()}</span>
              <span>{lastName ? lastName[0].toLocaleUpperCase() : ''}</span>
            </div>
          </Tooltip>
        }
      />
    );
  };

  render() {
    const { classes, user, history } = this.props;
    const { isOpen } = this.state;

    if (!_.isObject(user)) {
      return null;
    }

    return (
      <ClickAwayListener onClickAway={() => this.setState({ isOpen: false })}>
        <div>
          {this.renderUserIcon(isOpen)}
          {isOpen && (
            <Paper className={classes.account_dropdown}>
              <ExpandableList
                items={
                  isTeacher(user) ? GET_TEACHER_MENU_ITEMS(history, classes) : GET_STUDENT_MENU_ITEMS(history, classes)
                }
              />
            </Paper>
          )}
        </div>
      </ClickAwayListener>
    );
  }
}

AccountLayout.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  logoutRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withRouter,
  withConnect,
  withStyles(styles),
)(AccountLayout);
