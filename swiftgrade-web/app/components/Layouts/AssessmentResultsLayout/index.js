import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'components/Controls';
import { AppBar, Grid } from '@material-ui/core';
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import {
  getAssessmentRequest,
  setActiveResultsData,
  setAssessment,
  setFilters,
} from 'containers/Assessments/config/actions';
import {
  makeSelectActiveResultsData,
  makeSelectAnalysis,
  makeSelectAnswers,
  makeSelectAssessment,
  makeSelectAverages,
  makeSelectResults,
} from 'containers/Assessments/config/selectors';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import hexRgb from 'hex-rgb';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from 'containers/Assessments/config/reducer';
import rgbHex from 'rgb-hex';
import saga from 'containers/Assessments//config/saga';
import { styles } from './styles';

import AssessmentDetails from './AssessmentDetails';
import EmailMessage from './EmailMessage';
import Tabs from './Tabs';

class AssessmentResultsLayout extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEmailMsg: false,
      tab: 'results',
      tempCount: 0,
    };
  }

  componentWillMount() {
    const { assessmentId } = this.props;
    this.props.getAssessmentRequest({ assessmentId, data: { key: 'edit' } });
  }

  componentWillUnmount() {
    this.props.setActiveResultsData(null);
    this.props.setAssessment(null);
    this.props.setFilters(['correct', 'partially_correct', 'incorrect', 'low_accuracy', 'high_accuracy']);
  }

  getColor = group => {
    const rgbs = hexRgb(group.color);
    return `#${rgbHex(Math.abs(rgbs.red - 75), Math.abs(rgbs.green - 86), Math.abs(rgbs.blue - 62))}`;
  };

  getResultsData = key => {
    const { analysis, answers, averages, results } = this.props;
    return { analysis, answers, averages, results }[key];
  };

  setActiveResultsData = (key, subkey, data) => {
    const { activeResultsData } = this.props;
    const activeData = _.isObject(activeResultsData) ? _.cloneDeep(activeResultsData) : {};

    if (!_.has(activeData, key)) {
      activeData[key] = {};
    }
    activeData[key][subkey] = data;
    this.props.setActiveResultsData(activeData);
  };

  onChangeTab = tab => {
    const { tab: prevTab } = this.state;
    const results = this.getResultsData(prevTab);
    this.setState({ tempCount: results.count }, () => {
      this.setState({ tab });
    });
  };

  onChangeIsEmailMsg = () => {
    this.setState({ isEmailMsg: true }, () => {
      setTimeout(() => {
        this.setState({ isEmailMsg: false });
      }, 2000);
    });
  };

  render() {
    const {
      activeResultsData,
      assessment,
      classes,
      children,
      history,
      setTutorialModalVisibility,
      size,
      isMobile,
    } = this.props;
    const { isEmailMsg, tab, tempCount } = this.state;

    const iOS = /iPad|iPhone|iPod|Mac/.test(navigator.userAgent) && !window.MSStream;
    const results = this.getResultsData(tab);

    if (_.isNull(assessment) || assessment.isLoading) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }
    const color = this.getColor(assessment.group);
    return (
      <Fragment>
        <AppBar
          position="static"
          className={classNames(classes.header, { iOS })}
          color="transparent"
          style={{ backgroundColor: assessment.group.color }}
        >
          <Grid alignItems="flex-start" container direction="row" justify="space-between">
            <AssessmentDetails
              assessment={assessment}
              count={_.has(results, 'count') ? results.count : tempCount}
              history={history}
            />
            <EmailMessage isEmailMsg={isEmailMsg} />
          </Grid>
          <Tabs
            assessment={assessment}
            color={color}
            iOS={iOS}
            tab={tab}
            isMobile={isMobile}
            onChangeTab={this.onChangeTab}
            setTutorialModalVisibility={setTutorialModalVisibility}
          />
        </AppBar>
        {React.cloneElement(children, {
          activeResultsData,
          assessment,
          data: _.has(results, 'data') ? results.data : null,
          color,
          tab,
          size,
          isMobile,
          setActiveResultsData: this.setActiveResultsData,
          isMobile,
          onChangeIsEmailMsg: this.onChangeIsEmailMsg,
        })}
      </Fragment>
    );
  }
}

AssessmentResultsLayout.propTypes = {
  assessmentId: PropTypes.string,
  analysis: PropTypes.array,
  answers: PropTypes.array,
  averages: PropTypes.array,
  results: PropTypes.object,
  activeResultsData: PropTypes.object,
  assessment: PropTypes.object,
  children: PropTypes.object,
  classes: PropTypes.object,
  history: PropTypes.object,
  size: PropTypes.object,
  isMobile: PropTypes.bool,
  getAssessmentRequest: PropTypes.func,
  setActiveResultsData: PropTypes.func,
  setAssessment: PropTypes.func,
  setFilters: PropTypes.func,
  setTutorialModalVisibility: PropTypes.func,
  isMobile: PropTypes.bool,
};

const mapDispatchToProps = {
  getAssessmentRequest,
  setActiveResultsData,
  setAssessment,
  setFilters,
};

const mapStateToProps = createStructuredSelector({
  activeResultsData: makeSelectActiveResultsData(),
  analysis: makeSelectAnalysis(),
  answers: makeSelectAnswers(),
  assessment: makeSelectAssessment(),
  averages: makeSelectAverages(),
  results: makeSelectResults(),
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
)(AssessmentResultsLayout);
