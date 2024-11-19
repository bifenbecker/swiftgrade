/* eslint-disable no-underscore-dangle */
import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
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
import {
  getMathAnswerData,
  onNumericAnswerFieldPaste,
  onReceiveProps,
  openMathCalculator,
  setMathInputValue,
} from 'utils/helpers/assessments/mathAnswerHelper';
import { MATH_ANSWERS_CONFIG } from 'components/Fields/Assessment/MathAnswer/constants';
import {
  onMathChange,
  onMathFocus,
  onMathKeyUp,
  onMathPaperKeyDown,
  onMouseUp,
  updateScrollPosition,
  updateStateOnBlur,
} from 'utils/helpers/assessments/mathEventsHelper';
import './styles.scss';
import messages from '../../messages';

import NonDecimalAnswer from '../../Views/NonDecimalAnswer';

import { styles } from '../styles';
import '../font/style.scss';
import { initMathAnswerMathquill, updateMathAnswerMathquill } from '../config';

addStyles();

class NonDecimalAnswerField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kind: 'numeric',
      isFocus: false,
      isTab: false,
      isVKTab: false, // is virtual keyboard tab pressed
      isUpdate: false,
      mathField: null,
      selectedData: '',
      sfValue: null,
      type: 'process_assessment',
    };
  }

  componentDidMount() {
    const { fieldForFocus, input, significantFigures } = this.props;

    this.setState({ sfValue: significantFigures });
    if (fieldForFocus === input.name) {
      this.openCalculator();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { calculator, disabled, fieldForFocus, index, input, significantFigures } = nextProps;
    const { calculator: prevCalculator, significantFigures: prevSF, addRow } = this.props;

    const { kind, mathField, selectedData, sfValue, type } = this.state;

    if (sfValue !== significantFigures && prevSF !== significantFigures) {
      this.setState({ sfValue: significantFigures });
    }

    const valuesData = {
      calculator,
      disabled,
      fieldForFocus,
      index,
      input,
      kind,
      mathField,
      name: input.name,
      prevCalculator,
      prevFieldForFocus: this.props.fieldForFocus,
      selectedData,
      type,
      value: input.value.get('value'),
    };

    const funcsData = {
      addRow,
      getNextInputName: this.props.getNextInputName,
      onBlur: this.onBlur,
      onFocus: onMathFocus,
      openCalculator: this.openCalculator,
      setCalculator: this.props.setCalculator,
      setCurrentInputTabElement: this.props.setCurrentInputTabElement,
      setFormValue: this.props.setFormValue,
      setInputValue: this.setInputValue,
      setPrevInputTabElement: this.props.setPrevInputTabElement,
      setState: this.setStateData,
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
    const { input, sigFigsOn } = this.props;
    const { mathField } = this.state;

    onNumericAnswerFieldPaste(e, input, mathField, this.onChangeValue, this.setStateData, sigFigsOn);
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
    const { details, fieldForFocus, input } = this.props;
    const { isFocus, isVKTab, mathField } = this.state;

    const data = {
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
    const { kind } = this.state;
    const valuesData = {
      calculator,
      expressionAnalysis,
      fieldForFocus,
      input,
      kind,
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
    const { expressionAnalysis, sigFigsOn } = this.props;
    const { mathField } = this.state;
    const data = {
      expressionAnalysis,
      input,
      mathField,
      sigFigsOn,
      setStateData: this.setStateData,
      setFormValue: this.props.setFormValue,
    };
    setMathInputValue(data);
  };

  renderAnswer = input => {
    const { classes, expressionAnalysis, isMobile, meta } = this.props;
    const { isFocus, kind, mathField } = this.state;
    const data = getMathAnswerData(expressionAnalysis, input, isFocus, mathField);
    return (
      <div className={classes.fraction}>
        <NonDecimalAnswer
          answer={data.answer}
          evaluationDisplayed={data.evaluation_displayed}
          fractionMode={data.fraction_mode}
          isError={data.is_error}
          isMobile={isMobile}
          kind={kind}
          meta={meta}
          value={data.value}
          onBlur={this.onBlur}
        />
      </div>
    );
  };

  renderSigFig = classes => {
    const { sigFigsOn } = this.props;
    const { sfValue } = this.state;

    if (sigFigsOn) {
      return (
        <div className={classes.sig_figs}>
          <div className={classes.significant_figure_title}>
            <FormattedMessage {...messages.sigFig} />:
          </div>
          <div className={classes.significant_figure_value}>{_.isNumber(sfValue) ? sfValue : 'N/A'}</div>
        </div>
      );
    }
    return null;
  };

  render() {
    const { classes, index, input, isMobile, sigFigsOn } = this.props;
    const { kind, isFocus, mathField: math } = this.state;

    const value = _.isNull(math) ? '' : math.latex();
    return (
      <Fragment>
        {this.renderSigFig(classes)}
        <div
          id={input.name}
          className={classNames(classes.root, 'non-decimal-input', {
            focus: isFocus,
            'is-empty': _.isEmpty(value),
          })}
        >
          <div className={classes.input} onFocus={() => this.openCalculator()} onBlur={e => this.onBlur(e)}>
            <EditableMathField
              id={`editable_${input.name}`}
              latex={value}
              config={_.merge(
                { handlers: { enter: () => console.log('enter') } },
                MATH_ANSWERS_CONFIG(input.name, index, isMobile, kind),
              )}
              mathquillDidMount={mathField => this.initMathquill(mathField)}
              onChange={mathField => onMathChange(input, mathField, this.onChangeValue, this.setStateData, sigFigsOn)}
              onKeyDown={e =>
                onMathPaperKeyDown(
                  e,
                  'numeric',
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

NonDecimalAnswerField.propTypes = {
  currentInputTabElement: PropTypes.string,
  isMobile: PropTypes.bool,
  sigFigsOn: PropTypes.bool,
  expressionAnalysis: PropTypes.any,
  fieldForFocus: PropTypes.any,
  index: PropTypes.any,
  significantFigures: PropTypes.any,
  subindex: PropTypes.number,
  calculator: PropTypes.object,
  classes: PropTypes.object,
  desmos: PropTypes.object,
  details: PropTypes.object,
  disabled: PropTypes.bool,
  heights: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.object,
  addRow: PropTypes.func,
  prevInputTabElement: PropTypes.string,
  getNextInputName: PropTypes.func,
  setAssessmentDetails: PropTypes.func,
  setCalculator: PropTypes.func,
  setDesmos: PropTypes.func,
  setCurrentInputTabElement: PropTypes.func,
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
)(NonDecimalAnswerField);
