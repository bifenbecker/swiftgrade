import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  FIBAnswerField,
  MathFormulaAnswerField,
  MCAnswerField,
  NonDecimalAnswerField,
  ScientificNotationField,
  ToleranceField,
  UnitField,
} from 'components/Fields';
import { Field, FieldArray, change } from 'redux-form/immutable';
import { FormattedMessage, injectIntl } from 'react-intl';
import { Grid, Tooltip, withWidth } from '@material-ui/core';
import { IconMinus, IconPlus, IconPlusMinus } from 'components/Svgs';
import _ from 'lodash';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { getAnswerName, getNextInputName } from 'utils/helpers/assessments/getter';
import { ANSWERS } from 'utils/helpers/assessments/constants';
import { styles } from './styles/answers';
import messages from './messages';

import Marks from './Marks';
import { SIZE } from './config';

class Answers extends React.Component {
  componentWillMount() {
    const { index } = this.props;

    if (!_.isNull(index)) {
      this.props.recomputeRowHeights();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { answers, heights, index } = nextProps;
    const { answers: prevAnswers } = this.props;

    if (this.props.heights && heights && !_.isNull(index)) {
      const prevHeight = this.props.heights.get(index);
      const height = heights.get(index);

      if (prevHeight !== height) {
        this.props.recomputeRowHeights();
      }
    }

    if (!_.isNull(index) && prevAnswers && answers && prevAnswers.size !== answers.size) {
      this.props.recomputeRowHeights();
    }
  }

  getComponent = kind => {
    if (kind === 'mc') {
      return MCAnswerField;
    }
    if (kind === 'mf') {
      return MathFormulaAnswerField;
    }
    if (kind === 'fib') {
      return FIBAnswerField;
    }

    return NonDecimalAnswerField;
  };

  getIsSF = (isAddRow, setting) => {
    let isSFTurnedOn = setting.includes('significant_figure');

    if (!isSFTurnedOn && !isAddRow) {
      isSFTurnedOn = setting.get('numeric') && setting.get('numeric').includes('significant_figure');
    }
    return isSFTurnedOn;
  };

  getMaxScore = (answers, setting) => {
    const eachAnswerSumMarks = [];

    if (answers && answers.toJS) {
      answers.toJS().map(answer => {
        let answerMarksSum = 0;
        answer.marks.forEach(mark => {
          if (mark.kind === 'answer' || setting.includes(mark.kind)) {
            answerMarksSum += mark.value;
          }
          return mark;
        });
        eachAnswerSumMarks.push(answerMarksSum);
        return answer;
      });
    }
    return Math.max.apply(null, eachAnswerSumMarks);
  };

  setMarks = (isAdd, fields, index, lastRowIndex) => {
    if (isAdd) {
      const { answers, kind } = this.props;
      const body = ANSWERS.get(kind)
        .get(0)
        .get('body');

      const fieldName = _.isNull(this.props.index)
        ? `answers.${kind}[${lastRowIndex + 1}].body`
        : `assessment_items[${this.props.index}].answers.${kind}[${lastRowIndex + 1}].body`;

      const marks = answers
        .get(lastRowIndex)
        .get('marks')
        .map(mark => mark.filter((value, key) => ['kind', 'value'].includes(key)));

      let lastRowData = answers
        .get(lastRowIndex)
        .filter((value, key) => key !== 'id')
        .set('body', body);
      lastRowData = lastRowData.set('significant_figure', null);
      lastRowData = lastRowData.set('marks', marks);
      fields.push(lastRowData);

      this.props.setFormValue('field_for_focus', fieldName);
    } else {
      fields.remove(index);
    }
  };

  renderAddBtn = (answers, item, index, props) => {
    const len = answers && answers.toJS ? answers.size : 0;
    const disabled = len >= 8;
    return (
      <Tooltip
        title={
          index === 0 ? (
            <FormattedMessage {...messages.addSubAnswer} />
          ) : (
            <FormattedMessage {...messages.removeSubAnswer} />
          )
        }
        placement="top"
        arrow
      >
        <Grid item className={props.classes.add_btn}>
          {index === 0 ? (
            <IconPlus
              disabled={disabled}
              className={classNames(props.classes.add_btn_icon, { disabled })}
              onClick={() => !disabled && this.setMarks(true, props.fields, index, len - 1)}
            />
          ) : (
            <IconMinus
              className={classNames(props.classes.add_btn_icon, props.classes.minus_icon)}
              onClick={() => this.setMarks(false, props.fields, index, len - 1)}
            />
          )}
        </Grid>
      </Tooltip>
    );
  };

  renderScientificNotation = (item, isSFTurnedOn, mathWithSetting, props) => {
    const { addRow, index, isAddRow, group, disabled } = this.props;
    return (
      <Grid
        item
        xl={1}
        lg={1}
        md={1}
        sm={3}
        xs={4}
        className={classNames(props.classes.scientific_notation_field_wrapper, {
          withSF: isSFTurnedOn,
          mathWithSetting,
        })}
      >
        <div className={props.classes.scientific_notation_number}>
          <div className={props.classes.scientific_notation_e}>E</div>
          <div className={props.classes.scientific_notation_field}>
            <Field
              component={ScientificNotationField}
              key={`${item}.scientific_notation`}
              name={`${item}.scientific_notation`}
              placeholder=""
              index={index}
              addRow={addRow}
              group={group}
              isAddRow={isAddRow}
              disabled={disabled}
            />
          </div>
        </div>
      </Grid>
    );
  };

  renderUnits = (item, props) => (
    <Grid item md={2} sm={4} xs={4} className={props.classes.unit_field}>
      <Field
        addRow={this.props.addRow}
        component={UnitField}
        disabled={props.disabled}
        index={this.props.index}
        key={`${item}.unit`}
        kind={props.kind}
        name={`${item}.unit`}
        placeholder=""
        isMobile={props.isMobile}
      />
    </Grid>
  );

  renderTolerance = (answers, item, index, mathWithSetting, props) => {
    const tolerance = answers.get(index).get('tolerance');
    const isSN = props.setting.includes('scientific_notation');
    const toleranceTooltip = <FormattedMessage {...messages.toleranceTooltip} />;

    return (
      <Grid item md={1} sm={4} xs={4} className={props.classes.tolerance_field}>
        <Grid
          container
          direction="row"
          justify="flex-start"
          alignItems="center"
          className={classNames({ [props.classes.tolerance_container]: !isSN, mathWithSetting })}
        >
          <Grid item xs={2}>
            <IconPlusMinus style={{ width: 8, height: 12, marginTop: -3 }} />
          </Grid>
          <Grid item xs={10}>
            <Tooltip title={toleranceTooltip} arrow placement="top">
              <div>
                <Field
                  component={ToleranceField}
                  id="tolerance"
                  isSN={isSN}
                  key={`${item}.tolerance`}
                  maxWidth
                  name={`${item}.tolerance`}
                  placeholder=""
                  tabIndex={-1}
                  value={tolerance}
                  width={props.width}
                />
              </div>
            </Tooltip>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  getCalculator = item => {
    const { renderCalculatorComponent, calculator } = this.props;

    if (calculator && calculator.name === `${item}.unit`) {
      return renderCalculatorComponent;
    }
  };

  renderAnswers = props => {
    const { answers, classes, disabled, fields, kind, setting, isMobile, width } = props;
    const { addRowKind, isAddRow, intl } = this.props;

    const component = this.getComponent(kind);
    const isSFTurnedOn = this.getIsSF(isAddRow, props.setting);

    const len = answers && answers.toJS ? answers.size : 0;
    const mark = this.getMaxScore(answers, setting);
    const mathWithSetting = ['numeric', 'mf'].includes(kind) && setting.size > 0;
    const sizes = SIZE(mathWithSetting, kind);
    return (
      <Fragment>
        {fields.map((item, index) => (
          <Fragment>
            <div
              id={isAddRow ? `answers[${index}].body` : `assessment_items[${this.props.index}].answers[${index}].body`}
              className={classes.answer_wrapper}
            >
              <div className={classNames(classes.answer, { multiple: len > 1 })}>
                <Grid className={classNames(classes.answers_field_container, { mathWithSetting })} container>
                  <Grid
                    item
                    className={classNames({
                      [classes.include_sig_figs]: isSFTurnedOn,
                      [classes.mc_answer]: kind === 'mc',
                      [classes.fib_answer]: kind === 'fib',
                      [classes.mf_answer]: kind === 'mf',
                      [classes.numeric_answer]: kind === 'numeric',
                      [classes.math_with_setting_answer]: mathWithSetting,
                      mathWithSetting,
                    })}
                    {...sizes}
                  >
                    {this.getCalculator(item)}
                    <Field
                      component={component}
                      disabled={disabled}
                      index={this.props.index}
                      isMobile={isMobile}
                      key={item}
                      name={getAnswerName(kind, item)}
                      placeholder={['xs', 'sm'].includes(width) ? intl.formatMessage(messages.correctAnswer) : ''}
                      sigFigsOn={isSFTurnedOn}
                      significantFigures={answers.get(index).get('significant_figure')}
                      subindex={index}
                      addRow={this.props.addRow}
                      formName="AssessmentForm"
                      getNextInputName={() =>
                        getNextInputName(
                          addRowKind,
                          this.props.assessmentItems,
                          this.props.index,
                          isAddRow,
                          kind,
                          setting,
                          len,
                          index,
                        )
                      }
                    />
                  </Grid>
                  {props.setting.includes('scientific_notation') &&
                    this.renderScientificNotation(item, isSFTurnedOn, mathWithSetting, props)}
                  {kind === 'numeric' && this.renderTolerance(answers, item, index, mathWithSetting, props)}
                  {props.setting.includes('unit') && this.renderUnits(item, props)}
                  {kind !== 'mc' && this.renderAddBtn(answers, item, index, props)}
                </Grid>
              </div>
              <Marks
                isAddRow={isAddRow}
                marks={answers.get(index).get('marks')}
                multiple={len > 1}
                name={`${item}.marks`}
                setting={setting}
                width={width}
              />
            </div>
            {len > 1 && index !== len - 1 && (
              <div className={classes.or_wrapper}>
                {['answer', 'mark'].map(k => (
                  <div className={classNames(classes.or, k, { isAddRow })}>
                    <FormattedMessage {...messages.or} />
                  </div>
                ))}
              </div>
            )}
          </Fragment>
        ))}
        {len > 1 && (
          <div className={classNames(classes.answers_mark, { isAddRow })}>
            <FormattedMessage {...messages.maxScore} values={{ score: mark }} />
          </div>
        )}
      </Fragment>
    );
  };

  render() {
    const { answers, changeField, classes, disabled, isMobile, kind, name, setting, width } = this.props;
    return (
      <FieldArray
        answers={answers}
        classes={classes}
        component={this.renderAnswers}
        disabled={disabled}
        isMobile={isMobile}
        kind={kind}
        name={name}
        setting={setting}
        change={changeField}
        width={width}
      />
    );
  }
}

Answers.propTypes = {
  addRowKind: PropTypes.string,
  assessmentItems: PropTypes.object,
  intl: PropTypes.any,
  index: PropTypes.any,
  heights: PropTypes.any,
  disabled: PropTypes.bool,
  isAddRow: PropTypes.bool,
  isMobile: PropTypes.bool,
  size: PropTypes.number,
  kind: PropTypes.string,
  name: PropTypes.string,
  width: PropTypes.string,
  answers: PropTypes.object,
  classes: PropTypes.object,
  group: PropTypes.object,
  setting: PropTypes.object,
  addRow: PropTypes.func,
  changeField: PropTypes.func,
  recomputeRowHeights: PropTypes.func,
  setFormValue: PropTypes.func,
  setStateData: PropTypes.func,
  calculator: PropTypes.object,
  renderCalculatorComponent: PropTypes.func,
};

Answers.defaultProps = {
  changeField: null,
  disabled: false,
  heights: null,
  index: null,
  isAddRow: false,
  recomputeRowHeights: null,
  size: 0,
};

const mapDispatchToProps = dispatch => ({
  setFormValue(name, value) {
    dispatch(change('AssessmentForm', name, value));
  },
});

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
  withWidth(),
  withStyles(styles),
)(Answers);
