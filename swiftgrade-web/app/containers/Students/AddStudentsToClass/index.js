import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Grid, FormHelperText, FormControl } from '@material-ui/core';

import { DefaultButton } from 'components/Controls';
import { FormattedMessage, intlShape } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

import ListClasses from './ListClasses';

const NO_SELECT_CLASS_ERROR = 'Please select at least one class.';

const AddStudentsToClass = props => {
  const [checkedClasses, setCheckedClasses] = useState([]);
  const [error, setError] = useState();
  const { group: currentGroup, classes, onCancel, onSubmit } = props;

  const handleChange = e => {
    const { value, checked } = e.target;
    const classId = parseInt(value, 10);
    if (checked) {
      // push selected value in list
      setCheckedClasses(prev => [...prev, classId]);
    } else {
      // remove unchecked value from the list
      setCheckedClasses(prev => prev.filter(x => x !== classId));
    }
  };

  const handleSubmit = event => {
    // remove page reload when submitting form
    event.preventDefault();
    if (checkedClasses.length > 0) {
      onSubmit({ checkedClasses });
      setError(undefined);
    } else {
      setError(NO_SELECT_CLASS_ERROR);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <FormControl error={error} fullWidth>
        <Grid container direction="column" spacing={1}>
          <Grid item className={classes.list_wrapper}>
            <ListClasses currentGroup={currentGroup} handleChange={handleChange} checkedClasses={checkedClasses} />
          </Grid>
          {error && (
            <Grid item>
              <FormHelperText>{error}</FormHelperText>
            </Grid>
          )}
          <Grid item>
            <Grid container justify="flex-end">
              <Grid item>
                <DefaultButton borderRadius={4} text={<FormattedMessage {...messages.cancel} />} onClick={onCancel} />
              </Grid>
              <Grid item className={classes.add_btn_wrapper}>
                <DefaultButton
                  backgroundColor={currentGroup.color}
                  borderRadius={4}
                  text={<FormattedMessage {...messages.add} />}
                  type="submit"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </FormControl>
    </form>
  );
};

AddStudentsToClass.propTypes = {
  intl: intlShape.isRequired,
  classes: PropTypes.object,
  group: PropTypes.object,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
};

export default withStyles(styles)(AddStudentsToClass);
