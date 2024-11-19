import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import { addStyles, StaticMathField } from 'react-mathquill';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../styles';
import '../../styles.scss';
import { MOBILE_OPTIONS } from './constants';

addStyles();

class MobileCalculator extends Component {
  renderOption = (classes, option) => (
    <Grid
      item
      xs={1}
      className={classNames(classes.option, {
        number: option.type === 'number',
        move: option.type === 'move',
      })}
      tabIndex="0"
      role="button"
      onMouseDown={() => this.props.setValueCalculator(option)}
    >
      {option.type === 'move' ? option.label : <StaticMathField>{option.label}</StaticMathField>}
    </Grid>
  );

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.calculator_container}>
        {['firstLine', 'secondLine', 'thirdLine', 'fourthLine'].map(line => (
          <Grid container direction="row" justify="space-around" alignItems="center">
            {MOBILE_OPTIONS[line].map(option => this.renderOption(classes, option))}
          </Grid>
        ))}
      </div>
    );
  }
}

MobileCalculator.propTypes = {
  classes: PropTypes.object,
  setValueCalculator: PropTypes.func,
};

export default compose(withStyles(styles))(MobileCalculator);
