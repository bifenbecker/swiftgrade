/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { addStyles, EditableMathField } from 'react-mathquill';
import { change, formValueSelector } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import {
  makeSelectAssessmentDetails,
  makeSelectCalculator,
  makeSelectCurrentInputTabElement,
  makeSelectDesmos,
  makeSelectDesmosExpressionAnalysis,
  makeSelectPrevInputTabElement,
} from 'containers/Assessments/config/selectors';
import {
  setAssessmentDetails,
  setCalculator,
  setCurrentInputTabElement,
  setDesmos,
  setPrevInputTabElement,
} from 'containers/Assessments/config/actions';
import { withStyles } from '@material-ui/core/styles';
import { MATH_ANSWERS_CONFIG } from 'components/Fields/Assessment/MathAnswer/constants';
import {
  getMathAnswerData,
  onNumericAnswerFieldPaste,
  onReceiveProps,
  openMathCalculator,
  setMathInputValue,
} from 'utils/helpers/assessments/mathAnswerHelper';

import { styles } from 'components/Fields/Assessment/MathAnswer/styles';
import 'components/Fields/Assessment/MathAnswer/font/style.scss';
import './styles.scss';
import {
  onMathChange,
  onMathFocus,
  onMathKeyUp,
  onMathPaperKeyDown,
  onMouseUp,
  updateScrollPosition,
  updateStateOnBlur,
} from 'utils/helpers/assessments/mathEventsHelper';
import { getMFInputValue } from 'utils/helpers/assessments/getter';
import { initMathAnswerMathquill, updateMathAnswerMathquill } from '../config';
import NonDecimalAnswer from '../../Views/NonDecimalAnswer';

addStyles();

class MathFormulaAnswerField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isInvalidAnswerFocused: false,
      isFocus: false,
      isVKTab: false, // is virtual keyboard tab pressed
      isTab: false,
      isUpdate: false,
      kind: 'mf',
      mathField: null,
      selectedData: '',
      type: 'process_assessment',
      virtualKeyboardLayout: null,
    };
  }

  componentDidMount() {
    const { fieldForFocus, input } = this.props;

    if (fieldForFocus === input.name) {
      this.openCalculator();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { calculator, disabled, fieldForFocus, index, input } = nextProps;
    const { calculator: prevCalculator, addRow } = this.props;

    const { kind, mathField, selectedData, type } = this.state;

    const valuesData = {
      calculator,
      disabled,
      fieldForFocus,
      index,
      input,
      kind,
      mathField,
      name: input.name,
      type,
      value: input.value.get('value'),
      prevCalculator,
      prevFieldForFocus: this.props.fieldForFocus,
      selectedData,
    };

    const funcsData = {
      addRow,
      getNextInputName: this.props.getNextInputName,
      onBlur: this.onBlur,
      onFocus: onMathFocus,
      openCalculator: this.openCalculator,
      setCalculator: this.props.setCalculator,
      setCurrentInputTabElement: this.props.setCurrentInputTabElement,
      setInputValue: this.setInputValue,
      setFormValue: this.props.setFormValue,
      setState: this.setStateData,
      setPrevInputTabElement: this.props.setPrevInputTabElement,
    };
    onReceiveProps(valuesData, funcsData);
  }

  componentDidUpdate(prevProps, prevState) {
    const { currentInputTabElement, input, prevInputTabElement, calculator } = this.props;
    const { input: prevInput, calculator: prevCalculator } = prevProps;
    const { isFocus, isTab, isUpdate, mathField, kind } = this.state;
    const { isFocus: prevIsFocus } = prevState;

    if (prevInput && input && prevInput !== input) {
      this.updateMathquill(prevInput, input);
    }

    if (prevState.isUpdate !== isUpdate && isFocus) {
      this.setInputValue(input);
    }

    if (currentInputTabElement !== prevInputTabElement) {
      if (prevIsFocus !== isFocus && currentInputTabElement === input.name && isFocus && mathField && !isTab) {
        this.setStateData({ isTab: true });
      }
      if (isTab && isFocus && mathField) {
        this.onSelectField(mathField);
      }
    }

    if (calculator && calculator.name === `answers.${kind}[0].body` && calculator === prevCalculator) {
      updateScrollPosition(input.name, kind);
    }
  }

  setStateData = data => this.setState(data);

  initMathquill = mathField => {
    const { fieldForFocus, index, input } = this.props;
    const { kind, type } = this.state;

    const data = {
      fieldForFocus,
      index,
      input,
      kind,
      mathField,
      type,
      setStateData: this.setStateData,
      setFormValue: this.props.setFormValue,
    };
    initMathAnswerMathquill(data);
  };

  updateMathquill = (prevInput, input) => {
    const { mathField } = this.state;
    updateMathAnswerMathquill(prevInput, input, mathField, this.setStateData);
  };

  onKeyUp = e => {
    const { index, disabled } = this.props;
    const { kind, mathField } = this.state;

    const valuesData = {
      e,
      disabled,
      kind,
      index,
      mathField,
    };
    const funcsData = {
      addRow: this.props.addRow,
      onBlur: this.onBlur,
      setCurrentInputTabElement: this.props.setCurrentInputTabElement,
      setFormValue: this.props.setFormValue,
      setStateData: this.setStateData,
    };
    onMathKeyUp(valuesData, funcsData);
  };

  onSelectField = mathField => {
    mathField.select();
    this.setState({ isTab: false, selectedData: mathField.latex() });
  };

  onPaste = e => {
    const { input } = this.props;
    const { mathField } = this.state;

    onNumericAnswerFieldPaste(e, input, mathField, this.onChangeValue, this.setStateData);
  };

  onChangeValue = (input, mathField, newValue, size) => {
    this.setDesmosValue(newValue);

    const { subindex } = this.props;
    let { index, heights } = this.props;
    index = _.isNull(index) ? 'add_row' : index;

    const currentHeight = heights.get(index);
    const newHeight = `${size.actualHeight}_${subindex}`;

    if (currentHeight !== newHeight) {
      heights = heights.set(index, newHeight);
      this.props.setFormValue('heights', heights);
    }
    this.setState({ mathField });

    clearTimeout(this.delayTimer);
    if (!_.isEqual(input.value.get('value'), newValue)) {
      this.delayTimer = setTimeout(() => {
        this.setState({ isUpdate: true });
      }, 1000);
    }
  };

  onBlur = () => {
    const { calculator, details, fieldForFocus, input } = this.props;
    const { isFocus, isVKTab, mathField } = this.state;

    const data = {
      calculator,
      details,
      fieldForFocus,
      input,
      isFocus,
      isVKTab,
      setAssessmentDetails: this.props.setAssessmentDetails,
      setCalculator: this.props.setCalculator,
      setFormValue: this.props.setFormValue,
      setState: this.setStateData,
    };
    updateStateOnBlur(data);

    if (input.value && mathField && input.value.get('value') !== mathField.latex()) {
      this.setInputValue(input);
    }
  };

  openCalculator = () => {
    const { calculator, expressionAnalysis, fieldForFocus, input } = this.props;
    const { kind, virtualKeyboardLayout } = this.state;
    const valuesData = {
      calculator,
      expressionAnalysis,
      fieldForFocus,
      input,
      kind,
      virtualKeyboardLayout,
    };
    const funcsData = {
      setCalculator: this.props.setCalculator,
      setDesmosValue: this.setDesmosValue,
      setFormValue: this.props.setFormValue,
      setState: this.setStateData,
    };
    openMathCalculator(valuesData, funcsData);
  };

  setDesmosValue = latex => {
    const { desmos } = this.props;
    desmos.setExpression({ id: 'answer', latex });
    this.props.setDesmos(desmos);
  };

  setInputValue = input => {
    const { expressionAnalysis } = this.props;
    const { mathField } = this.state;
    const inputValue = getMFInputValue(mathField.latex());
    const data = {
      expressionAnalysis,
      input,
      inputValue,
      mathField,
      setStateData: this.setStateData,
      setFormValue: this.props.setFormValue,
    };
    setMathInputValue(data);
  };

  renderAnswer = input => {
    const { classes, expressionAnalysis, isMobile, meta } = this.props;
    const { isFocus, isInvalidAnswerFocused, kind, mathField } = this.state;
    const data = getMathAnswerData(expressionAnalysis, input, isFocus, mathField, isInvalidAnswerFocused);
    const errorMessage =
      data.is_error &&
      expressionAnalysis &&
      _.has(expressionAnalysis, 'answer') &&
      _.has(expressionAnalysis.answer, 'errorMessage')
        ? expressionAnalysis.answer.errorMessage
        : null;
    return (
      <div className={classes.fraction}>
        <NonDecimalAnswer
          answer={data.answer}
          errorMessage={errorMessage}
          evaluationDisplayed={data.evaluation_displayed}
          fractionMode={data.fraction_mode}
          isError={data.is_error}
          isMobile={isMobile}
          kind={kind}
          meta={meta}
          value={data.value}
          onBlur={this.onBlur}
          setStateData={this.setStateData}
        />
      </div>
    );
  };

  render() {
    const { classes, index, input, isMobile } = this.props;
    const { isFocus, kind, mathField: math } = this.state;

    const value = _.isNull(math) ? '' : math.latex();
    return (
      <Fragment>
        <div
          id={input.name}
          className={classNames(classes.root, 'math-formula-input', {
            focus: isFocus,
            'is-empty': _.isEmpty(value),
          })}
        >
          <div className={classes.input} onFocus={this.openCalculator} onBlur={this.onBlur}>
            <EditableMathField
              id={`editable_${input.name}`}
              latex={value}
              config={_.merge(
                { handlers: { enter: () => console.log('enter') } },
                MATH_ANSWERS_CONFIG(input.name, index, isMobile, kind),
              )}
              mathquillDidMount={mathField => this.initMathquill(mathField)}
              onChange={mathField => onMathChange(input, mathField, this.onChangeValue, this.setStateData)}
              onKeyDown={e =>
                onMathPaperKeyDown(
                  e,
                  kind,
                  input,
                  math,
                  this.props.setPrevInputTabElement,
                  this.setInputValue,
                  this.setStateData,
                )
              }
              onKeyUp={this.onKeyUp}
              onMouseUp={() => onMouseUp(this.setStateData)}
              onPaste={this.onPaste}
            />
          </div>
          {this.renderAnswer(input)}
        </div>
      </Fragment>
    );
  }
}

MathFormulaAnswerField.propTypes = {
  currentInputTabElement: PropTypes.string,
  meta: PropTypes.any,
  isMobile: PropTypes.bool,
  expressionAnalysis: PropTypes.any,
  fieldForFocus: PropTypes.any,
  index: PropTypes.any,
  subindex: PropTypes.number,
  calculator: PropTypes.object,
  classes: PropTypes.object,
  desmos: PropTypes.object,
  details: PropTypes.object,
  disabled: PropTypes.bool,
  heights: PropTypes.object,
  input: PropTypes.object,
  addRow: PropTypes.func,
  prevInputTabElement: PropTypes.string,
  getNextInputName: PropTypes.func,
  setAssessmentDetails: PropTypes.func,
  setCalculator: PropTypes.func,
  setCurrentInputTabElement: PropTypes.func,
  setDesmos: PropTypes.func,
  setFormValue: PropTypes.func,
  setPrevInputTabElement: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  calculator: makeSelectCalculator(),
  currentInputTabElement: makeSelectCurrentInputTabElement(),
  desmos: makeSelectDesmos(),
  details: makeSelectAssessmentDetails(),
  expressionAnalysis: makeSelectDesmosExpressionAnalysis(),
  fieldForFocus: state => formValueSelector('AssessmentForm')(state, 'field_for_focus'),
  heights: state => formValueSelector('AssessmentForm')(state, 'heights'),
  prevInputTabElement: makeSelectPrevInputTabElement(),
});

const mapDispatchToProps = dispatch => ({
  setAssessmentDetails(data) {
    dispatch(setAssessmentDetails(data));
  },
  setFormValue(name, value) {
    dispatch(change('AssessmentForm', name, value));
  },
  setCalculator(data) {
    dispatch(setCalculator(data));
  },
  setCurrentInputTabElement(elementId) {
    dispatch(setCurrentInputTabElement(elementId));
  },
  setDesmos(data) {
    dispatch(setDesmos(data));
  },
  setPrevInputTabElement(elementId) {
    dispatch(setPrevInputTabElement(elementId));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(MathFormulaAnswerField);
