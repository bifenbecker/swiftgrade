import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { StaticMathField } from 'react-mathquill';
import classNames from 'classnames';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { isBlankGenericAnswer } from 'utils/helpers/results/resultsHelper';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { styles } from './styles';
import messages from './messages';
import AutoCorrectionIconView from '../AutocorrectionIconView';
import { formatMCValues } from './formatMCdata';

const NUMERIC_ANSWER_PADDING = { padding: '0px 2px' };
const OPTIONS = ['A', 'B', 'C', 'D', 'E'];

class StudentAnswerView extends Component {
  checkIsCorrectedFIBAnswer = item => item.is_ac_applied;

  getFIBAnswerValue = (item, value, isAnalysis) => {
    if (item.setting && item.setting.includes('autocorrection') && _.has(item, 'correct_answer')) {
      const { correct_answer: correctAnswer } = item;
      const isCorrectedAnswer = this.checkIsCorrectedFIBAnswer(item);
      return isCorrectedAnswer ? correctAnswer.value : value.answer;
    }
    return isAnalysis ? _.capitalize(value.answer) : value.answer;
  };

  getStudentAnswerColor = (key, marks) => {
    const { item } = this.props;
    if (isBlankGenericAnswer(item)) {
      return '#000';
    }
    if (marks[key] && marks[key].value >= marks[key].total) {
      return '#22B14C';
    }
    if (marks[key] && marks[key].value < marks[key].total && marks[key].value > 0) {
      return '#D59102';
    }
    return '#ED1C24';
  };

  renderAutocorrectionIcon = (item, value) => {
    const { classes, isAnalysis } = this.props;

    if (isAnalysis) {
      return null;
    }
    const isAnswerExist = value.answer && !_.isEmpty(value.answer.trim());
    const isCorrectedAnswer = this.checkIsCorrectedFIBAnswer(item);
    const isShowACIcon = item && item.setting.includes('autocorrection') && isCorrectedAnswer && isAnswerExist;
    return (
      <AutoCorrectionIconView
        autocorrectTextClass={classes.autocorrection_text}
        isShowAutocorrectionIcon={isShowACIcon}
        tooltipTitle={
          <FormattedMessage
            {...messages.autocorrectionTooltipMessage}
            values={{
              student_answer: item.student_answer.answer,
              correct_answer: _.has(item.correct_answer, 'value') ? item.correct_answer.value : null,
            }}
          />
        }
      />
    );
  };

  renderFIBAnswer = (item, marks, value) => {
    const { classes, isAnalysis } = this.props;
    return (
      <div
        className={classNames(classes.fib_student_answer_wrapper, { [classes.answer_fib]: isAnalysis })}
        style={{
          color: this.getStudentAnswerColor('answer', marks),
        }}
      >
        {this.getFIBAnswerValue(item, value, isAnalysis)}
        {this.renderAutocorrectionIcon(item, value)}
      </div>
    );
  };

  renderMCAnswer = (marks, value) => {
    let studentAnswers = _.cloneDeep(value.answer);
    const { isAnalysis } = this.props;

    if (!_.isArray(studentAnswers)) {
      return null;
    }

    studentAnswers = studentAnswers
      .map((element, index) => (element === 1 ? OPTIONS[index] : element))
      .filter(element => !_.isNumber(element))
      .join('');

    return (
      <div
        className="letters_answer_field"
        style={{ color: this.getStudentAnswerColor('answer', marks), margin: isAnalysis && 'auto' }}
      >
        <StaticMathField>{studentAnswers}</StaticMathField>
      </div>
    );
  };

  renderNumericAndMFAnswer = (marks, value) => {
    const { answer } = value;
    const { isAnalysis, classes, item } = this.props;
    const sf = item.kind === 'numeric' ? value.significant_figure : null;
    const significantFigureExists =
      sf ||
      (item &&
        item.answers &&
        _.has(item.answers[0], 'significant_figure') &&
        !_.isNull(item.answers[0].significant_figure)) ||
      (item && item.marks && _.has(item.marks, 'significant_figure') && !_.isNull(item.marks.significant_figure));
    const cleanedResult = formatMCValues(value.answer, item);
    return (
      <Grid
        container
        justify={isAnalysis ? 'flex-start' : 'center'}
        direction="row"
        alignItems={_.isNull(answer) || answer.height === 1 ? 'flex-end' : 'center'}
        className={classes.numeric_and_mf_answers}
      >
        <span className="student_answer_value">
          <StaticMathField
            style={{
              color: this.getStudentAnswerColor('answer', marks),
              padding: NUMERIC_ANSWER_PADDING.padding,
            }}
          >
            {cleanedResult}
          </StaticMathField>
        </span>
        {value.unit && (
          <div className="letters_answer_field">
            <StaticMathField
              style={{
                color: this.getStudentAnswerColor('unit', marks),
                padding: NUMERIC_ANSWER_PADDING.padding,
              }}
            >
              {value.unit}
            </StaticMathField>
          </div>
        )}
        {value.answer && significantFigureExists && (
          <StaticMathField
            style={{
              color: this.getStudentAnswerColor('significant_figure', marks),
              padding: NUMERIC_ANSWER_PADDING.padding,
            }}
          >
            {`[SF: ${!_.isNil(sf) ? sf : 'N/A'}]`}
          </StaticMathField>
        )}
      </Grid>
    );
  };

  render() {
    const { item, value } = this.props;
    const { kind, marks } = item;
    if (kind === 'mc') {
      return this.renderMCAnswer(marks, value);
    }

    if (kind === 'fib') {
      return this.renderFIBAnswer(item, marks, value);
    }

    return this.renderNumericAndMFAnswer(marks, value);
  }
}

StudentAnswerView.propTypes = {
  classes: PropTypes.object,
  isAnalysis: PropTypes.bool,
  item: PropTypes.object,
  user: PropTypes.object,
  value: PropTypes.object,
};

StudentAnswerView.defaultProps = {
  isAnalysis: false,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  withStyles(styles),
)(StudentAnswerView);
