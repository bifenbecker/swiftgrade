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
import 'components/Fields/Assessment/UnitField/styles.scss';
import { CONFIG } from 'components/Fields/Assessment/UnitField/constants';

import { styles } from 'components/Fields/Assessment/UnitField/styles';
import {
  onReceiveProps,
  onUnitFieldBlur,
  onUnitFieldChange,
  onUnitFieldFocus,
  onUnitFieldKeyDown,
  onUnitFieldPaste,
} from 'utils/helpers/assessments/unitHelper';

addStyles();

class OnlineAssessmentUnitField extends React.Component {
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
    const { currentInputTabElement, fieldForFocus, input, prevInputTabElement } = this.props;
    const { fieldForFocus: prevFieldForFocus } = prevProps;
    const { isFocus, isTab, mathField } = this.state;

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

  selectField = mathField => {
    mathField.select();
    this.setState({ isTab: false, selectedData: mathField.latex() });
  };

  onKeyUp = e => {
    if (e.key === 'Tab') {
      this.props.setCurrentInputTabElement(e.currentTarget.id);
      this.setState({ isTab: true });
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

OnlineAssessmentUnitField.propTypes = {
  calculator: PropTypes.object,
  classes: PropTypes.object,
  currentInputTabElement: PropTypes.func,
  details: makeSelectAssessmentDetails(),
  fieldForFocus: PropTypes.string,
  isMobile: PropTypes.bool,
  input: PropTypes.object,
  prevInputTabElement: PropTypes.func,
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
)(OnlineAssessmentUnitField);
