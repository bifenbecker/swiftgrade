import React from 'react';
import { FormattedMessage } from 'react-intl';

import { MUButton } from 'components/Controls';
import { IconPNGFormat } from 'components/Svgs';

import messages from './messages';

const PNGAnswerSheetModal = props => {
  const { classes } = props;

  props.showModal({
    customStyles: {
      top: 'auto',
      width: '650px',
    },
    title: <FormattedMessage {...messages.PNGAnswerSheetTitle} />,
    body: (
      <div>
        <FormattedMessage {...messages.PNGAnswerSheetBodyFirst} />
        <br />
        <br />
        <IconPNGFormat style={{ marginLeft: '10px' }} />
        <br />
        <br />
        <FormattedMessage {...messages.PNGAnswerSheetBodySecond} />
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
              props.onDoNotShowModal(props.user, { png_format: false });
            }}
            text={<FormattedMessage {...messages.doNotShowAgain} />}
          />
        </div>
      </div>
    ),
  });
};

export default PNGAnswerSheetModal;
