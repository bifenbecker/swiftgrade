import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { ClickAwayListener, Grid, Tooltip } from '@material-ui/core';
import { IconClosePopup, IconInfo } from 'components/Svgs';
import { StaticMathField } from 'react-mathquill';
import { FormattedMessage } from 'react-intl';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import classNames from 'classnames';
import _ from 'lodash';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import './styles.scss';
import messages from './messages';
import AutoCorrectionIconView from '../AutocorrectionIconView';

const NUMERIC_ANSWER_STYLES = { padding: '0px 2px', minHeight: 20 };
const MARKS_MAP = {
  answer: 'A',
  unit: 'U',
  significant_figure: 'SF',
};

class TeacherAnswerView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  convertAnswersMarksToObj = marks => {
    const updatedMarks = {};
    marks.forEach(mark => {
      updatedMarks[mark.kind] = mark.value;
    });

    return updatedMarks;
  };

  getMarks = (marks, isSingleMark) => {
    const { isAnswers } = this.props;
    let marksTitle = '';
    const updatedMarks = isAnswers ? this.convertAnswersMarksToObj(marks) : marks;
    const firstMark = _.has(updatedMarks, 'answer') ? updatedMarks.answer : null;

    if (isSingleMark) {
      return { firstMark, marksTitle: firstMark };
    }

    Object.keys(MARKS_MAP).map(key => {
      if (_.has(updatedMarks, key)) {
        marksTitle += `${MARKS_MAP[key]}: ${updatedMarks[key]}, `;
      }
      return key;
    });

    marksTitle = marksTitle.slice(0, -2);
    return { firstMark, marksTitle };
  };

  getIsSingle = data => Object.keys(data).length <= 2;

  getMarksMessage = data => {
    if (_.isNull(data) || _.isEmpty(data)) {
      return null;
    }
    const single = this.getIsSingle(data);
    const marksData = this.getMarks(data, single);
    const marks = marksData.marksTitle;
    if (single && marksData.firstMark === 1) {
      return <FormattedMessage {...messages.singleMark} values={{ marks }} />;
    }
    return <FormattedMessage {...messages.marks} values={{ marks }} />;
  };

  isCorrectAnswer = (item, value) => item.correct_answer && item.correct_answer.id === value.id;

  isOpenChange = () => {
    const { item, isAnswers } = this.props;
    const { answers, kind, body } = item;
    if (answers.length > 1 || (isAnswers && ['numeric', 'mf'].includes(kind) && body.height > 2)) {
      this.setState(prevState => ({ isOpen: !prevState.isOpen }));
    }
  };

  isWholeAnswerMatched = item =>
    item && _.has(item, 'marks') && Object.values(item.marks).every(mark => mark.value > 0);

  isAnswerMatched = item => item && _.has(item, 'marks') && Object.values(item.marks).some(mark => mark.value > 0);

  isAnswerHighlighted = (item, value, answerKind = null) => {
    if (!_.isNull(answerKind)) {
      return (
        !this.isWholeAnswerMatched(item) &&
        this.isCorrectAnswer(item, value) &&
        item &&
        _.has(item, 'marks') &&
        item.marks[answerKind].value > 0
      );
    }
    return this.isCorrectAnswer(item, value) && this.isWholeAnswerMatched(item);
  };

  renderExpandMoreIcon = (classes, item) => {
    const { isAnswers } = this.props;
    const { isOpen } = this.state;
    const { body, kind, multiple_answer: multipleAnswer } = item;
    if (multipleAnswer || (isAnswers && ['numeric', 'mf'].includes(kind) && body.height > 2)) {
      return (
        <Tooltip title={<FormattedMessage {...messages.showAllAnswers} />} arrow>
          <ExpandMoreIcon
            className={classNames(classes.arrow_answer_key, {
              results_tab: !isAnswers,
              reversed: isOpen,
            })}
            tabIndex={-1}
            role="button"
            onClick={this.isOpenChange}
          />
        </Tooltip>
      );
    }
    return null;
  };

  isShowAnswersInfoIcon = (item, assessment, v) => {
    if (Number.isInteger(assessment)) return false;
    const answers = !assessment
      ? item.answers
      : assessment.assessment_items.find(a => a.id === item.assessment_item_id).answers;
    return answers.some(answer => (!v ? !answer.body.valid : answer.id === v.id && !answer.body.valid));
  };

  renderSubAnswer = (isMarkMsg, item, v) => {
    const { classes, isAnswers, assessment } = this.props;
    const isShowInfoIcon = item.kind === 'mf' ? this.isShowAnswersInfoIcon(item, assessment, v) : false;
    const content = (
      <Fragment>
        <Grid
          direction="row"
          justify="center"
          alignItems={item.correct_answer && item.correct_answer.height === 1 ? 'flex-end' : 'center'}
          className={classNames(
            {
              [classes.glow]: this.isAnswerHighlighted(item, v),
            },
            classes.result_answer,
          )}
        >
          {item.kind === 'mf' && this.renderMFAnswer(v, true)}
          {item.kind === 'numeric' && this.renderNumericAnswer(v, true)}
          {item.kind === 'mc' && this.renderMCAnswer(v)}
          {item.kind === 'fib' && <Fragment>{isAnswers ? v.body.value : v.value}</Fragment>}
        </Grid>
        {isMarkMsg && <span>&nbsp;{this.getMarksMessage(v.marks)}</span>}
        &nbsp;{this.renderInfoIcon(this.props.classes, isShowInfoIcon)}
      </Fragment>
    );

    return (
      <p className={classes.popup_answer_marks_wrap}>
        {this.isCorrectAnswer(item, v) && this.isAnswerMatched(item) ? (
          <Tooltip title={<FormattedMessage {...messages.matchedCorrectAnswer} />} placement="right">
            <div className={classes.answer_wrap}>{content}</div>
          </Tooltip>
        ) : (
          content
        )}
      </p>
    );
  };

  renderAnswers = (item, value) => {
    const { classes, isAnswers } = this.props;
    const isMarkMsg = !isAnswers || (isAnswers && value.length > 1);
    const maxHeight = window.innerHeight - 160;
    return (
      <div className={classNames(classes.popup_answer)} style={{ maxHeight: isAnswers && maxHeight }}>
        <IconClosePopup className={classes.popup_close_button} tabIndex={0} role="button" onClick={this.isOpenChange} />
        <Fragment>
          {value.map((v, i) => (
            <Fragment>
              {this.renderSubAnswer(isMarkMsg, item, v)}
              {value.length - 1 !== i && <span className={classes.popup_answer_or}>or</span>}
            </Fragment>
          ))}
        </Fragment>
      </div>
    );
  };

  renderAnswerView = item => {
    const { classes, isAnswers, value } = this.props;
    const { isOpen } = this.state;
    if (!isOpen) {
      return null;
    }
    return (
      <Fragment>
        <ClickAwayListener onClickAway={() => this.setState({ isOpen: false })}>
          <div className={classNames(classes.popup_answer_wrap, { results_tab: !isAnswers })}>
            {this.renderAnswers(item, value)}
          </div>
        </ClickAwayListener>
      </Fragment>
    );
  };

  renderAnswerMessage = () => {
    const { isAnswers, isMobile, classes } = this.props;
    return (
      <Fragment>
        {isAnswers && (
          <div className={classNames(classes.answer_message, { isMobile })}>
            {isMobile ? <FormattedMessage {...messages.key} /> : <FormattedMessage {...messages.answerKey} />}:
          </div>
        )}
      </Fragment>
    );
  };

  renderAutocorrectionIcon = item => {
    const { classes, isAnswers } = this.props;
    const isShowACIcon = isAnswers && _.has(item, 'setting') && item.setting.includes('autocorrection');

    return (
      <Fragment>
        &nbsp;
        <AutoCorrectionIconView
          autocorrectTextClass={classes.autocorrection_text}
          isShowAutocorrectionIcon={isShowACIcon}
          tooltipTitle={<FormattedMessage {...messages.autocorrectionTooltipMessage} />}
        />
        &nbsp;
      </Fragment>
    );
  };

  renderInfoIcon = (classes, isShowInfoIcon) => {
    if (isShowInfoIcon) {
      return (
        <Tooltip
          title={<FormattedMessage {...messages.infoIconTooltipMessage} />}
          placement="top"
          classes={{ tooltip: classes.character_matching_tooltip }}
        >
          <div>
            <IconInfo style={{ margin: '0px 0px 3px 2px', width: 18, height: 18 }} />
          </div>
        </Tooltip>
      );
    }
    return null;
  };

  renderNumericAndMFAnswerWrapper = (item, assessment) => {
    const isShowInfoIcon = this.isShowAnswersInfoIcon(item, assessment);

    return (
      <Fragment>
        {this.renderAnswerMessage()}
        <Grid
          container
          direction="row"
          justify="center"
          alignItems={item.correct_answer && item.correct_answer.height === 1 ? 'flex-end' : 'center'}
        >
          {item.kind === 'numeric' ? this.renderNumericAnswer(item.answers[0]) : this.renderMFAnswer(item.answers[0])}
          {this.renderExpandMoreIcon(this.props.classes, item)}
          {this.renderAnswerView(item)}
          {this.renderInfoIcon(this.props.classes, isShowInfoIcon)}
        </Grid>
      </Fragment>
    );
  };

  renderUnit = (answer, isSubAnswer, item, isSignificantFigure = null) => {
    const { classes } = this.props;
    const { unit } = answer;
    return (
      !_.isEmpty(unit) && (
        <div
          className={classNames('letters_answer_field', {
            [classes.glow]: isSubAnswer && this.isAnswerHighlighted(item, answer, 'unit'),
          })}
        >
          <StaticMathField
            className={classNames({ unit_answer_with_degree: unit.includes('^') && !isSignificantFigure })}
            style={NUMERIC_ANSWER_STYLES}
          >
            {unit}
          </StaticMathField>
        </div>
      )
    );
  };

  renderNumericAndMFAnswerValue = (answer, isScientificNotation = null) => {
    const { isAnswers, item } = this.props;
    const { body, value } = answer;
    return (
      <StaticMathField
        className="numeric_answer"
        style={{
          paddingRight: !isScientificNotation && 2,
          marginLeft: item.need_grading && !item.header_answer && '20px',
        }}
      >
        {isAnswers ? body.value : value}
      </StaticMathField>
    );
  };

  renderNumericAnswer = (answer, isSubAnswer = false) => {
    const { classes, item } = this.props;
    const { scientific_notation: scientificNotation, significant_figure: significantFigure, tolerance } = answer;

    const isScientificNotation = _.isNumber(scientificNotation) && scientificNotation !== 0;
    const isSignificantFigure = _.isNumber(significantFigure) && significantFigure !== null;
    return (
      <Fragment>
        <div
          className={classNames(classes.answer_wrap, {
            [classes.glow]: isSubAnswer && this.isAnswerHighlighted(item, answer, 'answer'),
          })}
        >
          {this.renderNumericAndMFAnswerValue(answer, isScientificNotation)}
          {isScientificNotation && (
            <div style={{ paddingRight: '2px', minHeight: '20px' }}>
              <span style={{ fontSize: '15px' }}>E</span>
              <StaticMathField className="numeric_answer_letters">{scientificNotation}</StaticMathField>
            </div>
          )}
          {tolerance !== 0 && tolerance && (
            <StaticMathField
              className="tolerance_answer"
              style={NUMERIC_ANSWER_STYLES}
            >{`±${tolerance}%`}</StaticMathField>
          )}
        </div>
        {this.renderUnit(answer, isSubAnswer, item, isSignificantFigure)}
        {isSignificantFigure && (
          <div
            className={classNames({
              [classes.glow]: isSubAnswer && this.isAnswerHighlighted(item, answer, 'significant_figure'),
            })}
          >
            <StaticMathField style={NUMERIC_ANSWER_STYLES}>{`[SF:${significantFigure}]`}</StaticMathField>
          </div>
        )}
      </Fragment>
    );
  };

  renderMFAnswer = (answer, isSubAnswer = false) => {
    const { classes, item } = this.props;

    return (
      <Fragment>
        <div
          className={classNames(classes.answer_wrap, {
            [classes.glow]: isSubAnswer && this.isAnswerHighlighted(item, answer, 'answer'),
          })}
        >
          {this.renderNumericAndMFAnswerValue(answer)}
        </div>
        {this.renderUnit(answer, isSubAnswer, item)}
      </Fragment>
    );
  };

  renderMCAnswerWrapper = item => (
    <Fragment>
      {this.renderAnswerMessage()}
      <Grid container direction="row" justify="center" alignItems="center" spacing={1}>
        {this.renderMCAnswer(item.answers[0])}
        {this.renderExpandMoreIcon(this.props.classes, item)}
        {this.renderAnswerView(item)}
      </Grid>
    </Fragment>
  );

  renderMCAnswer = data => {
    let sortedData = _.cloneDeep(data.value);
    sortedData = _.sortBy(sortedData).join('');
    return (
      <Fragment>
        <div className="letters_answer_field">
          <StaticMathField>{sortedData}</StaticMathField>
        </div>
      </Fragment>
    );
  };

  renderFibAnswerWrapper = item => {
    const { classes } = this.props;
    return (
      <Fragment>
        {this.renderAnswerMessage()}
        <Grid
          className={classes.fib_answer_wrapper}
          container
          direction="row"
          justify="center"
          alignItems="center"
          spacing={1}
        >
          {item.answers ? item.answers[0].value : ''}
          {this.renderExpandMoreIcon(classes, item)}
          {this.renderAnswerView(item)}
        </Grid>
        {this.renderAutocorrectionIcon(item)}
      </Fragment>
    );
  };

  render() {
    const { item, assessment } = this.props;

    if (item.kind === 'fib') {
      return this.renderFibAnswerWrapper(item);
    }
    if (['numeric', 'mf'].includes(item.kind)) {
      return this.renderNumericAndMFAnswerWrapper(item, assessment);
    }
    return this.renderMCAnswerWrapper(item);
  }
}

TeacherAnswerView.propTypes = {
  isAnswers: PropTypes.bool,
  isMobile: PropTypes.bool,
  classes: PropTypes.object,
  customClasses: PropTypes.object,
  item: PropTypes.object,
  size: PropTypes.object,
  value: PropTypes.array,
  assessment: PropTypes.object,
};

TeacherAnswerView.defaultProps = {
  customClasses: null,
  isAnswers: false,
};

export default compose(withStyles(styles))(TeacherAnswerView);
