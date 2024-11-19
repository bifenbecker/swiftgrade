import React, { useState, useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { MUButton, MUCheckbox } from 'components/Controls';
import { FormattedMessage } from 'react-intl';

import { styles } from './styles';
import messages from './messages';

const UsernameIsEmailModal = props => {
  const { classes, onClick } = props;

  const [checkboxIsChecked, setCheckboxIsChecked] = useState(false);
  const disabled = !checkboxIsChecked;

  useEffect(() => {
    props.showModal({
      title: <FormattedMessage {...messages.usernameIsEmailTitle} />,
      body: renderBody(),
    });
  }, [checkboxIsChecked]);

  const renderBody = () => (
    <div>
      <p>
        <FormattedMessage {...messages.usernameIsEmailBodyFirst} />
      </p>
      <div className={classes.buttons_wrapper}>
        <MUCheckbox
          checked={checkboxIsChecked}
          checkboxClasses={classes.username_is_email_checkbox}
          label={
            <Fragment>
              <FormattedMessage {...messages.iUnderstand} />
            </Fragment>
          }
          onChange={() => setCheckboxIsChecked(!checkboxIsChecked)}
        />
        <MUButton
          className={classes.transparent_modal_button}
          disabled={disabled}
          style={{ color: disabled ? 'gray' : '#3367d6' }}
          onClick={onClick}
          text={<FormattedMessage {...messages.done} />}
        />
      </div>
    </div>
  );

  return <></>;
};

UsernameIsEmailModal.propTypes = {
  classes: PropTypes.object,
  showModal: PropTypes.func,
  onClick: PropTypes.func,
};

export default withStyles(styles)(UsernameIsEmailModal);
