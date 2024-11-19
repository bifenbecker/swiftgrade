import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import AddIcon from '@material-ui/icons/Add';
import { AssessmentsStudentsTitle, Table, EditableTable } from 'components/DataDisplay';
import { DefaultButton } from 'components/Controls';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { IconEmptyStudents, IconArrowAddStudent, IconClosePopup } from 'components/Svgs';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { showModal, hideModal } from 'components/Modals/Modal/actions';
import { updateCurrentUserRequest } from 'containers/App/actions';
import { withStyles, Tooltip } from '@material-ui/core';
import { STUDENT_TUTORIAL_ADD_ID, PULSE_STUDENTS_INVITE_STUDENTS, TUTORIAL_ADDING_STUDENT } from 'globalConstants';
import { getPulseButtonValue, updatePulseButtons } from 'utils/helpers/common';
import { getEnabledTutorials } from 'utils/helpers/tutorialHelpers';
import StudentCodeModalBody from './StudentCodeModalBody';
import EnrollementOptionsModalBody from './EnrollementOptionsModalBody';
import { getStudentCodeRequest } from '../../actions';

import { styles } from './styles';
import messages from './messages';

import { COLUMNS, MOBILE_PORTRAIT_TABLE_CONTAINER_STYLE, MOBILE_PORTRAIT_TABLE_STYLE, TABLE_STYLE } from './config';

class StudentsTableView extends Component {
  onOrderByChange = (columnId, orderBy) => {
    const orderField = columnId === orderBy ? `-${columnId}` : columnId;
    this.props.onOrderByChange(orderField);
  };

  getEnrollementOptions = () => {
    const { classes, group, isMobile } = this.props;
    this.props.showModal({
      customStyles: {
        width: isMobile ? '' : '45%',
        maxWidth: '740px',
        top: 'auto',
      },
      title: <FormattedMessage {...messages.enrollementOptions} />,
      body: (
        <EnrollementOptionsModalBody
          classes={classes}
          group={group}
          getStudentCode={this.getStudentCode}
          addStudentsManually={this.addStudentsManually}
        />
      ),
    });
  };

  addStudentsManually = () => {
    const { group, isMobile, classes } = this.props;
    this.props.setClickOnManuallyAddStudents();

    this.props.showModal({
      customStyles: {
        width: isMobile ? '' : '70%',
        maxWidth: '1200px',
        height: 'auto',
        top: 'auto',
      },
      title: (
        <div className={isMobile ? classes.table_title : null}>
          <FormattedMessage {...messages.addManuallyTableTitle} />
        </div>
      ),
      body: (
        <EditableTable
          group={group}
          isMobile={isMobile}
          hideModal={this.props.hideModal}
          showModal={this.props.showModal}
          onOrderByChange={this.props.onOrderByChange}
          setTutorialIsRunning={this.props.setTutorialIsRunning}
          setDownloadStudentLoginInfo={this.props.setDownloadStudentLoginInfo}
        />
      ),
    });
  };

  getStudentCode = () => {
    const { classes, group } = this.props;
    const data = { group_id: group.id };
    const title = (
      <Fragment>
        <div className={classes.title_wrap} style={{ paddingRight: 25 }}>
          <FormattedMessage {...messages.addStudentsToGroup} values={{ group: group.name }} />
        </div>
        <button className={classes.popup_close_icon} onClick={() => this.props.hideModal()} type="button">
          <IconClosePopup width={15} height={15} />
        </button>
      </Fragment>
    );

    return new Promise(() => {
      const handleSuccess = code => {
        updatePulseButtons(this.props.user, this.props.updateCurrentUserRequest, PULSE_STUDENTS_INVITE_STUDENTS);
        this.props.showModal({
          title,
          body: <StudentCodeModalBody classes={classes} group={group} code={code} />,
          customStyles: { top: 'auto' },
        });
      };
      this.props.getStudentCodeRequest({ data, groupId: group.id, handleSuccess });
    });
  };

  renderTitle = (classes, group, isMobilePortrait, isEmpty = false) => {
    const { user, studentsAdded } = this.props;
    const isStudentsInviteStudentsEnabled = getPulseButtonValue(user, PULSE_STUDENTS_INVITE_STUDENTS);
    const enabledTutorials = getEnabledTutorials(user);

    return (
      <div className={classNames(classes.title, { isMobilePortrait })}>
        <div className={classNames(classes.assessments_students_title_block, { isMobilePortrait })}>
          <AssessmentsStudentsTitle keyName="students" studentsAdded={studentsAdded} />
        </div>
        <div className={classNames(classes.join_btn_container, { isMobilePortrait })}>
          <Tooltip title={<FormattedMessage {...messages.addStudentsTooltip} />} arrow placement="right">
            <div id={STUDENT_TUTORIAL_ADD_ID} className={classes.add_students}>
              <DefaultButton
                borderRadius={20}
                backgroundColor={group.color}
                startIcon={<AddIcon style={{ marginRight: 4 }} />}
                onClick={this.getEnrollementOptions}
                text={<FormattedMessage {...messages.students} />}
                className={
                  isEmpty && isStudentsInviteStudentsEnabled && !enabledTutorials[TUTORIAL_ADDING_STUDENT]
                    ? classes.pulse
                    : null
                }
              />
            </div>
          </Tooltip>
          {isEmpty && (
            <div className={classes.invite_students_note}>
              <IconArrowAddStudent />
              <FormattedMessage {...messages.inviteStudents} />
            </div>
          )}
        </div>
      </div>
    );
  };

  render() {
    const { classes, color, group, isMobilePortrait, orderBy, students, studentsIds, isMobile } = this.props;
    if (_.isEmpty(students)) {
      return (
        <div className={classes.empty_assessments_container}>
          {this.renderTitle(classes, group, isMobilePortrait, true)}
          <div className={classes.empty_students}>
            <IconEmptyStudents className={classes.empty_students_icon} color={group.color} />
          </div>
        </div>
      );
    }
    const allStudentsSelected = studentsIds.length === students.length;
    return (
      <Table
        columns={COLUMNS(
          allStudentsSelected,
          classes,
          group,
          studentsIds,
          this.props.onStudentsIdsChange,
          this.props.onAllStudentsSelect,
          color,
          isMobile,
        )}
        containerStyle={
          isMobilePortrait ? MOBILE_PORTRAIT_TABLE_CONTAINER_STYLE : { maxHeight: this.props.size.height - 70 }
        }
        data={students}
        orderBy={orderBy}
        stickyHeader={false}
        style={isMobilePortrait ? MOBILE_PORTRAIT_TABLE_STYLE : TABLE_STYLE}
        tableRootClass={classNames(classes.table_root, { isMobile })}
        title={this.renderTitle(classes, group, isMobilePortrait)}
        onOrderByChange={this.onOrderByChange}
      />
    );
  }
}

StudentsTableView.propTypes = {
  classes: PropTypes.object,
  codeData: PropTypes.object,
  color: PropTypes.string,
  group: PropTypes.object,
  isMobilePortrait: PropTypes.bool,
  isMobile: PropTypes.bool,
  isModalActive: PropTypes.bool,
  orderBy: PropTypes.string,
  studentsAdded: PropTypes.bool,
  studentsIds: PropTypes.array,
  students: PropTypes.array,
  size: PropTypes.object,
  user: PropTypes.object,
  getStudentCodeRequest: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
  hideModal: PropTypes.func,
  onAllStudentsSelect: PropTypes.func,
  onOrderByChange: PropTypes.func,
  onStudentsIdsChange: PropTypes.func,
  showModal: PropTypes.func,
  setTutorialIsRunning: PropTypes.func,
  setDownloadStudentLoginInfo: PropTypes.func,
  setClickOnManuallyAddStudents: PropTypes.func,
};

const mapDispatchToProps = {
  getStudentCodeRequest,
  updateCurrentUserRequest,
  hideModal,
  showModal,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(StudentsTableView);
