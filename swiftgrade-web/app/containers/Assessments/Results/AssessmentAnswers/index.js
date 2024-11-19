import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'components/Controls';
import { Table } from 'components/DataDisplay';
import { FormattedMessage } from 'react-intl';
import { LightenDarkenColor } from 'lighten-darken-color';
import { Grid } from '@material-ui/core';
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import {
  getAnswersRequest,
  getAnswersSuccess,
  updateAnswerNeedGradingRequest,
} from 'containers/Assessments/config/actions';
import { makeSelectFilters } from 'containers/Assessments/config/selectors';
import { getFilters } from 'utils/helpers/results/resultsHelper';
import { styles } from './styles';
import { COLUMNS, TABLE_STYLE } from './config';
import Header from './Header';
import messages from './messages';

class AssessmentAnswers extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      expandedStudentMarks: [],
      orderBy: 'last_name',
    };
  }

  componentWillMount() {
    let { number, orderBy } = this.state;
    const { activeResultsData, assessment, filters } = this.props;

    if (activeResultsData && activeResultsData.answers) {
      number = activeResultsData.answers.number ? activeResultsData.answers.number : number;
      orderBy = activeResultsData.answers.orderBy ? activeResultsData.answers.orderBy : orderBy;
      this.setState({ number, orderBy });
    }

    if (assessment && assessment.assessment_items) {
      this.getAnswers(assessment.id, number, filters, orderBy);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { data: answers } = nextProps;
    const { number } = this.state;

    if (this.props.data !== answers && _.has(answers, 'numbers') && !answers.numbers.includes(number)) {
      const newNumbers = answers.numbers.filter(n => n > number);
      this.setState({ number: _.isEmpty(newNumbers) ? answers.numbers[0] : newNumbers[0] });
    }
  }

  componentWillUnmount() {
    this.props.getAnswersSuccess(null);
  }

  getAnswers = (assessmentId, number, filters, ordering) => {
    this.props.getAnswersRequest({
      assessmentId,
      number,
      filters: getFilters(filters),
      ordering,
    });
    this.setState({ number });
  };

  getColumns = () => {
    const { expandedStudentMarks, orderBy } = this.state;
    const { classes, assessment } = this.props;
    const blankColor = LightenDarkenColor(assessment.group.color, -60);
    let columns = COLUMNS(classes, expandedStudentMarks, orderBy, this.onDisplayStudentMarks, blankColor);
    if (assessment && assessment.type === 'online') {
      columns = columns.filter(item => item.id !== 'student_image');
    }
    return columns;
  };

  onChangeAnswer = number => {
    const { assessment, filters } = this.props;
    const { orderBy } = this.state;
    this.getAnswers(assessment.id, number, filters, orderBy);
    this.props.setActiveResultsData('answers', 'number', number);
  };

  onDisplayStudentMarks = item => {
    const { expandedStudentMarks: currentExpandedStudentMarksState } = this.state;
    const expandedStudentMarks = _.cloneDeep(currentExpandedStudentMarksState);
    const { id } = item;
    if (expandedStudentMarks.includes(id)) {
      expandedStudentMarks.splice(expandedStudentMarks.indexOf(id), 1);
    } else {
      expandedStudentMarks.push(id);
    }
    this.setState({ expandedStudentMarks });
  };

  onOrderByChange = (columnId, orderField) => {
    const { assessment, filters } = this.props;
    const { number } = this.state;
    const orderBy = columnId === orderField ? `-${columnId}` : columnId;
    this.getAnswers(assessment.id, number, filters, orderBy);
    this.setState({ orderBy });
    this.props.setActiveResultsData('answers', 'orderBy', orderBy);
  };

  onRemoveNeedGradingClick = () => {
    const { assessment, filters } = this.props;
    const { number, orderBy } = this.state;
    this.props.updateAnswerNeedGradingRequest({
      assessmentId: assessment.id,
      data: { number, filters: getFilters(filters), ordering: orderBy },
    });
  };

  onSwitchAnswer = key => {
    const { number, orderBy } = this.state;
    const { data, assessment, filters } = this.props;

    let currentAnswerNumber = number;
    const currentNumberIndex = data.numbers.indexOf(currentAnswerNumber);

    if (key === 'prev') {
      currentAnswerNumber =
        currentNumberIndex === 0 ? data.numbers[data.numbers.length - 1] : data.numbers[currentNumberIndex - 1];
    }
    if (key === 'next') {
      currentAnswerNumber =
        currentNumberIndex === data.numbers.length - 1 ? data.numbers[0] : data.numbers[currentNumberIndex + 1];
    }
    this.getAnswers(assessment.id, currentAnswerNumber, filters, orderBy);
    this.setState({ number: currentAnswerNumber });
    this.props.setActiveResultsData('answers', 'number', currentAnswerNumber);
  };

  renderAssessmentAnswers = () => {
    const { orderBy } = this.state;
    const { data, classes } = this.props;
    const { data: answers } = data;

    if (_.isEmpty(data.data)) {
      return (
        <Grid container direction="column" className={classes.no_students}>
          <Grid item>
            <FormattedMessage {...messages.noStudent} />
          </Grid>
          <Grid item>
            <FormattedMessage {...messages.clearFilters} />
          </Grid>
        </Grid>
      );
    }

    return (
      <div className={classes.table_main_wrapper}>
        <Table
          className={classes.body_column}
          columns={this.getColumns()}
          data={answers}
          orderBy={orderBy}
          stickyHeader={false}
          style={TABLE_STYLE}
          onOrderByChange={this.onOrderByChange}
          customClassTable={classes.table_height}
        />
      </div>
    );
  };

  render() {
    const { assessment, classes, data, isMobile } = this.props;
    const { number, orderBy } = this.state;

    if (_.isNull(data)) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }

    return (
      <Fragment>
        <Header
          answersData={data.data}
          assessment={assessment}
          classes={classes}
          number={number}
          numbers={data.numbers}
          orderBy={orderBy}
          isMobile={isMobile}
          getAnswers={this.getAnswers}
          onChangeAnswer={this.onChangeAnswer}
          onRemoveNeedGradingClick={this.onRemoveNeedGradingClick}
          onSwitchAnswer={this.onSwitchAnswer}
        />
        {this.renderAssessmentAnswers()}
      </Fragment>
    );
  }
}

AssessmentAnswers.propTypes = {
  filters: PropTypes.any,
  activeResultsData: PropTypes.object,
  assessment: PropTypes.object,
  classes: PropTypes.object,
  data: PropTypes.object,
  isMobile: PropTypes.bool,
  getAnswersRequest: PropTypes.func,
  getAnswersSuccess: PropTypes.func,
  setActiveResultsData: PropTypes.func,
  updateAnswerNeedGradingRequest: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  filters: makeSelectFilters(),
});

const mapDispatchToProps = {
  getAnswersRequest,
  getAnswersSuccess,
  updateAnswerNeedGradingRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(AssessmentAnswers);
