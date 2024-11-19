import React from 'react';
import PropTypes from 'prop-types';
import DefaultButton from 'components/Controls/Buttons/DefaultButton';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

function LeaveModalView(props) {
  const { classes, group, history } = props;
  return (
    <div className={classes.leave_page_view}>
      <FormattedMessage {...messages.leavePageBody} />
      <div className={classes.leave_page_buttons}>
        <DefaultButton
          className={classes.leave_page_button}
          text={<FormattedMessage {...messages.leave} />}
          onClick={() => {
            history.push(`/groups/${group.id}/assessments/`);
            props.hideModal();
          }}
          backgroundColor={group.color}
        />
        <DefaultButton
          className={classes.leave_page_button}
          text={<FormattedMessage {...messages.cancel} />}
          onClick={() => {
            props.hideModal();
            window.history.pushState(null, null, window.location.pathname);
          }}
          color={group.color}
          backgroundColor="rgb(250, 250, 250)"
        />
      </div>
    </div>
  );
}

LeaveModalView.propTypes = {
  classes: PropTypes.object,
  group: PropTypes.object,
  history: PropTypes.object,
  hideModal: PropTypes.func,
};

export default compose(withStyles(styles))(LeaveModalView);
