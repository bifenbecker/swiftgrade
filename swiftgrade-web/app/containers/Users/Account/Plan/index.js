import React from 'react';
import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';
import { IconPremium } from 'components/Svgs';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

function PlanTabContent(props) {
  const { classes } = props;
  return (
    <div className={classes.content_wrapper}>
      <IconPremium className={classes.plan_icon} />
      <Typography align="center" className={classes.plan_text}>
        <FormattedMessage {...messages.accountType} />
        <FormattedMessage {...messages.swiftGrade} />
        <strong className={classes.premium}>
          <FormattedMessage {...messages.premium} />
        </strong>
      </Typography>
      <Typography align="center" className={classes.plan_text}>
        <FormattedMessage {...messages.planCongratulations} />
      </Typography>
    </div>
  );
}

PlanTabContent.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
};

export default compose(withStyles(styles))(PlanTabContent);
