import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import _ from 'lodash';
import { StaticMathField } from 'react-mathquill';
import { ExpandMore } from '@material-ui/icons';
import { ClickAwayListener } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles';

const NUMERIC_ANSWER_PADDING = { padding: '0px 2px' };

class CurrentAnswerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  displayMCAnswer = answer => {
    let sortedData = _.cloneDeep(answer);
    sortedData = _.sortBy(sortedData);
    const mcAnswers = sortedData.map((elem, ind) => (ind === answer.length - 1 ? ` ${elem}` : `${elem} `));
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        {mcAnswers.map(letter => (
          <Grid item>
            <StaticMathField>{letter}</StaticMathField>
          </Grid>
        ))}
      </Grid>
    );
  };

  displayNumericAnswer = (answer, assessment, currentAnswerId, itemExists) => {
    const significantFigure = itemExists
      ? assessment.assessment_items[currentAnswerId].answers[0].significant_figure
      : null;
    const unit = itemExists ? assessment.assessment_items[currentAnswerId].answers[0].unit : null;
    const scientificNotation = itemExists
      ? assessment.assessment_items[currentAnswerId].answers[0].scientific_notation
      : null;
    const tolerance = itemExists ? assessment.assessment_items[currentAnswerId].answers[0].tolerance : null;

    const isScientificNotation = _.isNumber(scientificNotation) && scientificNotation !== 0;
    const isSignificantFigure = _.isNumber(significantFigure) && significantFigure !== null;
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <StaticMathField style={{ paddingRight: !isScientificNotation && 2 }}>{answer}</StaticMathField>
        {isScientificNotation && (
          <StaticMathField style={{ paddingRight: '2px' }}>{`e${scientificNotation}`}</StaticMathField>
        )}
        {tolerance !== 0 && tolerance && (
          <StaticMathField style={NUMERIC_ANSWER_PADDING}>{`±${tolerance}%`}</StaticMathField>
        )}
        {!_.isEmpty(unit) && (
          <div className="letters_answer_field">
            <StaticMathField style={NUMERIC_ANSWER_PADDING}>{unit}</StaticMathField>
          </div>
        )}
        {isSignificantFigure && (
          <StaticMathField style={NUMERIC_ANSWER_PADDING}>{`[SF:${significantFigure}]`}</StaticMathField>
        )}
      </Grid>
    );
  };

  getMaxAnswerMark = (answer, kind, setting) => {
    let markValue = 0;
    if (kind === 'numeric') {
      markValue = answer.marks.forEach(mark => {
        if (setting.includes(mark.kind)) {
          markValue += mark.value;
        }
      });
    } else if (kind === 'fib') {
      markValue = answer.marks[0].value;
    }
    return markValue;
  };

  isOpenChange = () => {
    const { assessment } = this.props;
    if (assessment && assessment.assessment_items && assessment.assessment_items.length > 1) {
      this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }
  };

  renderAnswerView = (answers, currentAnswerId, itemExists, kind, setting) => {
    const { assessment, classes } = this.props;
    const { isOpen } = this.state;

    if (!isOpen) {
      return null;
    }
    return (
      <Fragment>
        <ClickAwayListener onClickAway={() => this.setState({ isOpen: false })}>
          <div className={classes.popup_answer_wrap}>
            <div className={classes.popup_answer}>
              {answers.map((answer, index) => (
                <Fragment>
                  <div className={classes.popup_column_left}>
                    <p className={classes.popup_answer_marks_wrap}>
                      <span>
                        {kind && kind === 'numeric' && (
                          <StaticMathField>{`${this.displayNumericAnswer(
                            answer.body.value,
                            assessment,
                            currentAnswerId,
                            itemExists,
                          )} (${this.getMaxAnswerMark(answer, kind, setting)} mark)`}</StaticMathField>
                        )}
                        {kind &&
                          kind === 'fib' &&
                          `${answer.body.value} (${this.getMaxAnswerMark(answer, kind, setting)} mark)`}
                      </span>
                    </p>
                    {answers.length - 1 !== index && <span className={classes.popup_answer_or}>or</span>}
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </ClickAwayListener>
      </Fragment>
    );
  };

  renderExpandMoreIcon = (classes, answers) => {
    const { isOpen } = this.state;
    if (answers.length > 1) {
      return (
        <ExpandMore
          className={classes.arrow_answer_key}
          tabIndex={0}
          role="button"
          onClick={this.isOpenChange}
          style={{ transform: isOpen && 'rotate(180deg)' }}
        />
      );
    }
    return null;
  };

  render() {
    const { assessment, classes, currentAnswerId } = this.props;

    const itemExists = assessment && assessment.assessment_items;

    const answer = itemExists ? assessment.assessment_items[currentAnswerId].answers[0].body.value : '';
    const kind = itemExists ? assessment.assessment_items[currentAnswerId].kind : null;

    const answers =
      assessment && assessment.assessment_items ? assessment.assessment_items[currentAnswerId].answers : [];
    const setting =
      assessment && assessment.assessment_items ? assessment.assessment_items[currentAnswerId].setting : [];

    return (
      <Grid item md={2}>
        <Grid container direction="column" justify="center" alignItems="center">
          {kind && kind === 'numeric' && this.displayNumericAnswer(answer, assessment, currentAnswerId, itemExists)}
          {kind && kind === 'fib' && answer}
          {kind && kind === 'mc' && _.isArray(answer) && this.displayMCAnswer(answer)}
          {this.renderExpandMoreIcon(classes, answers)}
          {this.renderAnswerView(answers, currentAnswerId, itemExists, kind, setting)}
        </Grid>
      </Grid>
    );
  }
}

CurrentAnswerView.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object,
  currentAnswerId: PropTypes.number,
};

export default withStyles(styles)(CurrentAnswerView);
