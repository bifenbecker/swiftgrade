import React from 'react';
import { FormattedMessage } from 'react-intl';

import { MUButton } from 'components/Controls';

import messages from './messages';
import { IconArrowRight, IconCheck, IconX } from '../../Svgs';

const AutoCorrectModal = props => {
  const { classes, color } = props;

  props.showModal({
    customStyles: {
      top: 'auto',
    },
    title: <FormattedMessage {...messages.autoCorrectTutorialTitle} />,
    body: (
      <div>
        <FormattedMessage {...messages.autoCorrectTutorialFirst} />
        <br />
        <br />
        <u>
          <FormattedMessage {...messages.autoCorrectTutorialSecond} />
        </u>
        <br />
        <br />
        <FormattedMessage {...messages.autoCorrectTutorialThird} />
        <b>ionic</b>
        <FormattedMessage {...messages.autoCorrectTutorialFourth} />
        <b>
          ioni
          <mark>k</mark>
        </b>
        <FormattedMessage {...messages.autoCorrectTutorialFifth} />
        <br />
        <br />
        <i>
          <FormattedMessage {...messages.autoCorrectTutorialSixth} />
          <IconX />
          <br />
          <br />
          <span style={{ color: '#00BFFF' }}>AC </span>on:&nbsp;
          <IconCheck />
          <FormattedMessage {...messages.autoCorrectTutorialSeventh} />
          <IconArrowRight />
          <span>Ionic)</span>
        </i>
        <br />
        <br />
        <div>
          <MUButton
            className={classes.transparent_modal_button}
            style={{ backgroundColor: color, float: 'right' }}
            onClick={props.hideModal}
            text={<FormattedMessage {...messages.gotIt} />}
          />
          <MUButton
            className={classes.transparent_modal_button}
            style={{ backgroundColor: 'rgb(189, 189, 189)', float: 'right', marginRight: '10px' }}
            onClick={() => {
              props.hideModal();
              props.onDoNotShowACTutorial(props.user);
            }}
            text={<FormattedMessage {...messages.doNotShowAgain} />}
          />
        </div>
      </div>
    ),
  });
};

export default AutoCorrectModal;
