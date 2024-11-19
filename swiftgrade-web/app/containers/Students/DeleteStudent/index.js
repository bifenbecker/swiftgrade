import React from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { DefaultButton } from 'components/Controls';
import { FormattedMessage, intlShape } from 'react-intl';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

function DeleteStudent(props) {
  const { classes, group, onCancel } = props;
  return (
    <Grid container direction="column" className={classes.delete_assessments_container}>
      <Grid item>
        <FormattedMessage {...messages.studentDeleteMessage} />
      </Grid>
      <Grid item direction="row" className={classes.delete_assessments_buttons}>
        <div className={classes.delete_assessment_button}>
          <DefaultButton borderRadius={4} onClick={onCancel} text={<FormattedMessage {...messages.cancel} />} />
        </div>
        <DefaultButton
          backgroundColor={group.color}
          borderRadius={4}
          onClick={() => props.onSubmit()}
          text={<FormattedMessage {...messages.delete} />}
        />
      </Grid>
    </Grid>
  );
}

DeleteStudent.propTypes = {
  intl: intlShape.isRequired,
  invalid: PropTypes.bool,
  classes: PropTypes.object,
  group: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default compose(withStyles(styles))(DeleteStudent);
