import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'components/Controls';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { withStyles } from '@material-ui/core';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from 'containers/Assessments/config/reducer';
import saga from 'containers/Assessments/config/saga';
import { getAssessmentForStudentRequest, getAssessmentSettingsRequest } from '../../config/actions';
import { makeSelectAssessment, makeSelectAssessmentSettings } from '../../config/selectors';
import { styles } from './styles';

import AssessmentStart from '../AssessmentStart';
import FillOnlineAssessment from '../FillOnlineAssessment';

class BaseOnlineAssessment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: 'start',
    };
  }

  componentWillMount() {
    const { assessmentId, groupId } = this.props;
    if (assessmentId) {
      this.getAssessmentForStudent(assessmentId);
      // this.props.getAssessmentForStudentRequest({ assessmentId });
      this.props.getAssessmentSettingsRequest({ assessmentId, data: { group_id: groupId } });
    }
  }

  getAssessmentForStudent = assessmentId =>
    new Promise(() => {
      const handleSuccess = assessment => {
        if (assessment && assessment.results_exist) {
          this.onKeyChange('fill');
        }
      };
      this.props.getAssessmentForStudentRequest({ assessmentId, handleSuccess });
    });

  onKeyChange = key => this.setState({ key });

  renderAssessmentFill = assessment => {
    const { assessmentId, history, isMobile, settings, user } = this.props;
    return (
      <FillOnlineAssessment
        assessment={assessment}
        assessmentId={assessmentId}
        history={history}
        isMobile={isMobile}
        settings={settings}
        user={user}
        onKeyChange={this.onKeyChange}
      />
    );
  };

  renderAssessmentStart = assessment => {
    const { settings } = this.props;
    return <AssessmentStart assessment={assessment} onKeyChange={this.onKeyChange} settings={settings} />;
  };

  render() {
    const { key } = this.state;
    const { assessment, classes, settings } = this.props;
    const content = {
      start: this.renderAssessmentStart,
      fill: this.renderAssessmentFill,
    };
    if (_.isNull(assessment) || !_.has(assessment, 'group') || _.isNull(settings)) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }
    return content[key](assessment);
  }
}

BaseOnlineAssessment.propTypes = {
  assessment: PropTypes.object,
  assessmentId: PropTypes.string,
  classes: PropTypes.object,
  getAssessmentSettingsRequest: PropTypes.func,
  getAssessmentForStudentRequest: PropTypes.func,
  groupId: PropTypes.string,
  history: PropTypes.object,
  isMobile: PropTypes.bool,
  settings: PropTypes.object,
  user: PropTypes.object,
};

const mapStateToProps = createStructuredSelector({
  assessment: makeSelectAssessment(),
  settings: makeSelectAssessmentSettings(),
  user: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  getAssessmentForStudentRequest,
  getAssessmentSettingsRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'assessments', saga });
const withReducer = injectReducer({ key: 'assessments', reducer });

export default compose(
  withConnect,
  withReducer,
  withSaga,
  withStyles(styles),
)(BaseOnlineAssessment);
