import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AppBar, Grid, Tooltip } from '@material-ui/core';
import { Tabs } from 'components/DataDisplay';
import { IconHome } from 'components/Svgs';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import _ from 'lodash';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getGroupRequest, getGroupsRequest } from 'containers/Groups/actions';
import { makeSelectGroup, makeSelectGroups } from 'containers/Groups/selectors';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from 'containers/Groups/reducer';
import saga from 'containers/Groups/saga';
import { isTeacher } from 'utils/helpers/usersHelper';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { FormattedMessage } from 'react-intl';
import messages from 'components/Fields/Assessment/messages';
import { styles } from './styles';
import { STUDENT_TABS, TABS } from './constants';

import AccountLayout from '../AccountLayout';
import { CustomSelect } from '../../Controls';

class AssessmentsStudentsLayout extends React.Component {
  componentWillMount() {
    const { groupId, group } = this.props;
    this.props.getGroupsRequest();

    if (!group || parseInt(groupId, 10) !== group.id) {
      this.props.getGroupRequest({ groupId });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { groupId, group } = this.props;

    if (groupId !== nextProps.groupId || (group && _.isNull(nextProps.group))) {
      this.props.getGroupRequest({ groupId: nextProps.groupId });
    }
  }

  getTitle = group => (_.has(group, 'name') ? group.name : null);

  getTabIndicatorProps = group => {
    const backgroundColor = _.has(group, 'color') ? group.color : 'white';
    return { style: { backgroundColor } };
  };

  onChangeTab = (e, value) => {
    const { groupId, history, user } = this.props;
    if (!isTeacher(user)) {
      history.push(`/groups/${groupId}/${value}/`);
    }
  };

  getGroupsOptions = groups =>
    groups ? groups.map((group, index) => ({ key: index, value: group.id, label: this.getTitle(group) })) : [];

  renderGroupsDropdown = (group, isMobilePortrait) => {
    const { classes, groups, history, user } = this.props;
    const options = this.getGroupsOptions(groups);
    const iconStyle = isMobilePortrait ? { width: 30, height: 30 } : { width: 23, height: 23 };
    return (
      <CustomSelect
        icon={ExpandLessIcon}
        iconStyle={iconStyle}
        options={options}
        selectClasses={{ input: classes.group_select_input }}
        value={group.id}
        onChange={value => {
          history.push(`/groups/${value}/${isTeacher(user) ? 'assessments' : 'assigned_assessments'}/`);
        }}
      />
    );
  };

  renderHomeAndNameButtons = (classes, group, isMobilePortrait, iOS) => {
    const { history } = this.props;
    const tooltipText = <FormattedMessage {...messages.showClasses} />;
    return (
      <Grid item xs={isMobilePortrait ? 9 : 3} sm={4} className={classes.header_title}>
        <Tooltip title={tooltipText} arrow className={classes.tooltip}>
          <div>
            <IconHome className={classNames(classes.home_icon, { iOS })} onClick={() => history.push('/')} />
          </div>
        </Tooltip>
        <div className={classNames(classes.header_title_text, { iOS })}>
          {this.renderGroupsDropdown(group, isMobilePortrait)}
        </div>
      </Grid>
    );
  };

  renderTabs = (classes, group, isMobilePortrait, user) => {
    const { groupId, keyName: value } = this.props;
    const customTabsClasses = isMobilePortrait ? { fixed: classes.tabs_fixed } : null;
    return (
      <Grid
        item
        xs={isMobilePortrait ? 12 : 6}
        sm={4}
        className={classNames(classes.header_tabs, { isMobilePortrait })}
      >
        <Tabs
          availableToOpenInNewTab={isTeacher(user)}
          tabs={isTeacher(user) ? TABS(groupId) : STUDENT_TABS}
          value={value}
          TabIndicatorProps={this.getTabIndicatorProps(group)}
          onChange={this.onChangeTab}
          customTabsClasses={customTabsClasses}
        />
      </Grid>
    );
  };

  renderAccountButton = classes => {
    const { history } = this.props;
    return (
      <Grid item xs={3} sm={4} className={classes.account_icon_wrapper}>
        <AccountLayout history={history} />
      </Grid>
    );
  };

  renderAppBar = (classes, group, iOS, user) => (
    <Grid container direction="row" justify="space-between" alignItems="stretch" className={classes.header_container}>
      {this.renderHomeAndNameButtons(classes, group, false, iOS)}
      {this.renderTabs(classes, group, false, user)}
      {this.renderAccountButton(classes)}
    </Grid>
  );

  renderMobilePortraitAppBar = (classes, group, iOS, user) => (
    <Grid container direction="column" justify="center" className={classes.mobile_header_wrapper}>
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="stretch"
        className={classNames(classes.header_container, 'isMobilePortrait')}
      >
        {this.renderHomeAndNameButtons(classes, group, true, iOS)}
        {this.renderAccountButton(classes)}
      </Grid>
      {this.renderTabs(classes, group, true, user)}
    </Grid>
  );

  render() {
    const { children, classes, group, isMobilePortrait, size, user, isMobile } = this.props;
    const iOS = /iPad|iPhone|iPod|Mac/.test(navigator.userAgent) && !window.MSStream;

    if (!_.isObject(user) || !_.isObject(group)) {
      return null;
    }
    const renderAppBar = isMobilePortrait ? this.renderMobilePortraitAppBar : this.renderAppBar;
    return (
      <Fragment>
        <AppBar position="static" className={classNames(classes.header, { isMobilePortrait })} color="transparent">
          {renderAppBar(classes, group, iOS, user)}
        </AppBar>
        {React.cloneElement(children, { size, isMobilePortrait, isMobile })}
      </Fragment>
    );
  }
}

AssessmentsStudentsLayout.propTypes = {
  classes: PropTypes.object,
  children: PropTypes.any,
  group: PropTypes.object,
  groupId: PropTypes.any,
  groups: PropTypes.array,
  history: PropTypes.object,
  isMobile: PropTypes.bool,
  isMobilePortrait: PropTypes.bool,
  keyName: PropTypes.string,
  size: PropTypes.object,
  user: PropTypes.object,
  getGroupRequest: PropTypes.func,
  getGroupsRequest: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  group: makeSelectGroup(),
  groups: makeSelectGroups(),
  user: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  getGroupRequest,
  getGroupsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'groups', reducer });
const withSaga = injectSaga({ key: 'groups', saga });

export default compose(
  withRouter,
  withConnect,
  withReducer,
  withSaga,
  withStyles(styles),
)(AssessmentsStudentsLayout);
