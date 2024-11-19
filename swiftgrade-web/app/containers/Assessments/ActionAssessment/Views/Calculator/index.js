import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import _ from 'lodash';
import { compose } from 'redux';

import { CALCULATOR_ID } from 'globalConstants';

import DesktopKeyboard from './Items/DesktopKeyboard';
import MobileKeyboard from './Items/MobileKeyboard';
import UnitsCalculator from './Items/UnitsCalculator';
import { styles } from './styles';
import './styles.scss';

class Calculator extends Component {
  setValueCalculator = option => {
    const calculator = _.cloneDeep(this.props.calculator);
    calculator.expression = option.expression;
    calculator.layout = option.layout;
    calculator.len = option.len;
    calculator.move = option.move;
    if (_.has(option, 'type')) {
      calculator.type = option.type;
    }
    this.props.setCalculator(calculator);
  };

  renderCalculator = classes => {
    const { calculator, isMobile } = this.props;
    if (calculator.key === 'unit') {
      return <UnitsCalculator classes={classes} setValueCalculator={this.setValueCalculator} />;
    }
    const CalculatorComponent = isMobile ? MobileKeyboard : DesktopKeyboard;
    const kind = _.has(calculator, 'kind') ? calculator.kind : null;
    return (
      <CalculatorComponent
        calculator={calculator}
        classes={classes}
        kind={kind}
        setValueCalculator={this.setValueCalculator}
      />
    );
  };

  render() {
    const { assessmentDetails, calculator, classes, isMobile } = this.props;
    return (
      <div
        id={CALCULATOR_ID}
        className={classNames({
          [classes.calculator]: !isMobile && calculator.key === 'non-decimal',
          [classes.mobile_calculator]: isMobile && calculator.key === 'non-decimal',
          [classes.unit_calculator]: calculator.key === 'unit',
          [calculator.kind]: _.has(calculator, 'kind'),
        })}
        onMouseEnter={() => {
          const details = assessmentDetails.set('is_calculator', true);
          this.props.setAssessmentDetails(details);
        }}
        onMouseLeave={() => {
          const details = assessmentDetails.set('is_calculator', false);
          this.props.setAssessmentDetails(details);
        }}
        onTouchStart={() => {
          const details = assessmentDetails.set('is_calculator', true);
          this.props.setAssessmentDetails(details);
        }}
      >
        {this.renderCalculator(classes)}
      </div>
    );
  }
}

Calculator.propTypes = {
  isMobile: PropTypes.bool,
  assessmentDetails: PropTypes.object,
  calculator: PropTypes.object,
  classes: PropTypes.object,
  setCalculator: PropTypes.func,
  setAssessmentDetails: PropTypes.func,
};

export default compose(withStyles(styles))(Calculator);
