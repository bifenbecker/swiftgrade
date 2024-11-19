import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { DefaultButton } from 'components/Controls';
import { styles } from './styles';
import messages from './messages';

function SaveAndExitBody(props) {
  const { assessment, classes, onCancel, onExit } = props;
  return (
    <div className={classes.wrapper}>
      <FormattedMessage {...messages.saveAndExitBodyFirst} />
      <br />
      <br />
      <FormattedMessage {...messages.saveAndExitBodySecond} />
      <div className={classes.btn_container}>
        <DefaultButton
          backgroundColor="rgb(250, 250, 250)"
          borderRadius={4}
          className={classes.save_and_exit_view_btn}
          color={assessment.group.color}
          text={<FormattedMessage {...messages.cancel} />}
          onClick={onCancel}
        />
        <DefaultButton
          backgroundColor={assessment.group.color}
          borderRadius={4}
          className={classes.save_and_exit_view_btn}
          text={<FormattedMessage {...messages.exit} />}
          onClick={onExit}
        />
      </div>
    </div>
  );
}

SaveAndExitBody.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object,
  onCancel: PropTypes.func,
  onExit: PropTypes.func,
};

export default withStyles(styles)(SaveAndExitBody);
