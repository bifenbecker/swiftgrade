import _, { get as lodashGet } from 'lodash';
import { getEnabledPulseButtons } from './tutorialHelpers';
const NUMBER_REGEX = /^[-]?[0-9]*[.]?[0-9]*$/;
const DECIMAL_REGEX = /^[-]?[0-9]*\.[0-9]*$/;

export const isNumber = n => !_.isNull(n.match(NUMBER_REGEX));
export const isDecimal = n => !_.isNull(n.match(DECIMAL_REGEX));

export const updatePulseButtons = (user, updateUser, key, value = false, handleSuccess = null) => {
  /**
   * Update enabled_pulse_buttons in User model with request on backend
   *
   * user - User object from redux store
   * updateUser - function updateCurrentUserRequest from containers/App/actions
   * key - button key in dictionary enabled_pulse_buttons
   * value - true or false
   */
  const enabledPulseButtons = getEnabledPulseButtons(user);

  if (_.has(enabledPulseButtons, key) && enabledPulseButtons[key] !== value) {
    enabledPulseButtons[key] = value;
    updateUser({
      data: { enabled_pulse_buttons: enabledPulseButtons },
      userId: user.id,
      handleSuccess,
    });
  }
};

export const getPulseButtonValue = (user, key) => lodashGet(getEnabledPulseButtons(user), key, null);
