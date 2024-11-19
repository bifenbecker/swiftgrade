import React from 'react';
import { FormattedMessage } from 'react-intl';

import { MUButton } from 'components/Controls';

import messages from './messages';

const IOSAppModal = props => {
  const { classes, color } = props;

  props.showModal({
    customStyles: {
      top: 'auto',
    },
    title: <FormattedMessage {...messages.learnMoreTitle} />,
    body: (
      <div>
        <FormattedMessage {...messages.learnMoreMessageFirst} />
        <br />
        <br />
        <FormattedMessage
          {...messages.learnMoreMessageSecond}
          values={{
            paper: (
              <u>
                <FormattedMessage {...messages.paper} />
              </u>
            ),
          }}
        />
        <br />
        <br />
        <b>
          <FormattedMessage
            {...messages.learnMoreMessageThird}
            values={{
              online: (
                <u>
                  <FormattedMessage {...messages.online} />
                </u>
              ),
            }}
          />
        </b>
        <br />
        <br />
        <FormattedMessage {...messages.learnMoreMessageFourth} />
        <br />
        <br />
        <FormattedMessage {...messages.learnMoreMessageFifth} />
        <br />
        <br />
        <FormattedMessage {...messages.learnMoreMessageSixth} />
        <br />
        <br />
        <div>
          <MUButton
            className={classes.transparent_modal_button}
            style={{ backgroundColor: color, float: 'right' }}
            onClick={props.hideModal}
            text={<FormattedMessage {...messages.gotIt} />}
          />
        </div>
      </div>
    ),
  });
};

export default IOSAppModal;
