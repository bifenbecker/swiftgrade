import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core';
import MUButton from 'components/Controls/Buttons/MUButton';
import messages from './messages';
import { styles } from './styles';

function RemarkResultsModalView(props) {
  const { classes } = props;
  return (
    <Fragment>
      <div className={classes.remark_results_modal_text}>
        <FormattedMessage {...messages.remarkResultsBody} />
      </div>
      <div className={classes.remark_results_modal_buttons}>
        <div style={{ marginRight: 20 }}>
          <MUButton
            className={classes.btns}
            onClick={() => props.hideModal()}
            text={<FormattedMessage {...messages.okay} />}
          />
        </div>
        <div>
          <MUButton
            className={classes.btns}
            onClick={() => props.onClickDoNotShowAgain()}
            text={<FormattedMessage {...messages.doNotShowAgain} />}
          />
        </div>
      </div>
    </Fragment>
  );
}

RemarkResultsModalView.propTypes = {
  classes: PropTypes.object,
  groupColor: PropTypes.string,
  hideModal: PropTypes.func,
  onClickDoNotShowAgain: PropTypes.func,
};

export default withStyles(styles)(RemarkResultsModalView);
