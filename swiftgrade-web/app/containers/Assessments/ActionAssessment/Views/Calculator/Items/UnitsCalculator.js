import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import { addStyles, StaticMathField } from 'react-mathquill';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../styles';
import '../styles.scss';

import { UNITS_OPTIONS } from '../constants';

addStyles();

class UnitsCalculator extends Component {
  renderOption = (classes, option) => (
    <Grid
      item
      className={classNames(classes.option, 'unit')}
      key={option.label}
      role="button"
      tabIndex={-1}
      onMouseUp={() => this.props.setValueCalculator(option)}
    >
      <StaticMathField>{option.label}</StaticMathField>
    </Grid>
  );

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.calculator_container}>
        <Grid container direction="row" justify="space-around" alignItems="center">
          {UNITS_OPTIONS.map(option => this.renderOption(classes, option))}
        </Grid>
      </div>
    );
  }
}

UnitsCalculator.propTypes = {
  classes: PropTypes.object,
  setValueCalculator: PropTypes.func,
};

export default compose(withStyles(styles))(UnitsCalculator);
