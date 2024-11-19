import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { DefaultButton } from 'components/Controls';
import messages from './messages';
import { styles } from './styles';

function RemoveNeedGradingBody(props) {
  const { classes, color, onCancel, onRemove } = props;
  return (
    <div className={classes.need_grading_container}>
      <FormattedMessage {...messages.removeNeedGradingBodyFirst} />
      <br />
      <br />
      <FormattedMessage {...messages.removeNeedGradingBodySecond} />
      <div className={classes.need_grading_buttons}>
        <DefaultButton borderRadius={4} text={<FormattedMessage {...messages.cancel} />} onClick={onCancel} />
        <DefaultButton
          backgroundColor={color}
          borderRadius={4}
          className={classes.remove_btn}
          text={<FormattedMessage {...messages.remove} />}
          onClick={onRemove}
        />
      </div>
    </div>
  );
}

RemoveNeedGradingBody.propTypes = {
  classes: PropTypes.object,
  color: PropTypes.string,
  onCancel: PropTypes.func,
  onRemove: PropTypes.func,
};

export default withStyles(styles)(RemoveNeedGradingBody);
