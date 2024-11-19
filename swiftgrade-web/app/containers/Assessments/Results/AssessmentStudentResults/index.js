import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'components/Controls';
import { OnlineAssessmentResultsLayout } from 'components/Layouts';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { withStyles } from '@material-ui/core/styles';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import saga from '../../config/saga';
import reducer from '../../config/reducer';
import {
  getAssessmentFilesRequest,
  getAssessmentFilesSuccess,
  getAssessmentForStudentRequest,
  getStudentResultsRequest,
  getStudentResultsSuccess,
  setAssessment,
} from '../../config/actions';
import { makeSelectAssessment, makeSelectAssessmentFiles, makeSelectStudentResults } from '../../config/selectors';
import { styles } from './styles';

import Content from './Content';
import { NoImmediateResultsView } from './Views';

class AssessmentStudentResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      expandedStudentMarks: [],
    };
  }

  componentWillMount() {
    const { assessmentId, completedAssessmentId, results } = this.props;

    this.props.getAssessmentFilesRequest({ assessmentId, data: { completed_assessment_id: completedAssessmentId } });
    this.props.getAssessmentForStudentRequest({
      assessmentId,
      data: { completed_assessment_id: completedAssessmentId },
    });

    if (!(_.isObject(results) && _.has(results, 'mark'))) {
      this.props.getStudentResultsRequest({ assessmentId, completedAssessmentId });
    }
  }

  componentWillUnmount() {
    this.props.getAssessmentFilesSuccess(null);
    this.props.getStudentResultsSuccess(null);
    this.props.setAssessment(null);
  }

  onChangeState = (key, value) => {
    this.setState({ [key]: value });
  };

  renderHeader = (assessment, results) => {
    const { history, files, isMobilePortrait, kind, user } = this.props;
    return (
      <OnlineAssessmentResultsLayout
        assessment={assessment}
        files={_.isArray(files) ? files : []}
        group={assessment.group}
        history={history}
        isMobilePortrait={isMobilePortrait}
        kind={kind}
        mark={results.mark}
        type={results.type}
        user={user}
      />
    );
  };

  renderContent = (assessment, classes, results) => {
    const { expandedStudentMarks } = this.state;
    return (
      <Content
        assessment={assessment}
        expandedStudentMarks={expandedStudentMarks}
        results={results}
        onChangeState={this.onChangeState}
      />
    );
  };

  render() {
    const { assessment, classes, history, kind, results } = this.props;
    if (
      _.isEmpty(assessment) ||
      _.isEmpty(results) ||
      (assessment && assessment.isLoading) ||
      !_.has(results, 'data')
    ) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }

    if (kind === 'submit' && _.isNull(results.type)) {
      return <NoImmediateResultsView assessment={assessment} history={history} />;
    }

    return (
      <Fragment>
        {this.renderHeader(assessment, results)}
        {this.renderContent(assessment, classes, results)}
      </Fragment>
    );
  }
}

AssessmentStudentResults.propTypes = {
  assessmentId: PropTypes.string,
  completedAssessmentId: PropTypes.string,
  files: PropTypes.array,
  assessment: PropTypes.object,
  classes: PropTypes.object,
  history: PropTypes.object,
  isMobilePortrait: PropTypes.bool,
  kind: PropTypes.string,
  results: PropTypes.object,
  user: PropTypes.object,
  getAssessmentFilesRequest: PropTypes.func,
  getAssessmentFilesSuccess: PropTypes.func,
  getAssessmentForStudentRequest: PropTypes.func,
  getStudentResultsRequest: PropTypes.func,
  getStudentResultsSuccess: PropTypes.func,
  setAssessment: PropTypes.func,
};

const mapDispatchToProps = {
  getAssessmentFilesRequest,
  getAssessmentFilesSuccess,
  getAssessmentForStudentRequest,
  getStudentResultsRequest,
  getStudentResultsSuccess,
  setAssessment,
};

const mapStateToProps = createStructuredSelector({
  assessment: makeSelectAssessment(),
  files: makeSelectAssessmentFiles(),
  results: makeSelectStudentResults(),
  user: makeSelectCurrentUser(),
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
)(AssessmentStudentResults);
