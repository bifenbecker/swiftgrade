import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import classNames from 'classnames';
import _ from 'lodash';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

const OPTIONS = ['A', 'B', 'C', 'D', 'E'];

class MCAnswerField extends React.Component {
  onChange = option => {
    const { input } = this.props;
    const value = _.cloneDeep(input.value);

    if (value.includes(option)) {
      const index = value.indexOf(option);
      value.splice(index, 1);
    } else {
      value.push(option);
    }
    input.onChange(value);
  };

  render() {
    const { classes, input } = this.props;
    return (
      <Grid
        alignItems="center"
        className={classes.root}
        container
        direction="row"
        id={input.name}
        justify="space-between"
      >
        {OPTIONS.map(option => (
          <Grid item>
            <div
              className={classNames(classes.item, {
                active: input.value.includes(option),
              })}
              role="button"
              tabIndex={-1}
              onBlur={() => input.onBlur()}
              onClick={() => this.onChange(option)}
            >
              {option}
            </div>
          </Grid>
        ))}
      </Grid>
    );
  }
}

MCAnswerField.propTypes = {
  classes: PropTypes.object,
  input: PropTypes.object,
};

export default withStyles(styles)(MCAnswerField);
