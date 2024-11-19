import { Button } from '@material-ui/core';
import { IconAddManually, IconClosePopup, IconInviteStudents } from 'components/Svgs';
import PropTypes from 'prop-types';
import React from 'react';
import { FormattedMessage } from 'react-intl';

import { hideModal } from 'components/Modals/Modal/actions';

import { connect } from 'react-redux';
import { compose } from 'redux';
import messages from '../messages';

const EnrollementOptionsModalBody = props => {
  const { classes, group } = props;

  return (
    <div className={classes.type_buttons}>
      <button className={classes.popup_close_icon} onClick={() => props.hideModal()} type="button">
        <IconClosePopup width={15} height={15} />
      </button>
      <div className={classes.enrollement_options_body_wrapper}>
        <Button className={classes.enrollement_options_body} style={{ float: 'left' }} onClick={props.getStudentCode}>
          <IconInviteStudents className={classes.enrollement_options_icon} fill={group.color} />
          <p className={classes.enrollement_options_title_text}>
            <FormattedMessage {...messages.inviteStudents} />
          </p>
          <p className={classes.enrollement_options_body_text}>
            <FormattedMessage {...messages.inviteStudentsRule} />
          </p>
        </Button>
        <Button
          className={classes.enrollement_options_body}
          style={{ float: 'right' }}
          onClick={props.addStudentsManually}
        >
          <IconAddManually className={classes.enrollement_options_icon} fill={group.color} />
          <p className={classes.enrollement_options_title_text}>
            <FormattedMessage {...messages.addManuallyTitle} />
          </p>
          <p className={classes.enrollement_options_body_text}>
            <FormattedMessage {...messages.addManuallyBody} />
          </p>
        </Button>
      </div>
    </div>
  );
};

EnrollementOptionsModalBody.propTypes = {
  classes: PropTypes.object,
  group: PropTypes.object,
  hideModal: PropTypes.func,
  getStudentCode: PropTypes.func,
  addStudentsManually: PropTypes.func,
};

const mapDispatchToProps = {
  hideModal,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(withConnect)(EnrollementOptionsModalBody);
