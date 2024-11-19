import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

// MUI components
import Close from '@material-ui/icons/Close';
import { Grid } from '@material-ui/core';

// Styles
import { useStyles } from './styles';

/**
 * Title for help modal window
 * @param {message, onClose} props
 * @returns {React.ReactElement} The Title.
 */
const Title = props => {
  const { message, onClose } = props;
  const classes = useStyles();
  return (
    <Grid container justify="center" alignItems="center">
      <Grid item className={classes.help_modal_title}>
        <FormattedMessage {...message} />
      </Grid>
      <Grid item className={classes.help_modal_close_icon_wrapper}>
        <Close className={classes.help_modal_close_icon} onClick={onClose} />
      </Grid>
    </Grid>
  );
};

Title.propTypes = {
  message: PropTypes.object,
  onClose: PropTypes.func,
};

export default Title;
