import React from 'react';
import { createContextMenuComponent } from 'react-datasheet-grid';
import { FormattedMessage } from 'react-intl';
import messages from '../messages';

const ITEM_TYPE_MAPPINGS = {
  INSERT_ROW_BELLOW: messages.instertRowBelow,
  DUPLICATE_ROW: messages.duplicateRow,
  DUPLICATE_ROWS: messages.duplicateRows,
  COPY: messages.copy,
  CUT: messages.cut,
  PASTE: messages.paste,
};

export const contextMenu = tableData =>
  createContextMenuComponent(item => {
    const message = ITEM_TYPE_MAPPINGS[item.type];

    if (message) {
      return (
        <>
          <FormattedMessage {...message} />
        </>
      );
    }

    if (item.type === 'DELETE_ROW' && tableData.length > 5) {
      return (
        <>
          <FormattedMessage {...messages.deleteRow} />
        </>
      );
    }

    return null;
  });
