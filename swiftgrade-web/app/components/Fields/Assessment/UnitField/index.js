/* eslint-disable no-underscore-dangle */
import React from 'react';
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
  makeSelectPrevInputTabElement,
} from 'containers/Assessments/config/selectors';
import {
  setCalculator,
  setCurrentInputTabElement,
  setPrevInputTabElement,
} from 'containers/Assessments/config/actions';
import { getSelectionValue } from 'utils/helpers/assessments/getter';
import { withStyles } from '@material-ui/core/styles';
import {
  onReceiveProps,
  onUnitFieldBlur,
  onUnitFieldChange,
  onUnitFieldFocus,
  onUnitFieldKeyDown,
  onUnitFieldPaste,
} from 'utils/helpers/assessments/unitHelper';
import './styles.scss';
import { CONFIG } from './constants';

import { styles } from './styles';

addStyles();

class UnitField extends React.Component {
  state = {
    isFocus: false,
    isTab: false,
    mathField: null,
    selectedData: '',
  };

  componentWillReceiveProps(nextProps) {
    const { calculator, input } = nextProps;
    const { calculator: prevCalculator, isMobile } = this.props;
    const { selectedData } = this.state;

    const { mathField } = this.state;
    const data = {
      calculator,
      input,
      mathField,
      prevCalculator,
      selectedData,
      isMobile,
      setCalculator: this.props.setCalculator,
      setState: this.setStateData,
    };
    onReceiveProps(data);
  }

  componentDidUpdate(prevProps) {
    const { currentInputTabElement, input, prevInputTabElement, fieldForFocus } = this.props;
    const { input: prevInput, fieldForFocus: prevFieldForFocus } = prevProps;
    const { isFocus, isTab, mathField } = this.state;
    if (prevInput && input && prevInput.value !== input.value) {
      this.updateMathquill(prevInput.value, input.value);
    }
    if (currentInputTabElement !== prevInputTabElement) {
      if (fieldForFocus && prevFieldForFocus !== fieldForFocus && fieldForFocus === input.name) {
        this.onFocus();
        this.setStateData({ isTab: true });
        mathField.focus();
      }
      if (isTab && isFocus && mathField) {
        this.selectField(mathField);
      }
    }
  }

  setStateData = data => this.setState(data);

  initMathquill = mathField => {
    const { input } = this.props;
    if (input.value) {
      mathField.write(input.value);
    }
    this.setState({ mathField });
  };

  updateMathquill = (prevValue, value) => {
    const { mathField } = this.state;

    if (prevValue !== value && value !== mathField.latex()) {
      const v = _.isEmpty(value) ? '' : value;
      mathField.latex(v);
      this.setState({ mathField });
    }
  };

  selectField = mathField => {
    mathField.select();
    this.setState({ isTab: false, selectedData: mathField.latex() });
  };

  onKeyUp = e => {
    const { disabled, index, kind } = this.props;
    const { mathField } = this.state;
    const { key: currentKey } = e;
    if (currentKey === 'Tab') {
      this.setState({ isTab: true });
      this.props.setCurrentInputTabElement(e.currentTarget.id);
    }
    if (currentKey === 'Enter') {
      mathField.blur();
      this.setState({ isFocus: false });
      if (!disabled) {
        this.props.addRow(index);
        if (!_.isNull(index)) {
          this.props.setFormValue('field_for_focus', `assessment_items[${index + 1}].answers.${kind}[0].body`);
        } else {
          this.props.setFormValue('field_for_focus', `answers.${kind}[0].body`);
        }
      }
    }
  };

  onMouseUp = () => {
    const selectedData = getSelectionValue();
    if (selectedData.length > 0) {
      this.setState({ selectedData });
    }
  };

  onFocus = () => {
    const { calculator: currentCalculator, input } = this.props;
    onUnitFieldFocus(currentCalculator, input, this.props.setCalculator, this.setStateData);
  };

  onBlur = () => {
    const { details } = this.props;
    const { isFocus } = this.state;

    const data = {
      details,
      isFocus,
      setCalculator: this.props.setCalculator,
      setFormValue: this.props.setFormValue,
      setState: this.setStateData,
    };
    onUnitFieldBlur(data);
  };

  // onPaste = e => {
  //   const { mathField } = this.state;
  //   const count = getUnitsLen(mathField.latex());
  //
  //   const clipboardData = e.clipboardData.getData('text');
  //   const validSymbols = clipboardData
  //     .split('')
  //     .map(symbol => (isValidUnitsSymbol(symbol) ? symbol : ''))
  //     .join('');
  //
  //   const newClipboardData = validSymbols.slice(0, 5 - count);
  //
  //   document.execCommand('insertText', false, newClipboardData);
  //   e.preventDefault();
  // };

  render() {
    const { classes, input } = this.props;
    const { isFocus, mathField: math } = this.state;
    const value = _.isNull(math) ? '' : math.latex();
    return (
      <div
        id={input.name}
        className={classNames(classes.root, 'unit-input', {
          focus: isFocus,
          'is-empty': _.isEmpty(value),
        })}
        onFocus={() => this.onFocus()}
        onBlur={() => this.onBlur()}
      >
        <EditableMathField
          id={`editable_${input.name}`}
          latex={value}
          config={_.merge({ handlers: { enter: () => console.log('enter') } }, CONFIG(input.name))}
          mathquillDidMount={mathField => this.initMathquill(mathField)}
          onChange={mathField => onUnitFieldChange(input, mathField)}
          onKeyUp={this.onKeyUp}
          onKeyDown={e => onUnitFieldKeyDown(e, math, this.props.setPrevInputTabElement)}
          onMouseUp={() => this.onMouseUp()}
          onPaste={e => onUnitFieldPaste(e, math)}
        />
      </div>
    );
  }
}

UnitField.propTypes = {
  addRow: PropTypes.func,
  currentInputTabElement: PropTypes.string,
  disabled: PropTypes.bool,
  isMobile: PropTypes.bool,
  index: PropTypes.any,
  kind: PropTypes.string,
  calculator: PropTypes.object,
  classes: PropTypes.object,
  details: makeSelectAssessmentDetails(),
  input: PropTypes.object,
  prevInputTabElement: PropTypes.string,
  setCalculator: PropTypes.func,
  setCurrentInputTabElement: PropTypes.func,
  setFormValue: PropTypes.func,
  setPrevInputTabElement: PropTypes.func,
  fieldForFocus: PropTypes.string,
};

const mapStateToProps = createStructuredSelector({
  calculator: makeSelectCalculator(),
  currentInputTabElement: makeSelectCurrentInputTabElement(),
  details: makeSelectAssessmentDetails(),
  fieldForFocus: state => formValueSelector('AssessmentForm')(state, 'field_for_focus'),
  prevInputTabElement: makeSelectPrevInputTabElement(),
});

const mapDispatchToProps = dispatch => ({
  setCalculator(data) {
    dispatch(setCalculator(data));
  },
  setCurrentInputTabElement(elementId) {
    dispatch(setCurrentInputTabElement(elementId));
  },
  setFormValue(name, value) {
    dispatch(change('AssessmentForm', name, value));
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
)(UnitField);
