import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { IconWithMen } from 'components/Svgs';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { UserHeaderLayout, UserFooterLayout } from 'components/Layouts';
import { styles } from './styles';
import messages from './messages';

function NoValidLink(props) {
  const { classes, history } = props;
  return (
    <div className={classes.wrapper_component}>
      <div className={classes.component}>
        <UserHeaderLayout history={history} />
        <div className={classes.component_inner}>
          <div className={classes.novalid_icon}>
            <IconWithMen style={{ maxWidth: 280, margin: '0 auto' }} />
          </div>

          <h2>
            <FormattedMessage {...messages.noValidLink} />
          </h2>
        </div>
      </div>
      <UserFooterLayout />
    </div>
  );
}

NoValidLink.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
};

export default compose(withStyles(styles))(NoValidLink);
