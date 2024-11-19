import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { AssessmentLayout } from 'components/Layouts';
import SubmissionError from 'redux-form/lib/SubmissionError';
import { IconAstronaut } from 'components/Svgs';
import { StartAssessmentForm } from 'components/Forms';
import { compose } from 'redux';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import saga from 'containers/Assessments/config/saga';
import { createStructuredSelector } from 'reselect';
import { Loading } from 'components/Controls';
import _ from 'lodash';
import injectReducer from 'utils/injectReducer';
import reducer from 'containers/Assessments/config/reducer';
import { resetForm } from 'containers/App/actions';
import { isAssessmentPasswordExist } from 'utils/helpers/assessments';
import { makeSelectAssessment } from '../../config/selectors';
import { getAssessmentForStudentRequest, setAssessment, startOnlineAssessmentRequest } from '../../config/actions';
import { styles } from './styles';

class AssessmentStart extends React.Component {
  componentWillMount() {
    const { assessmentId } = this.props;
    this.props.getAssessmentForStudentRequest({ assessmentId });
  }

  componentWillUnmount() {
    this.props.setAssessment(null);
    this.props.resetForm('StartAssessmentForm');
  }

  handleSubmit = formData => {
    const { assessment, assessmentId, groupId, history } = this.props;
    const data = isAssessmentPasswordExist(assessment) && formData && formData.toJS ? formData.toJS() : null;

    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };
      const handleSuccess = () => {
        history.push(`/groups/${groupId}/assessments/${assessmentId}/process/`);
      };

      this.props.startOnlineAssessmentRequest({ assessmentId, data, handleSuccess, handleErrors });
    });
  };

  renderHeader = () => {
    const { assessment, classes, history } = this.props;
    return (
      <AssessmentLayout group={assessment.group} history={history} previousPageKey="assigned_assessments">
        <div className={classes.assessment_name}>{assessment.name}</div>
      </AssessmentLayout>
    );
  };

  render() {
    const { assessment, classes } = this.props;

    if (_.isNull(assessment)) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }

    if (_.isNull(assessment.settings)) {
      return null;
    }

    return (
      <Fragment>
        {this.renderHeader()}
        <div className={classes.assessment_start_container}>
          <div className={classes.start_image}>
            <IconAstronaut className={classes.start_image_icon} color={assessment.group.color} />
          </div>
          <StartAssessmentForm assessment={assessment} onSubmit={this.handleSubmit} settings={assessment.settings} />
        </div>
      </Fragment>
    );
  }
}

AssessmentStart.propTypes = {
  assessment: PropTypes.object,
  assessmentId: PropTypes.string,
  classes: PropTypes.object,
  groupId: PropTypes.string,
  history: PropTypes.object,
  getAssessmentForStudentRequest: PropTypes.func,
  resetForm: PropTypes.func,
  setAssessment: PropTypes.func,
  startOnlineAssessmentRequest: PropTypes.func,
};

const mapDispatchToProps = {
  getAssessmentForStudentRequest,
  resetForm,
  setAssessment,
  startOnlineAssessmentRequest,
};

const mapStateToProps = createStructuredSelector({
  assessment: makeSelectAssessment(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'assessments', reducer });
const withSaga = injectSaga({ key: 'assessments', saga });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  withStyles(styles),
)(AssessmentStart);
