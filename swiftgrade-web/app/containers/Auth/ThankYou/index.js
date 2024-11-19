import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { IconMail } from 'components/Svgs';
import { UserHeaderLayout, UserFooterLayout } from 'components/Layouts';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

function ThankYou(props) {
  const { classes, history } = props;
  return (
    <div className={classes.wrapper_component}>
      <div className={classes.component}>
        <UserHeaderLayout history={history} />
        <div className={classes.component_inner}>
          <div className={classes.thankyou_icon}>
            <IconMail style={{ maxWidth: 250, margin: '0 auto' }} />
          </div>
          <h2>
            <FormattedMessage {...messages.pleaseVerify} />
          </h2>
          <h4>
            <FormattedMessage {...messages.pleaseVerifySubtitle} />
          </h4>
          <p>
            <FormattedMessage {...messages.pleaseVerifyText} />
          </p>
        </div>
      </div>
      <UserFooterLayout />
    </div>
  );
}

ThankYou.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
};

export default compose(withStyles(styles))(ThankYou);
