import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles, Tooltip } from '@material-ui/core';
import { Field } from 'redux-form/immutable';
import { MUCheckbox } from 'components/Controls';
import { CheckboxField } from 'components/Fields';
import { PasswordField } from 'components/Forms/Users/Fields';
import { IconInfoQuestion, IconTextBoxClosed, IconTextBoxOpened } from 'components/Svgs';
import { ASSESSMENTS_SETTINGS_ANTI_CHEATING_ID } from 'globalConstants';

import messages from '../../messages';
import { styles } from '../../styles';

class SecurityView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  onChange = e => {
    const { setFormValue } = this.props;
    const { checked } = e.target;

    this.setState({ checked });
    // if (!checked && password) {
    //   setFormValue('password', null);
    // }
    setFormValue('password', checked ? '' : null);
  };

  renderAntiCheatingMode = () => {
    const { isAntiCheatingModeChecked, classes } = this.props;
    const color = isAntiCheatingModeChecked ? 'rgba(0, 0, 0, 0.54)' : '#000';
    const Icon = isAntiCheatingModeChecked ? IconTextBoxClosed : IconTextBoxOpened;
    const label = (
      <div className={classes.releaseResults}>
        <FormattedMessage {...messages.hideStudentAnswers} />
        <Icon className={classes.text_box_icon} color={color} />
      </div>
    );
    return (
      <div className={classes.anti_cheating_mode_container}>
        <Field
          checkboxClasses={{ label: { label: classes.checkbox_label } }}
          component={CheckboxField}
          label={label}
          name="is_anti_cheating_mode_checked"
        />
        <Tooltip
          classes={{ tooltip: classes.tooltip }}
          placement="right"
          arrow
          title={this.renderAntiCheatingTooltipContent(classes)}
        >
          <div className={classes.anti_cheating_tooltip_container}>
            <IconInfoQuestion className={classes.anti_cheating_tooltip} />
          </div>
        </Tooltip>
      </div>
    );
  };

  renderAntiCheatingTooltipContent = classes => (
    <div className={classes.anti_cheating_tooltip_content}>
      {/* <span className={classes.anti_cheating_tooltip_content_item}> */}
      <FormattedMessage {...messages.hideStudentAnswersTooltipOne} />
      <br />
      <br />
      {/* </span>
      
      <span className={classes.anti_cheating_tooltip_content_item}> */}
      <FormattedMessage {...messages.hideStudentAnswersTooltipTwo} />
      {/* </span> */}
    </div>
  );

  renderCheckbox = () => {
    const { checked } = this.state;
    const { classes } = this.props;
    return (
      <MUCheckbox
        checkboxClasses={{ label: { label: classes.checkbox_label, root: classes.password_checkbox_root } }}
        checked={checked}
        label={checked ? null : <FormattedMessage {...messages.noPasswordRequired} />}
        onChange={e => this.onChange(e)}
      />
    );
  };

  renderPassword = () => {
    const { checked } = this.state;
    const { classes, password, onEnter } = this.props;
    if (!checked) {
      return null;
    }
    return (
      <div>
        <PasswordField
          autoComplete="new-password"
          password={password}
          customClasses={{ root: classes.password_root, input: classes.password_input }}
          customErrorClass={classes.error_input}
          onEnter={onEnter}
        />
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    return (
      <div id={ASSESSMENTS_SETTINGS_ANTI_CHEATING_ID} className={classes.setting_block_container}>
        {this.renderAntiCheatingMode()}
        <div className={classes.password_container}>
          {this.renderCheckbox()}
          {this.renderPassword()}
        </div>
      </div>
    );
  }
}

SecurityView.propTypes = {
  classes: PropTypes.object,
  isAntiCheatingModeChecked: PropTypes.bool,
  password: PropTypes.string,
  setFormValue: PropTypes.func,
  onEnter: PropTypes.func,
};

export default withStyles(styles)(SecurityView);
