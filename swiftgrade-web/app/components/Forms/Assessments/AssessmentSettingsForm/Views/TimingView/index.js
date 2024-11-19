import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import IconClock from 'components/Svgs/IconClock';
import { MUCheckbox } from 'components/Controls';
import { CustomSelectField, InputField } from 'components/Fields';
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import { Field } from 'redux-form/immutable';
import classNames from 'classnames';
import { isValidIntegerSymbol } from 'utils/helpers/assessments/validation';
import { styles } from '../../styles';
import messages from '../../messages';
import { TIMER_UNIT_OPTIONS } from '../../const';

class TimingView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: true,
    };
  }

  onBlur = () => {
    const { setFormValue, timerValue } = this.props;
    if (parseInt(timerValue, 10) > 240) {
      setFormValue('timer_value', '240');
    }
  };

  onKeyDown = e => {
    const enabledKeys = ['Delete', 'ArrowLeft', 'ArrowRight', 'Backspace'];
    if (!isValidIntegerSymbol(e.key) && !enabledKeys.includes(e.key) && !(e.metaKey || e.ctrlKey)) {
      e.preventDefault();
      return false;
    }
  };

  onPaste = e => {
    const clipboardData = e.clipboardData.getData('text');
    if (!isValidIntegerSymbol(clipboardData)) {
      e.preventDefault();
      return false;
    }
  };

  onChange = e => {
    const { setFormValue } = this.props;
    const { checked } = e.target;
    this.setState({ checked });
    setFormValue('timer_value', checked ? '60' : null);
    setFormValue('timer_unit', checked ? 'minutes' : null);
  };

  renderCheckbox = (classes, checked) => {
    const { intl } = this.props;
    return (
      <MUCheckbox
        checkboxClasses={{ label: { label: classes.checkbox_label, root: classes.checkbox_root } }}
        checked={checked}
        label={intl.formatMessage(checked ? messages.timer : messages.noLimit)}
        onChange={e => this.onChange(e)}
      />
    );
  };

  renderTimerFields = () => {
    const { classes } = this.props;
    const { checked } = this.state;
    if (!checked) {
      return null;
    }
    return (
      <div className={classes.timer_fields}>
        <div className={classes.timer_field}>
          <Field
            autoSelect
            component={InputField}
            name="timer_value"
            customClasses={{ root: classes.timer_value_root, input: classes.timer_value_input }}
            customErrorClass={classNames(classes.error_input, 'timer_field')}
            onBlur={() => this.onBlur()}
            onKeyDown={e => this.onKeyDown(e)}
            onPaste={e => this.onPaste(e)}
          />
        </div>
        <div className={classes.timer_field}>
          <Field
            component={CustomSelectField}
            name="timer_unit"
            options={TIMER_UNIT_OPTIONS}
            selectClasses={{ root: classes.timer_unit_root }}
          />
        </div>
        <IconClock className={classes.clock_icon} />
      </div>
    );
  };

  render() {
    const { classes } = this.props;
    const { checked } = this.state;
    return (
      <div className={classes.timer_container}>
        {this.renderCheckbox(classes, checked)}
        {this.renderTimerFields()}
      </div>
    );
  }
}

TimingView.propTypes = {
  classes: PropTypes.object,
  intl: PropTypes.object,
  setFormValue: PropTypes.func,
  timerValue: PropTypes.string,
};

export default compose(
  injectIntl,
  withStyles(styles),
)(TimingView);
