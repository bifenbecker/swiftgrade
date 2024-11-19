import React from 'react';
import PropTypes from 'prop-types';

// Mui components
import { Collapse, ListItem, Grid } from '@material-ui/core';

// Components
import MenuItem from '../MenuItem';

// Styles
import { useStyles } from './styles';

/**
 * Item of ExpandableList that show drop down list of additional items
 * Logic of showing drop down onHover event default
 * @param {children, item, itemKey} props
 * @returns {React.ReactElement} Expandable list item
 */
const ExpandableListItem = props => {
  const { children, item } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleOpen = () => {
    if (item.dropDownList) {
      setOpen(true);
    }
  };

  const handleClose = () => {
    if (item.dropDownList) {
      setOpen(false);
    }
  };

  const handleOnClick = event => {
    event.stopPropagation();

    if (open) {
      handleClose();
    } else {
      handleOpen();
    }
    if (typeof item.onClick === 'function') {
      item.onClick();
    }
  };

  return (
    <ListItem id={item.key} key={item.key} className={open ? classes.modal_option : classes.drop_down_child}>
      <Grid container direction="column">
        <Grid item onClick={handleOnClick} className={classes.itemWrapper}>
          <MenuItem item={item} open={open} />
        </Grid>
        {children && (
          <Grid item>
            {React.isValidElement(children) ? (
              <Collapse in={open} timeout="auto">
                {children}
              </Collapse>
            ) : (
              { children }
            )}
          </Grid>
        )}
      </Grid>
    </ListItem>
  );
};

ExpandableListItem.propTypes = {
  children: PropTypes.any,
  item: PropTypes.object,
};

export default ExpandableListItem;
