import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, Tooltip } from '@material-ui/core';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { FormattedMessage } from 'react-intl';
import { styles } from './styles';
import messages from './messages';

function MUToggleButtonGroup(props) {
  const { classes, value, size, onChange, options, toggleButtonRootClass, tooltipMessage } = props;

  const getToggleButtonContent = option => {
    const toggleButton = (
      <ToggleButton
        className={classes.toggle_button}
        disabled={option.value === value}
        onClick={option.onClick}
        value={option.value}
        classes={{ root: toggleButtonRootClass }}
      >
        {option.label}
      </ToggleButton>
    );
    return tooltipMessage && option.value !== value ? (
      <Tooltip arrow title={tooltipMessage}>
        {toggleButton}
      </Tooltip>
    ) : (
      toggleButton
    );
  };

  return (
    <ToggleButtonGroup value={value} exclusive onChange={onChange} size={size}>
      {options.map(option => getToggleButtonContent(option))}
    </ToggleButtonGroup>
  );
}

MUToggleButtonGroup.propTypes = {
  classes: PropTypes.object,
  onChange: PropTypes.func,
  options: PropTypes.array,
  value: PropTypes.bool,
  size: PropTypes.string,
  toggleButtonRootClass: PropTypes.any,
  tooltipMessage: PropTypes.any,
};

MUToggleButtonGroup.defaultValues = {
  value: true,
  options: [
    {
      label: <FormattedMessage {...messages.yes} />,
      value: true,
    },
    {
      label: <FormattedMessage {...messages.no} />,
      value: false,
    },
  ],
  size: 'small',
};

export default withStyles(styles)(MUToggleButtonGroup);
