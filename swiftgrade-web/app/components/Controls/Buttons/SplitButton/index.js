import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { ButtonGroup, Button, Grow, Paper, Popper, MenuItem, MenuList, ClickAwayListener } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import DefaultButton from '../DefaultButton';

function SplitButton(props) {
  const { options, backgroundColor } = props;

  const [open, setOpen] = useState(false);
  const anchorRef = useRef(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const handleMenuItemClick = (event, index) => {
    setSelectedIndex(index);
    setOpen(false);
  };

  const handleToggle = () => {
    setOpen(prevOpen => !prevOpen);
  };

  const handleClose = event => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  return (
    <React.Fragment>
      <ButtonGroup variant="contained" ref={anchorRef} aria-label="split button">
        <DefaultButton
          backgroundColor={backgroundColor}
          borderRadius={4}
          onClick={options[selectedIndex].onClick}
          text={options[selectedIndex].title}
        />
        <Button
          size="small"
          aria-controls={open ? 'split-button-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-label="select merge strategy"
          aria-haspopup="menu"
          onClick={handleToggle}
          style={{
            color: 'rgb(250, 250, 250)',
            fontSize: '14px',
            textTransform: 'none',
            backgroundColor,
          }}
        >
          <ArrowDropDownIcon style={{ transform: open && 'rotate(180deg)' }} />
        </Button>
      </ButtonGroup>
      <Popper sx={{ zIndex: 1 }} open={open} anchorEl={anchorRef.current} role={undefined} transition disablePortal>
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList id="split-button-menu" autoFocusItem>
                  {options.map((option, index) => (
                    <MenuItem
                      key={option.title}
                      selected={index === selectedIndex}
                      onClick={event => handleMenuItemClick(event, index)}
                    >
                      {option.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </React.Fragment>
  );
}

SplitButton.propTypes = {
  options: PropTypes.array,
  backgroundColor: PropTypes.string,
};

export default SplitButton;
