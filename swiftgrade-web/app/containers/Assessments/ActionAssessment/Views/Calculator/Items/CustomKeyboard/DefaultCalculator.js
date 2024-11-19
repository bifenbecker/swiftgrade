import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { addStyles, StaticMathField } from 'react-mathquill';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../styles';
import '../../styles.scss';
import { OPTIONS } from './constants';

addStyles();

class DefaultCalculator extends Component {
  renderOption = (classes, option) => (
    <Grid
      className={classes.option}
      item
      key={option.label}
      role="button"
      tabIndex={-1}
      xs={1}
      onMouseUp={() => this.props.setValueCalculator(option)}
    >
      <StaticMathField>{option.label}</StaticMathField>
    </Grid>
  );

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.calculator_container}>
        {['firstLine', 'secondLine'].map(line => (
          <Grid
            key={line}
            container
            direction="row"
            justify="space-around"
            alignItems="center"
            className="default_calculator"
          >
            {OPTIONS[line].map(option => this.renderOption(classes, option))}
          </Grid>
        ))}
      </div>
    );
  }
}

DefaultCalculator.propTypes = {
  classes: PropTypes.object,
  setValueCalculator: PropTypes.func,
};

export default compose(withStyles(styles))(DefaultCalculator);
