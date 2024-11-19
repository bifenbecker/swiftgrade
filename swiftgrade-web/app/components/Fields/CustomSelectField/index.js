import React from 'react';
import PropTypes from 'prop-types';
import { CustomSelect } from 'components/Controls';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

class CustomSelectField extends React.Component {
  onChange = value => {
    const { input } = this.props;
    input.onChange(value);
  };

  render() {
    const { classes, input, meta, ...other } = this.props;
    return <CustomSelect id={input.name} value={input.value} onChange={this.onChange} {...other} />;
  }
}

CustomSelectField.propTypes = {
  classes: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.object,
  onChange: PropTypes.func,
};

export default withStyles(styles)(CustomSelectField);
