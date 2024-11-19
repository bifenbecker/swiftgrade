import { get as lodashGet, isUndefined as lodashIsUndefined } from 'lodash';

const checkIfExists = (data, key, acceptUndefined) => {
  const itemStatus = lodashGet(data, key);
  return acceptUndefined && lodashIsUndefined(itemStatus) ? true : itemStatus === true;
};

const getEnabledPopups = user => lodashGet(user, 'enabled_popups', {});

const getEnabledTutorials = user => lodashGet(user, 'enabled_tutorials', {});

const getEnabledPulseButtons = user => lodashGet(user, 'enabled_pulse_buttons', {});

const isPopupDisplayable = (userData, popupKey, acceptUndefined = true) =>
  checkIfExists(userData, `enabled_popups.${popupKey}`, acceptUndefined);

const isTutorialDisplayable = (userData, tutorialKey, acceptUndefined = true) =>
  checkIfExists(userData, `enabled_tutorials.${tutorialKey}`, acceptUndefined);

export { getEnabledPopups, getEnabledTutorials, isPopupDisplayable, isTutorialDisplayable, getEnabledPulseButtons };
