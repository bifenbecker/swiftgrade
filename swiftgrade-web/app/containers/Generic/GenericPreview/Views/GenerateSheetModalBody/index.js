import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { MUButton } from 'components/Controls';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import messages from '../../messages';

const GenerateSheetModalBody = ({ afterClickAction, classes, hideModal, updateUser }) => (
  <Fragment>
    <div className={classes.generate_sheet_modal_text} style={{ fontSize: 14 }}>
      <FormattedMessage {...messages.mcSheetsModalMessageFirst} />
      <br />
      <br />
      <FormattedMessage {...messages.mcSheetsModalMessageSecond} />
      <br />
    </div>
    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
      <div style={{ marginRight: 20 }}>
        <MUButton
          text={<FormattedMessage {...messages.okay} />}
          className={classes.generate_sheet_modal_btn}
          onClick={() => {
            hideModal();
            afterClickAction();
          }}
        />
      </div>
      <div>
        <MUButton
          text={<FormattedMessage {...messages.doNotShowAgain} />}
          className={classes.generate_sheet_modal_btn}
          onClick={() => {
            updateUser();
            afterClickAction();
          }}
        />
      </div>
    </div>
  </Fragment>
);

GenerateSheetModalBody.propTypes = {
  afterClickAction: PropTypes.func,
  classes: PropTypes.object,
  hideModal: PropTypes.func,
  updateUser: PropTypes.func,
};

export default compose(withStyles(styles))(GenerateSheetModalBody);
