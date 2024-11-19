import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { MUButton } from 'components/Controls';
import { styles } from './styles';
import messages from './messages';

const EmailSuccessForm = props => {
  const { classes } = props;
  return (
    <form onSubmit={() => props.hideModal()}>
      <Grid container>
        <Grid container>
          <ul className={classes.list}>
            <li>
              <FormattedMessage {...messages.emailSentResultsForStudentWithEmail} />
            </li>
            <li>
              <FormattedMessage {...messages.emailSentStudentsWithAccount} />
            </li>
          </ul>
        </Grid>
        <Grid container justify="flex-end">
          <Grid item>
            <MUButton
              className={classes.btnOkay}
              variant="text"
              type="submit"
              text={<FormattedMessage {...messages.emailSentOkay} color="blue" />}
            />
          </Grid>
        </Grid>
      </Grid>
    </form>
  );
};

EmailSuccessForm.propTypes = {
  hideModal: PropTypes.func,
  classes: PropTypes.object,
};

export default withStyles(styles)(EmailSuccessForm);
