import React from 'react';
import { withStyles } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { DefaultButton } from 'components/Controls';
import PropTypes from 'prop-types';
import RemoteSubmitButton from 'components/Controls/Buttons/RemoteSubmitButton';
import messages from './messages';
import { styles } from './styles';

function SubmitAndFinishBody(props) {
  const { assessment, classes, onCancel } = props;
  return (
    <div className={classes.wrapper}>
      <FormattedMessage {...messages.submitAndFinishBody} />
      <div className={classes.btn_container}>
        <DefaultButton
          backgroundColor="rgb(250, 250, 250)"
          borderRadius={4}
          className={classes.submit_and_finish_view_btn}
          color={assessment.group.color}
          text={<FormattedMessage {...messages.cancel} />}
          onClick={onCancel}
        />
        <RemoteSubmitButton
          backgroundColor={assessment.group.color}
          borderRadius={4}
          className={classes.submit_and_finish_view_btn}
          formName="OnlineAssessmentForm"
          text={<FormattedMessage {...messages.submit} />}
        />
      </div>
    </div>
  );
}

SubmitAndFinishBody.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object,
  onCancel: PropTypes.func,
};

export default withStyles(styles)(SubmitAndFinishBody);
