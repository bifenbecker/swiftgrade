import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Popover as MaterialPopover, Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: theme.spacing(1.5),
    fontSize: 14,
    background: '#000',
    color: '#fff',
    borderRadius: 4,
    textShadow: 'none',
    lineHeight: '1.1em',
    pointerEvents: 'all',
    textAlign: 'center',
  },
});

class Popover extends React.Component {
  state = {
    anchorEl: null,
  };

  handlePopoverOpen = e => {
    this.setState({ anchorEl: e.currentTarget });
  };

  handlePopoverClose = () => {
    this.setState({ anchorEl: null });
  };

  renderPopover = (anchorEl, open) => {
    const { anchorOrigin, classes, transformOrigin, popoverBody } = this.props;
    return (
      <MaterialPopover
        id="mouse-over-popover"
        className={classes.popover}
        classes={{
          paper: classes.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={anchorOrigin}
        transformOrigin={transformOrigin}
        onClose={this.handlePopoverClose}
        disableRestoreFocus
      >
        {popoverBody}
      </MaterialPopover>
    );
  };

  render() {
    const { body } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <Fragment>
        <Typography
          aria-owns={open ? 'mouse-over-popover' : undefined}
          aria-haspopup
          onMouseEnter={this.handlePopoverOpen}
          onMouseLeave={this.handlePopoverClose}
        >
          {body}
        </Typography>
        {this.renderPopover(anchorEl, open)}
      </Fragment>
    );
  }
}

Popover.propTypes = {
  anchorOrigin: PropTypes.object,
  body: PropTypes.object,
  classes: PropTypes.object,
  popoverBody: PropTypes.object,
  transformOrigin: PropTypes.object,
};

Popover.defaultProps = {
  anchorOrigin: {
    vertical: 'center',
    horizontal: 'left',
  },
  body: <div>Popover title</div>,
  popoverBody: <div>Popover body</div>,
  transformOrigin: {
    vertical: 'center',
    horizontal: 'right',
  },
};

export default withStyles(styles)(Popover);
