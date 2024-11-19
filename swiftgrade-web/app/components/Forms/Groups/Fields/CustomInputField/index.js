import React from 'react';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { withStyles, Tooltip } from '@material-ui/core';
import classNames from 'classnames';

import { IconButton } from 'components/Controls';
import { CUSTOM_INPUT_FIELD_ID } from 'globalConstants';

import { styles } from './styles';
import InputField from '../InputField';

function CustomInputField(props) {
  const { classes, fieldProps, width, type } = props;
  return (
    <div
      id={CUSTOM_INPUT_FIELD_ID}
      className={classNames({
        [classes.field]: width > 450,
        [classes.mobile_field]: width <= 450,
      })}
    >
      <InputField
        customErrorClass={fieldProps.customErrorClass}
        name={fieldProps.name}
        placeholder={fieldProps.placeholder}
      />
      <Tooltip title={fieldProps.title} placement="right" arrow className={classes.tooltip}>
        <div className={CUSTOM_INPUT_FIELD_ID}>
          {type === 'create' && (
            <IconButton
              borderRadius="50%"
              disabled={fieldProps.disabled}
              icon={fieldProps.icon}
              hoverStyle={fieldProps.hoverStyle}
              tabIndex={-1}
              onClick={() => fieldProps.actionClassName(fieldProps.key, fieldProps.index)}
            />
          )}
        </div>
      </Tooltip>
    </div>
  );
}

CustomInputField.propTypes = {
  type: PropTypes.string,
  width: PropTypes.number,
  classes: PropTypes.object,
  fieldProps: PropTypes.object,
};

export default compose(withStyles(styles))(CustomInputField);
