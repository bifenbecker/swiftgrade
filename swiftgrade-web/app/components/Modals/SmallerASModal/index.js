import React from 'react';
import { FormattedMessage } from 'react-intl';

import { MUButton } from 'components/Controls';

import messages from './messages';

const SmallerASModal = props => {
  const { classes } = props;

  props.showModal({
    customStyles: {
      top: 'auto',
    },
    title: <FormattedMessage {...messages.smallerASTitle} />,
    body: (
      <div>
        <FormattedMessage {...messages.smallerASBodyFirst} />
        <br />
        <br />
        <FormattedMessage {...messages.smallerASBodySecond} />
        <br />
        <br />
        <div>
          <MUButton
            className={classes.transparent_modal_button}
            style={{ float: 'right' }}
            onClick={props.hideModal}
            text={<FormattedMessage {...messages.okay} />}
          />
          <MUButton
            className={classes.transparent_modal_button}
            style={{ backgroundColor: 'rgb(189, 189, 189)', float: 'right', marginRight: '10px' }}
            onClick={() => {
              props.hideModal();
              props.onDoNotShowModal(props.user, { smaller_as: false });
            }}
            text={<FormattedMessage {...messages.doNotShowAgain} />}
          />
        </div>
      </div>
    ),
  });
};

export default SmallerASModal;
