import React from 'react';
import PropTypes from 'prop-types';
import { Button, withStyles, Tooltip } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { IconContract, IconLaptop } from 'components/Svgs';
import { compose } from 'redux';
import classNames from 'classnames';
import messages from './messages';
import { styles } from './styles';

const BUTTONS = [
  {
    key: 'paper',
    icon: <IconContract />,
    message: <FormattedMessage {...messages.paper} />,
    tooltip: <FormattedMessage {...messages.paperTooltip} />,
  },
  {
    key: 'online',
    icon: <IconLaptop />,
    message: <FormattedMessage {...messages.online} />,
    tooltip: <FormattedMessage {...messages.onlineTooltip} />,
  },
];

class SelectTypeModalView extends React.Component {
  onSelectType = assessmentType => {
    const { formData } = this.props;
    this.props.onCreate(formData, assessmentType);
  };

  renderButton = (btn, classes) => {
    const { key, icon, message, tooltip } = btn;
    return (
      <Button className={classNames(classes.icon_button, key)} onClick={() => this.onSelectType(key)}>
        <Tooltip title={tooltip} arrow placement="right" classes={{ tooltip: classes.customWidth }}>
          <div>
            {icon}
            <div className={classNames(classes.button_text, key)}>{message}</div>
          </div>
        </Tooltip>
      </Button>
    );
  };

  render() {
    const { classes } = this.props;
    return <div className={classes.type_buttons}>{BUTTONS.map(btn => this.renderButton(btn, classes))}</div>;
  }
}

SelectTypeModalView.propTypes = {
  formData: PropTypes.any,
  classes: PropTypes.object,
  onCreate: PropTypes.func,
  // eslint-disable-next-line react/no-unused-prop-types
  tooltip: PropTypes.object,
};

export default compose(withStyles(styles))(SelectTypeModalView);
