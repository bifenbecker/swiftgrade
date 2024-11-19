import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import { IconRoundCheck } from 'components/Svgs';

import messages from './messages';
import { styles } from './styles';

function ChecklistButton(props) {
  const { classes, stepsToDo, onClick, ...other } = props;
  return (
    <div className={classes.checklist_button}>
      <Button
        className={classes.root}
        style={{ backgroundColor: '#0F3AE8' }}
        startIcon={<IconRoundCheck className={classes.checklist_button_icon} />}
        onClick={onClick}
        variant="contained"
        {...other}
      >
        <FormattedMessage {...messages.buttonTitle} />
      </Button>
      <div className={classes.steps_bagde}>{stepsToDo}</div>
    </div>
  );
}

ChecklistButton.propTypes = {
  classes: PropTypes.object,
  stepsToDo: PropTypes.number,
  onClick: PropTypes.func,
};

export default withStyles(styles)(ChecklistButton);
