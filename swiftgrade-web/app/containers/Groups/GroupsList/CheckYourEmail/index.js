import React from 'react';
import { FormattedMessage } from 'react-intl';
import { IconMail } from 'components/Svgs';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

import messages from './messages';
import { styles } from './styles';

const CheckYourEmail = props => {
  const { classes } = props;
  return (
    <>
      <div className={classes.please_check_svg_wrapper}>
        <IconMail style={{ maxWidth: '150px', height: 'auto' }} />
      </div>
      <div className={classes.please_check_wrapper}>
        <span className={classes.please_check_title}>
          <FormattedMessage {...messages.pleaseCheck} />
        </span>
        <span className={classes.please_check_sub_title}>
          <FormattedMessage {...messages.pleaseVerifySubtitle} />
        </span>
        <span className={classes.please_check_text}>
          <FormattedMessage {...messages.pleaseVerifyText} />
        </span>
      </div>
    </>
  );
};

CheckYourEmail.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(CheckYourEmail);
