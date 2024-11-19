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
import { getNDAnswerSize } from 'utils/helpers/assessments';
import {
  makeSelectAssessmentDetails,
  makeSelectCalculator,
  makeSelectCurrentInputTabElement,
  makeSelectPrevInputTabElement,
} from 'containers/Assessments/config/selectors';
import {
  setAssessmentDetails,
  setCalculator,
  setCurrentInputTabElement,
  setPrevInputTabElement,
} from 'containers/Assessments/config/actions';
import { MATH_ANSWERS_CONFIG } from 'components/Fields/Assessment/MathAnswer/constants';
import {
  onNumericAnswerFieldPaste,
  onReceiveProps,
  setCalculatorValue,
} from 'utils/helpers/assessments/mathAnswerHelper';
import { onMathAnswerFieldKeyDown, onMouseUp, updateStateOnBlur } from 'utils/helpers/assessments/mathEventsHelper';
import { getMFInputValue } from 'utils/helpers/assessments/getter';
import { withStyles } from '@material-ui/core/styles';
import './styles.scss';

import { styles } from 'components/Fields/Assessment/MathAnswer/styles';
import '../font/style.scss';

addStyles();

class MathOnlineAnswerField extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFocus: false,
      isTab: false,
      isVKTab: false, // is virtual keyboard tab pressed
      mathField: null,
      selectedData: '',
      type: 'fill_assessment',
    };
  }

  componentDidMount() {
    const { fieldForFocus, input } = this.props;

    if (fieldForFocus === input.name) {
      this.openCalculator();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { calculator, fieldForFocus, index, input } = nextProps;
    const { calculator: prevCalculator, kind } = this.props;

    const { mathField, selectedData, type } = this.state;

    const valuesData = {
      calculator,
      fieldForFocus,
      index,
      input,
      kind,
      mathField,
      name: input.name,
      value: input.value,
      prevCalculator,
      prevFieldForFocus: this.props.fieldForFocus,
      selectedData,
      type,
    };

    const funcsData = {
      getNextInputName: this.props.getNextInputName,
      onBlur: this.onBlur,
      onFocus: this.onFocus,
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

  componentDidUpdate() {
    const { currentInputTabElement, prevInputTabElement } = this.props;
    const { isFocus, isTab, mathField } = this.state;

    if (currentInputTabElement !== prevInputTabElement) {
      if (isTab && isFocus && mathField) {
        this.onSelectField(mathField);
      }
    }
  }

  setStateData = data => this.setState(data);

  initMathquill = mathField => {
    const { fieldForFocus, index, input } = this.props;
    if (input.value) {
      mathField.write(input.value);
    }
    this.setState({ mathField });

    if (fieldForFocus === input.name && index !== null) {
      this.onFocus(fieldForFocus, mathField);
    }
  };

  onKeyDown = e => {
    const { kind, input } = this.props;
    const { mathField } = this.state;

    onMathAnswerFieldKeyDown(e, kind, input, mathField, this.props.setPrevInputTabElement, this.setStateData);
  };

  onKeyUp = e => {
    if (e.key === 'Tab') {
      this.props.setCurrentInputTabElement(e.currentTarget.id);
      this.setState({ isTab: true });
    }
  };

  onSelectField = mathField => {
    mathField.select();
    this.setState({ isTab: false, selectedData: mathField.latex() });
  };

  onChange = mathField => {
    const { input } = this.props;

    const newValue = mathField.latex();

    if (!_.isEqual(newValue, input.value)) {
      const size = getNDAnswerSize(input.name);
      this.onChangeValue(input, mathField, newValue, size);
    }
  };

  onPaste = e => {
    const { input } = this.props;
    const { mathField } = this.state;

    onNumericAnswerFieldPaste(e, input, mathField, this.onChangeValue, this.setStateData);
  };

  onChangeValue = (input, mathField, newValue, size) => {
    const { index, kind } = this.props;
    let { heights } = this.props;

    const currentHeight = heights.get(index);
    const newHeight = size.actualHeight.toString();

    if (currentHeight !== newHeight) {
      heights = heights.set(index, newHeight);
      this.props.setFormValue('heights', heights);
    }
    this.setState({ mathField });
    const latex = mathField.latex();
    const value = kind === 'mf' ? getMFInputValue(latex) : latex;
    input.onChange(value);
  };

  onFocus = (fieldForFocus, mathField) => {
    const x = window.scrollX;
    const y = window.scrollY;

    mathField.focus();
    mathField.__controller.cursor.show();
    mathField.__controller.cursor.blink();

    if (fieldForFocus) {
      const indexes = fieldForFocus.match('^assessment_items\\[(\\d+)\\].body'); // assessment_items\[(\d+)\].body.answer

      if (_.isNull(indexes)) {
        window.scrollTo(x, y);
      }
    }
  };

  onBlur = () => {
    const { details, fieldForFocus, input, kind } = this.props;
    const { isFocus, isVKTab } = this.state;

    const data = {
      details,
      fieldForFocus,
      input,
      isFocus,
      isVKTab,
      kind,
      setAssessmentDetails: this.props.setAssessmentDetails,
      setCalculator: this.props.setCalculator,
      setFormValue: this.props.setFormValue,
      setState: this.setStateData,
    };
    updateStateOnBlur(data);
  };

  openCalculator = () => {
    const { calculator: currentCalculator, fieldForFocus, input, kind } = this.props;
    const { name } = input;

    const data = {
      currentCalculator,
      fieldForFocus,
      kind,
      name,
      setCalculator: this.props.setCalculator,
      setFormValue: this.props.setFormValue,
      setState: this.setStateData,
    };
    setCalculatorValue(data);
  };

  render() {
    const { classes, kind, index, input, isMobile } = this.props;
    const { isFocus, mathField: math } = this.state;
    const stylesClass = kind === 'numeric' ? 'numeric-online-field' : 'math-formula-online-field';

    const value = _.isNull(math) ? '' : math.latex();
    return (
      <Fragment>
        <div
          id={input.name}
          className={classNames(classes.root, 'online-math-field-input', stylesClass, {
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
              onChange={mathField => this.onChange(mathField)}
              onKeyDown={this.onKeyDown}
              onKeyUp={this.onKeyUp}
              onMouseUp={() => onMouseUp(this.setStateData)}
              onPaste={this.onPaste}
            />
          </div>
        </div>
      </Fragment>
    );
  }
}

MathOnlineAnswerField.propTypes = {
  calculator: PropTypes.object,
  classes: PropTypes.object,
  currentInputTabElement: PropTypes.string,
  details: PropTypes.object,
  fieldForFocus: PropTypes.any,
  heights: PropTypes.object,
  index: PropTypes.any,
  input: PropTypes.object,
  isMobile: PropTypes.bool,
  kind: PropTypes.string,
  prevInputTabElement: PropTypes.string,
  getNextInputName: PropTypes.func,
  setAssessmentDetails: PropTypes.func,
  setCalculator: PropTypes.func,
  setCurrentInputTabElement: PropTypes.func,
  setFormValue: PropTypes.func,
  setPrevInputTabElement: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  calculator: makeSelectCalculator(),
  currentInputTabElement: makeSelectCurrentInputTabElement(),
  details: makeSelectAssessmentDetails(),
  fieldForFocus: state => formValueSelector('OnlineAssessmentForm')(state, 'field_for_focus'),
  heights: state => formValueSelector('OnlineAssessmentForm')(state, 'heights'),
  prevInputTabElement: makeSelectPrevInputTabElement(),
});

const mapDispatchToProps = dispatch => ({
  setAssessmentDetails(data) {
    dispatch(setAssessmentDetails(data));
  },
  setCalculator(data) {
    dispatch(setCalculator(data));
  },
  setCurrentInputTabElement(elementId) {
    dispatch(setCurrentInputTabElement(elementId));
  },
  setFormValue(name, value) {
    dispatch(change('OnlineAssessmentForm', name, value));
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
)(MathOnlineAnswerField);
