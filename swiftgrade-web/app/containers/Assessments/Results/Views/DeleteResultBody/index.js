import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import { DefaultButton } from 'components/Controls';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import messages from './messages';

function DeleteResultBody(props) {
  const { classes, group } = props;
  return (
    <Grid container direction="column" className={classes.delete_assessments_container}>
      <Grid item>
        <FormattedMessage {...messages.deleteResult} />
      </Grid>
      <Grid item direction="row" className={classes.delete_assessments_buttons}>
        <div className={classes.delete_assessment_button}>
          <DefaultButton borderRadius={4} onClick={props.onCancel} text={<FormattedMessage {...messages.cancel} />} />
        </div>
        <DefaultButton
          backgroundColor={group.color}
          borderRadius={4}
          text={<FormattedMessage {...messages.confirm} />}
          onClick={props.onSubmit}
        />
      </Grid>
    </Grid>
  );
}

DeleteResultBody.propTypes = {
  classes: PropTypes.object,
  group: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default compose(withStyles(styles))(DeleteResultBody);
