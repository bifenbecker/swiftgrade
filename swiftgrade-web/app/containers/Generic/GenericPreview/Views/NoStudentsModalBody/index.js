import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { MUButton } from 'components/Controls';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import messages from '../../messages';

function NoStudentsModalBody(props) {
  const { classes } = props;
  return (
    <Fragment>
      <div className={classes.no_students_modal_text}>
        <FormattedMessage {...messages.noStudentsMessageFirst} />
        <br />
        <br />
        <FormattedMessage {...messages.noStudentsMessageSecond} />
      </div>
      <div className={classes.no_students_modal_button}>
        <MUButton
          text={<FormattedMessage {...messages.okay} />}
          color="primary"
          onClick={() => {
            props.hideModal();
          }}
        />
      </div>
    </Fragment>
  );
}

NoStudentsModalBody.propTypes = {
  classes: PropTypes.object,
  hideModal: PropTypes.func,
};

export default compose(withStyles(styles))(NoStudentsModalBody);
