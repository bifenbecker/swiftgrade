/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import { Fab } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { IconClose, IconFilter, IconReset } from 'components/Svgs';
import DoneIcon from '@material-ui/icons/Done';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

const DATA = {
  filter: {
    icon: IconFilter,
    message: messages.filters,
  },
  close: {
    icon: IconClose,
    message: messages.close,
  },
  apply: {
    icon: DoneIcon,
    message: messages.apply,
  },
  reset: {
    icon: IconReset,
    message: messages.reset,
  },
};

function FilterButton(props) {
  const { classes, color, count, isFiltered, type, onChange, isResultsFiltersPulse } = props;
  const data = DATA[type];
  const Icon = data.icon;

  let item = (
    <div className={classes.icon_wrapper} style={{ background: color, border: `2px solid ${color}` }}>
      <Icon className={classNames(classes.icon, { filter: type === 'filter' })} />
    </div>
  );

  if (type === 'filter' && isFiltered && count !== 0) {
    item = (
      <div
        className={classes.icon_wrapper}
        style={{ color: 'white', background: color, border: `2px solid ${color}`, fontSize: 15 }}
      >
        {count}
      </div>
    );
  }

  return (
    <Fab
      classes={{ extended: classes.extended }}
      className={isResultsFiltersPulse ? classes.pulse : null}
      variant="extended"
      onClick={onChange}
    >
      <div className={classes.label} style={{ color }}>
        <FormattedMessage {...data.message} />
      </div>
      {item}
    </Fab>
  );
}

FilterButton.propTypes = {
  isFiltered: PropTypes.bool,
  count: PropTypes.number,
  type: PropTypes.string,
  color: PropTypes.string,
  classes: PropTypes.object,
  onChange: PropTypes.func,
  isResultsFiltersPulse: PropTypes.bool,
};

FilterButton.defaultProps = {
  count: 0,
  isFiltered: false,
  type: 'filter',
};

export default withStyles(styles)(FilterButton);
