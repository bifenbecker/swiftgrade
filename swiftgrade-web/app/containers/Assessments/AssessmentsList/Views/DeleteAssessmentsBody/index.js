import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { FormattedMessage } from 'react-intl';
import { DefaultButton } from 'components/Controls';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

function DeleteAssessmentsBody(props) {
  const { classes, group } = props;
  return (
    <Grid container direction="column" className={classes.delete_assessments_container}>
      <Grid item>
        <FormattedMessage {...messages.deleteAssessments} />
      </Grid>
      <Grid item direction="row" className={classes.delete_assessments_buttons}>
        <div className={classes.delete_assessment_button}>
          <DefaultButton borderRadius={4} onClick={props.onCancel} text={<FormattedMessage {...messages.cancel} />} />
        </div>
        <DefaultButton
          backgroundColor={group.color}
          borderRadius={4}
          onClick={props.onSubmit}
          text={<FormattedMessage {...messages.delete} />}
        />
      </Grid>
    </Grid>
  );
}

DeleteAssessmentsBody.propTypes = {
  classes: PropTypes.object,
  group: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default compose(withStyles(styles))(DeleteAssessmentsBody);
