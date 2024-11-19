import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles, Tooltip } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import messages from './messages';
import { styles } from './styles';

function ActionIcon(props) {
  const { classes, icon, id, style, onChange } = props;
  const Icon = icon;
  const tooltiptext = <FormattedMessage {...messages.title} />;

  return (
    <div>
      <Tooltip title={tooltiptext} arrow placement="right">
        <div
          id={id}
          className={classes.select_icon_wrapper}
          role="button"
          tabIndex="0"
          onClick={e => {
            e.stopPropagation();
            e.nativeEvent.stopImmediatePropagation();
            onChange();
          }}
        >
          <div className={classNames(classes.icon, 'select')}>
            <div className={classes.select_icon} style={style.select_icon}>
              <Icon className={classes.select_icon_content} style={style.select_icon_content} />
            </div>
          </div>
        </div>
      </Tooltip>
    </div>
  );
}

ActionIcon.propTypes = {
  classes: PropTypes.object.isRequired,
  icon: PropTypes.object,
  id: PropTypes.string,
  style: PropTypes.object,
  onChange: PropTypes.func,
};

export default withStyles(styles)(ActionIcon);
