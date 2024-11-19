import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Select } from 'components/Controls';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

class SelectField extends React.Component {
  onChange = e => {
    const { input } = this.props;
    input.onChange(e.target.value);
  };

  render() {
    const { classes, input, meta, ...other } = this.props;
    const isError = meta.touched && meta.invalid;
    return (
      <Fragment>
        <Select value={input.value} onChange={this.onChange} {...other} />
        {isError && <div className={classes.error}>{meta.error}</div>}
      </Fragment>
    );
  }
}

SelectField.propTypes = {
  classes: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.object,
  onChange: PropTypes.func,
};

export default withStyles(styles)(SelectField);
