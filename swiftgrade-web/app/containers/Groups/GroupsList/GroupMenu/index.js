import React from 'react';
import PropTypes from 'prop-types';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { ClickAwayListener, IconButton, MenuItem, MenuList, Popper, Paper } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { OPTIONS } from './constants';
import { styles } from './styles';

function GroupMenu(props) {
  const [open, setOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { classes, group, onChange } = props;

  const handleClick = event => {
    setOpen(prevOpen => !prevOpen);
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        aria-label="more"
        className={classes.icon_card_button}
        onClick={handleClick}
      >
        <MoreVertIcon id={`groups-card-menu-button-${group.id}`} style={{ fill: '#fff' }} />
      </IconButton>
      <Popper
        open={open}
        anchorEl={anchorEl}
        role={undefined}
        className={classes.simple_menu}
        modifiers={{
          preventOverflow: {
            enabled: false,
          },
        }}
      >
        <Paper className={classes.dropdown_group_list}>
          <ClickAwayListener onClickAway={handleClose}>
            <MenuList autoFocusItem={open} id="menu-list-grow">
              {OPTIONS.map(opt => (
                <MenuItem
                  key={opt.key}
                  item
                  onClick={() => {
                    onChange(opt.key, group);
                    handleClose();
                  }}
                  className={classes.dropdown_group_item}
                >
                  {opt.label}
                </MenuItem>
              ))}
            </MenuList>
          </ClickAwayListener>
        </Paper>
      </Popper>
    </div>
  );
}

GroupMenu.propTypes = {
  classes: PropTypes.object,
  group: PropTypes.object,
  onChange: PropTypes.func,
};

export default withStyles(styles)(GroupMenu);
