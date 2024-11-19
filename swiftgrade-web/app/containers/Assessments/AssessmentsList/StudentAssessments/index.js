import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'components/Controls';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectGroup } from 'containers/Groups/selectors';
import { withStyles } from '@material-ui/core/styles';
import { showModal, hideModal } from 'components/Modals/Modal/actions';
import rgbHex from 'rgb-hex';
import hexRgb from 'hex-rgb';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from 'containers/Assessments/config/reducer';
import saga from 'containers/Assessments/config/saga';
import { getAssessmentsRequest, setAssessments } from 'containers/Assessments/config/actions';
import { makeSelectAssessments, makeSelectLoading } from 'containers/Assessments/config/selectors';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { styles } from './styles';

import { StudentTableView } from '../Views';

class StudentAssessments extends Component {
  componentWillMount() {
    const { kind } = this.props;
    const requestData = this.prepareAssessmentRequestData(kind);
    this.props.getAssessmentsRequest(requestData);
  }

  componentWillReceiveProps(nextProps) {
    const { groupId, group } = this.props;
    if (
      groupId !== nextProps.groupId ||
      (!_.isNull(group) && group.id !== nextProps.groupId && group !== nextProps.group)
    ) {
      const requestData = this.prepareAssessmentRequestData(nextProps.kind);
      this.props.getAssessmentsRequest(requestData);
    }
  }

  componentWillUnmount() {
    this.props.setAssessments(null);
    this.props.hideModal();
  }

  prepareAssessmentRequestData = kind => {
    const { groupId, orderBy } = this.props;
    const requestData = { data: { group_id: groupId }, kind };

    if (orderBy) {
      requestData.data.ordering = orderBy;
    }

    return requestData;
  };

  getColor = group => {
    const rgbs = hexRgb(group.color);
    return `#${rgbHex(Math.abs(rgbs.red - 75), Math.abs(rgbs.green - 86), Math.abs(rgbs.blue - 62))}`;
  };

  renderAssessments = (classes, color, assessments) => {
    const { group, history, isMobilePortrait, kind, size, user, isMobile } = this.props;
    return (
      <StudentTableView
        assessments={assessments}
        color={color}
        group={group}
        history={history}
        isMobile={isMobile}
        isMobilePortrait={isMobilePortrait}
        kind={kind}
        size={size}
        user={user}
      />
    );
  };

  render() {
    const { assessments, classes, group, loading, user } = this.props;

    const isLoading =
      _.isNull(assessments) ||
      _.isNull(group) ||
      !_.isObject(user) ||
      (assessments && assessments.isLoading) ||
      (group && group.isLoading) ||
      loading;

    if (isLoading) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }
    const color = this.getColor(group);
    return this.renderAssessments(classes, color, assessments);
  }
}

StudentAssessments.propTypes = {
  groupId: PropTypes.any,
  assessments: PropTypes.any,
  isMobilePortrait: PropTypes.bool,
  loading: PropTypes.bool,
  isMobile: PropTypes.bool,
  kind: PropTypes.string,
  classes: PropTypes.object,
  group: PropTypes.object,
  history: PropTypes.object,
  orderBy: PropTypes.string,
  size: PropTypes.object,
  user: PropTypes.object,
  getAssessmentsRequest: PropTypes.func,
  hideModal: PropTypes.func,
  setAssessments: PropTypes.func,
};

const mapDispatchToProps = {
  getAssessmentsRequest,
  hideModal,
  setAssessments,
  showModal,
};

const mapStateToProps = createStructuredSelector({
  assessments: makeSelectAssessments(),
  group: makeSelectGroup(),
  loading: makeSelectLoading(),
  user: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'assessments', reducer });
const withSaga = injectSaga({ key: 'assessments', saga });

export default compose(
  withSaga,
  withReducer,
  withConnect,
  withStyles(styles),
)(StudentAssessments);
