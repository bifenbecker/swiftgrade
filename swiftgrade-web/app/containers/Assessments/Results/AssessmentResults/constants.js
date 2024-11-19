import React from 'react';
import { IconClosePopup } from 'components/Svgs';
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export const GROUP_COLOR_RANGE = [
  { color: '#F867E9', lighterColor: '#FFEAFE' },
  { color: '#42a5f5', lighterColor: 'rgb(206, 244, 255)' },
  { color: '#66bb6a', lighterColor: 'rgb(222, 252, 223)' },
  { color: '#ff7043', lighterColor: 'rgb(255, 232, 221)' },
  { color: '#7e57c2', lighterColor: 'rgb(238, 227, 255)' },
  { color: '#8d6e63', lighterColor: 'rgb(241, 235, 233)' },
  { color: '#78909c', lighterColor: 'rgb(233, 238, 241)' },
  { color: '#26c6da', lighterColor: 'rgb(232, 251, 255)' },
  { color: '#ec407a', lighterColor: 'rgb(255, 232, 242)' },
  { color: '#9ccc65', lighterColor: 'rgb(244, 255, 230)' },
  { color: '#ffca28', lighterColor: 'rgb(255, 249, 215)' },
  { color: '#5c6bc0', lighterColor: 'rgb(235, 237, 254)' },
  { color: '#ab47bc', lighterColor: 'rgb(254, 225, 255)' },
  { color: '#29b6f6', lighterColor: 'rgb(223, 245, 255)' },
  { color: '#ffa726', lighterColor: 'rgb(255, 249, 221)' },
  { color: '#26a69a', lighterColor: 'rgb(219, 249, 245)' },
  { color: '#C1D224', lighterColor: 'rgb(253, 255, 225)' },
  { color: '#ef5350', lighterColor: 'rgb(255, 236, 236)' },
];

export const TABLE_STYLE = {
  width: 'calc(100% - 46px)',
  margin: 'auto',
  tableLayout: 'fixed',
  wordWrap: 'break-word',
  marginBottom: 100,
  borderColor: '1px solid rgb(224, 224, 224)',
};

export const FORM_MESSAGE = (key, scans, classes, onHideModal) =>
  ({
    edit: <FormattedMessage {...messages.resultInfoTitle} />,
    email:
      scans.length === 1 ? (
        <FormattedMessage {...messages.emailForStudent} />
      ) : (
        <FormattedMessage {...messages.emailForStudents} values={{ count: scans.length }} />
      ),
    remove: <FormattedMessage {...messages.delete} />,
    preview: (
      <>
        <FormattedMessage {...messages.studentAnswersSheet} />
        <button className={classes.popup_close_icon} onClick={onHideModal} type="button">
          <IconClosePopup width={15} height={15} />
        </button>
      </>
    ),
  }[key]);
