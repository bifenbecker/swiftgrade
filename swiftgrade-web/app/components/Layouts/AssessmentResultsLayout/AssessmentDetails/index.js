import React from 'react';
import PropTypes from 'prop-types';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Grid } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { styles } from './styles';
import messages from './messages';

function AssessmentDetails(props) {
  const { assessment, classes, count, history } = props;
  return (
    <Grid md={6} xs={12} item className={classes.assessment_details_wrapper}>
      <Grid container direction="column" alignItems="flex-start">
        <Grid xs={4} item className={classes.back_icon}>
          <ArrowBackIcon onClick={() => history.push(`/groups/${assessment.group.id}/assessments/`)} />
        </Grid>
        <Grid item className={classes.group_name_wrapper}>
          <div className={classes.group_name}>{assessment.group.name}</div>
        </Grid>
        <Grid item className={classes.assessment_details}>
          {assessment.name}
        </Grid>
        <Grid item className={classNames(classes.assessment_details, 'count')}>
          {count === 1 ? (
            <FormattedMessage {...messages.oneResult} />
          ) : (
            <FormattedMessage {...messages.countResults} values={{ count }} />
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

AssessmentDetails.propTypes = {
  count: PropTypes.number,
  assessment: PropTypes.object,
  classes: PropTypes.object,
  history: PropTypes.object,
};

export default compose(withStyles(styles))(AssessmentDetails);
