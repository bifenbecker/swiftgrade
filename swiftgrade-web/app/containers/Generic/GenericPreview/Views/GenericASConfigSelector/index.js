import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles } from '@material-ui/core';
import { CustomSelect } from 'components/Controls';
import { compose } from 'redux';
import { styles } from './styles';

function GenericASConfigSelector(props) {
  const { classes, defaultValue, disabled, onChangeConfig, options, title } = props;

  return (
    <Grid container className={classes.select_container}>
      <Grid item xs={12} sm={6} md={5}>
        {title}
      </Grid>
      <Grid item xs={12} sm={6} md={7}>
        <div className={classes.select}>
          <CustomSelect
            disabled={disabled}
            iconStyle={{ color: 'black', width: 12, height: 12, marginRight: 6 }}
            options={options}
            selectClasses={{ input: classes.select_root }}
            value={defaultValue}
            onChange={e => onChangeConfig(e)}
          />
        </div>
      </Grid>
    </Grid>
  );
}

GenericASConfigSelector.propTypes = {
  defaultValue: PropTypes.any,
  disabled: PropTypes.bool,
  classes: PropTypes.object,
  onChangeConfig: PropTypes.func,
  options: PropTypes.object,
  title: PropTypes.any,
};

export default compose(withStyles(styles))(GenericASConfigSelector);
