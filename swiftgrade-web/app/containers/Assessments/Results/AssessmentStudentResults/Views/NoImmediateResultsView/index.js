import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Typography, withStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { IconNoImmediateResults } from 'components/Svgs';
import { DefaultButton } from 'components/Controls';
import messages from '../../messages';
import { styles } from './styles';

function NoImmediateResultsView(props) {
  const { assessment, classes, history } = props;
  return (
    <Fragment>
      <div className={classes.no_immediate_results_image}>
        <IconNoImmediateResults className={classes.no_immediate_results_icon} color={assessment.group.color} />
      </div>
      <Typography variant="h3" className={classes.no_immediate_results_title}>
        <FormattedMessage {...messages.assessmentSubmitted} />
      </Typography>
      <div className={classes.finish_btn_wrapper}>
        <DefaultButton
          backgroundColor={assessment.group.color}
          className={classes.finish_btn}
          onClick={() => history.push('/')}
          text={<FormattedMessage {...messages.finish} />}
        />
      </div>
    </Fragment>
  );
}

NoImmediateResultsView.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object,
  history: PropTypes.object,
};

export default withStyles(styles)(NoImmediateResultsView);
