import React from 'react';
import PropTypes from 'prop-types';
import { Checkbox, FormControlLabel, Tooltip } from '@material-ui/core';
import StopRoundedIcon from '@material-ui/icons/StopRounded';
import { UNCHECKED_ICON_SIZE } from './constants';

function MUCheckbox(props) {
  const { checkboxClasses, checked, color, disabled, tooltipMessage, id, label, size, value, onChange } = props;
  const checkboxData = { checked, color, disabled, size, value, onChange };

  if (id === 'generic') {
    const uncheckedIconSize = UNCHECKED_ICON_SIZE[size];
    checkboxData.icon = <StopRoundedIcon style={{ fontSize: uncheckedIconSize }} />;
  }

  const checkboxContent = <Checkbox classes={checkboxClasses.checkbox} {...checkboxData} />;

  const control = tooltipMessage ? (
    <Tooltip title={tooltipMessage}>
      <div>{checkboxContent}</div>
    </Tooltip>
  ) : (
    checkboxContent
  );

  return <FormControlLabel control={control} label={label} classes={checkboxClasses.label} />;
}

MUCheckbox.propTypes = {
  checked: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  color: PropTypes.string,
  label: PropTypes.string,
  onChange: PropTypes.func,
  size: PropTypes.string,
  tooltipMessage: PropTypes.any,
  value: PropTypes.any,
  checkboxClasses: PropTypes.any,
};

MUCheckbox.defaultProps = {
  id: 'default',
  checked: false,
  disabled: false,
  color: 'default',
  label: 'Checkbox label',
  size: 'small',
  checkboxClasses: { label: {}, checkbox: {} },
};

export default MUCheckbox;
