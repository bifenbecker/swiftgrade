import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Tabs } from 'components/DataDisplay';
import { AppBar, Grid, Typography } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import injectSaga from 'utils/injectSaga';
import saga from 'containers/Users/saga';
import { AccountLayout } from 'components/Layouts';
import { isTeacher } from 'utils/helpers/usersHelper';
import { styles } from './styles';
import messages from './messages';

import { TABS } from './constants';
import PlanTabContent from './Plan';
import Profile from './Profile';

class Account extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tab: 'profile',
    };
  }

  onChangeTab = (e, tab) => {
    this.setState({ tab });
  };

  renderTabs = classes => {
    const { history, user } = this.props;
    const { tab } = this.state;
    const studentAccountClass = { student_account: !isTeacher(user) };

    const content = isTeacher(user) ? (
      <Fragment>
        <Tabs
          tabs={TABS}
          value={tab}
          TabIndicatorProps={{
            style: { display: 'none' },
          }}
          className={classes.tabs_title}
          customTabClasses={{ root: classes.tabs_title_item, selected: classes.tab_selected }}
          onChange={this.onChangeTab}
        />
        {tab === 'profile' ? <Profile history={history} user={user} /> : <PlanTabContent />}
      </Fragment>
    ) : (
      <Profile history={history} user={user} />
    );

    return (
      <div className={classes.wrapper_component}>
        <div className={classNames(classes.component_left, studentAccountClass)}>{content}</div>
        <div className={classNames(classes.component_right, studentAccountClass)} />
      </div>
    );
  };

  render() {
    const { classes, history, user } = this.props;

    if (!_.isObject(user)) {
      return null;
    }

    return (
      <Fragment>
        <AppBar position="fixed" className={classes.header_account} color="transparent">
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="center"
            className={classes.header_account_container}
          >
            <Grid item xs={8} className={classes.header_account_left} container direction="row" alignItems="center">
              <ArrowBackIcon className={classes.back_icon_account} tabIndex={-1} onClick={() => history.goBack()} />

              <Typography className={classes.header_account_title_text}>
                <FormattedMessage {...messages.myAccount} />
              </Typography>
            </Grid>
            <Grid item xs={4} className={classes.header_account_rigth} container direction="row" justify="flex-end">
              <AccountLayout history={history} />
            </Grid>
          </Grid>
        </AppBar>
        {this.renderTabs(classes)}
      </Fragment>
    );
  }
}

Account.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  user: PropTypes.object,
  updateUserRequest: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

const withSaga = injectSaga({ key: 'users', saga });
export default compose(
  withConnect,
  withSaga,
  withStyles(styles),
)(Account);
