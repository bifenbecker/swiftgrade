import React from 'react';
import PropTypes from 'prop-types';

// Mui components
import { List } from '@material-ui/core';

// Components
import ExpandableListItem from './ExpandableListItem';

/**
 * Mui list that have logic of expandable list
 * @param {items, setCountItems, backgroundColor} props
 * @returns {React.ReactElement} Expandable list of items
 */
const ExpandableList = props => {
  const { items, listStyles } = props;

  return (
    /**
     * Recursion generations of nested list of lists if menu items have drop down items from config
     */
    <List style={listStyles}>
      {items.map(item =>
        item.isHaveDropDownList() ? (
          <ExpandableListItem item={item}>
            <ExpandableList listStyles={{ background: 'rgba(0, 0, 0, 0.5)' }} items={item.dropDownList} />
          </ExpandableListItem>
        ) : (
          <ExpandableListItem item={item} />
        ),
      )}
    </List>
  );
};

ExpandableList.propTypes = {
  items: PropTypes.array,
  listStyles: PropTypes.object,
};

export default ExpandableList;
