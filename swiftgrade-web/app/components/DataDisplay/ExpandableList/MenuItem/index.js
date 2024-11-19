import React from 'react';
import PropTypes from 'prop-types';

import { FormattedMessage } from 'react-intl';

// Mui components
import { Tooltip, Grid } from '@material-ui/core';

// Styles
import { useStyles } from './styles';

/**
 * Menu item - text and icon of option from modal help menu
 * @param {item, icon} props
 * @returns {React.ReactElement} Menu item
 */
const MenuItem = props => {
  const { item, open } = props;
  const Icon = open ? item.activeIcon || item.icon : item.icon;
  const classes = useStyles();

  const Item = (
    <Grid container justify="space-between" alignItems="center" wrap="nowrap">
      <Grid item className={classes.titleContainer}>
        <FormattedMessage {...item.message} />
      </Grid>
      {Icon && (
        <Grid item>
          <Icon className={item.iconClasses} color="primary" />
        </Grid>
      )}
    </Grid>
  );

  const TooltipItem = (
    <Tooltip title={<FormattedMessage {...item.tooltipMessage} />} arrow placement="bottom">
      {Item}
    </Tooltip>
  );

  return item.tooltipMessage ? TooltipItem : Item;
};

MenuItem.propTypes = {
  item: PropTypes.object,
  open: PropTypes.bool,
};

MenuItem.defaultProps = {
  open: false,
};

export default MenuItem;
