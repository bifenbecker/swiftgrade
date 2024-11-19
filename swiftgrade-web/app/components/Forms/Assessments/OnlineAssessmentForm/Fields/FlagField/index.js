import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { withStyles, Tooltip } from '@material-ui/core';
import { IconFlag } from 'components/Svgs';
import { styles } from './styles';
import messages from '../../messages';

class FlagField extends React.Component {
  onChange = value => {
    const { input } = this.props;
    input.onChange(value);
  };

  render() {
    const { classes, input } = this.props;
    const { value } = input;
    return (
      <Tooltip title={<FormattedMessage {...messages.flag} />}>
        <div
          className={classes.flag_container}
          role="button"
          tabIndex={-1}
          onBlur={() => input.onBlur()}
          onClick={() => this.onChange(!value)}
        >
          <IconFlag className={classNames(classes.flag_icon, { checked: value })} />
        </div>
      </Tooltip>
    );
  }
}

FlagField.propTypes = {
  classes: PropTypes.object,
  input: PropTypes.object,
};

export default withStyles(styles)(FlagField);
