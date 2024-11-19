import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { IconClose } from 'components/Svgs';

import messages from './messages';
import { styles } from './styles';

const CustomTooltip = ({
  backProps,
  classes,
  closeProps,
  continuous,
  index,
  primaryProps,
  size,
  skipProps,
  step: { content, locale, stepStyle },
  tooltipProps,
}) => {
  const renderContiniousBottomContent = () => (
    <>
      <div className={classes.joyride_custom_tooltip_buttons_third_block}>
        {index > 0 && (
          <Button className={classes.joyride_custom_tooltip_back_button} {...backProps}>
            {locale.back}
          </Button>
        )}
      </div>
      <div className={classes.joyride_custom_tooltip_buttons_third_block}>
        <div>
          <FormattedMessage
            {...messages.tutorialProgressMessage}
            values={{
              stepNumber: index + 1,
              totalSteps: size,
            }}
          />
        </div>
      </div>
      <div className={classes.joyride_custom_tooltip_buttons_third_block}>
        <Button className={classes.joyride_custom_tooltip_next_button} {...primaryProps}>
          {index + 1 === size ? locale.last : locale.next}
        </Button>
      </div>
    </>
  );

  const renderCrossButton = () => (
    <div className={classes.cross_button}>
      <IconClose className={classes.cross_button_icon} {...skipProps} />
    </div>
  );

  const renderFooter = () => (
    <div className={classes.joyride_custom_tooltip_buttons}>
      {continuous ? (
        renderContiniousBottomContent()
      ) : (
        <Button className={classes.joyride_custom_tooltip_close_button} {...closeProps}>
          {locale.close}
        </Button>
      )}
    </div>
  );

  return (
    <div className={classes.joyride_custom_tooltip} style={stepStyle} {...tooltipProps}>
      {continuous && renderCrossButton()}
      <div className={classes.joyride_custom_tooltip_content}>{content}</div>
      {renderFooter()}
    </div>
  );
};

CustomTooltip.propTypes = {
  backProps: PropTypes.object,
  classes: PropTypes.object,
  closeProps: PropTypes.object,
  continuous: PropTypes.object,
  index: PropTypes.number,
  primaryProps: PropTypes.object,
  size: PropTypes.number,
  skipProps: PropTypes.object,
  step: PropTypes.object,
  tooltipProps: PropTypes.object,
};

export default withStyles(styles)(CustomTooltip);
