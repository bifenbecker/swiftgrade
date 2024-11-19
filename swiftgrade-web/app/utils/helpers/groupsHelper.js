import _, { get as lodashGet } from 'lodash';
import { getIcon } from 'components/Svgs/Group';
import {
  amber,
  blue,
  blueGrey,
  brown,
  cyan,
  deepOrange,
  deepPurple,
  green,
  indigo,
  lightBlue,
  lightGreen,
  orange,
  pink,
  purple,
  red,
  teal,
} from '@material-ui/core/colors';
import {
  DISTRIBUTE_GENERIC_AS_POPUP,
  POPUP_CHECKLIST_CREATE_CLASS,
  POPUP_CHECKLIST_DASHBOARD,
  SCAN_GENERIC_AS_POPUP,
  STUDENTS_MUST_FILL_CIRCLES_POPUP,
  TUTORIAL_AFTER_DOWNLOAD_MC_AS,
  TUTORIAL_AFTER_PRINT_MC_SHEETS,
  TUTORIAL_CONGRATULATIONS_DASHBOARD,
  TUTORIAL_CREATE_CLASS,
  TUTORIAL_FIRST_CLASS_DESCRIPTION,
  TUTORIAL_PRINT_MC_SHEETS,
  TUTORIAL_STUDENT_PORTAL,
  TUTORIAL_WELCOME_DASHBOARD_WITH_GROUPS,
  TUTORIAL_WELCOME_DASHBOARD_WITHOUT_GROUPS,
  WELCOME_STUDENT_PORTAL_POPUP,
  POPUP_CHECKLIST_GET_AS,
} from 'globalConstants';
import {
  DISTRIBUTE_GENERIC_AS_TUTORIAL_KEY,
  SCAN_WRITTEN_GENERIC_AS_TUTORIAL_KEY,
  STUDENTS_MUST_FILL_CIRCLES_TUTORIAL_KEY,
} from 'components/Modals/TutorialModal/constants';
import { TUTORIAL_STEPS_DASHBOARD } from 'containers/Groups/GroupsList/config';
import { getEnabledPopups, getEnabledTutorials, isPopupDisplayable } from 'utils/helpers/tutorialHelpers';
import { isTeacher } from 'utils/helpers/usersHelper';
import { getLightColor } from './colorHelpers';

export const COLORS = [
  purple,
  cyan,
  amber,
  lightGreen,
  pink,
  indigo,
  blueGrey,
  brown,
  deepPurple,
  deepOrange,
  green,
  blue,
  '#F867E9',
  red,
  '#C1D224',
  teal,
  orange,
  lightBlue,
];

const cardStyle = (color, withBorder = true) => {
  if (withBorder) {
    const borderColor = getLightColor(color);
    return { background: color, borderBottom: `20px solid ${borderColor}` };
  }
  return { background: color };
};

const getCardIcon = (classes, group) => getIcon(classes.card_icon, group);

const setColorsForGroups = (groups, color) => {
  const colorIndex = color ? COLORS.findIndex(x => (_.isString(x) ? x : x[400]) === color) + 1 : COLORS[0];
  const colorsForGroups = _.concat(_.slice(_.cloneDeep(COLORS), colorIndex % 18, 18), COLORS);

  const data = _.reverse(groups);
  data.map((group, i) => {
    group.color = typeof colorsForGroups[i] === 'string' ? colorsForGroups[i] : colorsForGroups[i][400];
    return group;
  });
  return _.reverse(data);
};

const getAfterGroupCreationTutorial = data => {
  const { enabledPopups, enabledTutorials, history, isModalActive } = data;
  if (
    enabledTutorials[TUTORIAL_WELCOME_DASHBOARD_WITHOUT_GROUPS] &&
    enabledTutorials[TUTORIAL_WELCOME_DASHBOARD_WITH_GROUPS]
  ) {
    return getTutorialConfigData(TUTORIAL_WELCOME_DASHBOARD_WITH_GROUPS, true);
  }
  if (enabledTutorials[TUTORIAL_CREATE_CLASS]) {
    return getTutorialConfigData(TUTORIAL_CREATE_CLASS, false, false); // check groups exist logic
  }
  if (
    !enabledPopups[POPUP_CHECKLIST_CREATE_CLASS] &&
    enabledTutorials[TUTORIAL_FIRST_CLASS_DESCRIPTION] &&
    enabledTutorials[TUTORIAL_CONGRATULATIONS_DASHBOARD] &&
    !isModalActive
  ) {
    return getTutorialConfigData(TUTORIAL_CONGRATULATIONS_DASHBOARD, true, false);
  }
  if (
    !enabledPopups[POPUP_CHECKLIST_CREATE_CLASS] &&
    !enabledTutorials[TUTORIAL_WELCOME_DASHBOARD_WITHOUT_GROUPS] &&
    enabledTutorials[TUTORIAL_FIRST_CLASS_DESCRIPTION] &&
    !enabledTutorials[TUTORIAL_CONGRATULATIONS_DASHBOARD] &&
    !isModalActive
  ) {
    return getTutorialConfigData(TUTORIAL_FIRST_CLASS_DESCRIPTION, true);
  }
  if (enabledTutorials[TUTORIAL_PRINT_MC_SHEETS] && enabledTutorials[TUTORIAL_AFTER_PRINT_MC_SHEETS]) {
    // add this? remove if unnecessary
    // if (!tutorialIsRunning) {
    //   updateState({ tutorialIsRunning: true });
    // }
    return getTutorialConfigData(TUTORIAL_AFTER_PRINT_MC_SHEETS, true, false);
  }
  if (
    !enabledPopups[POPUP_CHECKLIST_GET_AS] &&
    lodashGet(history, 'location.state.generatedGenericSheet') &&
    enabledTutorials[TUTORIAL_AFTER_DOWNLOAD_MC_AS]
  ) {
    return getTutorialConfigData(TUTORIAL_AFTER_DOWNLOAD_MC_AS, true, false);
  }
  return {
    continuous: false,
    tutorialKey: null,
    tutorialSteps: [],
  };
};

const getTutorialConfigData = (tutorialKey, groupsExist, continuous = true) => ({
  continuous,
  tutorialKey,
  tutorialSteps: TUTORIAL_STEPS_DASHBOARD(groupsExist)[tutorialKey],
});

const getTutorialDashboard = props => {
  const { groups, user } = props;
  const groupsExist = groups && groups.length > 0;
  const enabledPopups = getEnabledPopups(user);
  const enabledTutorials = getEnabledTutorials(user);

  if (
    user &&
    user.role === 'student' &&
    enabledTutorials[TUTORIAL_STUDENT_PORTAL] &&
    !enabledPopups[WELCOME_STUDENT_PORTAL_POPUP]
  ) {
    return getTutorialConfigData(TUTORIAL_STUDENT_PORTAL, groupsExist);
  }

  // const isTeacherPopupActive =
  //   // enabledPopups[POPUP_WELCOME_TEACHER] ||
  //   enabledPopups[POPUP_CHECKLIST_DASHBOARD] || isCreateClassChecklistActive(groups, enabledPopups, enabledTutorials);
  const isTeacherPopupActive =
    enabledPopups[POPUP_CHECKLIST_DASHBOARD] || isCreateClassChecklistActive(groups, enabledPopups, enabledTutorials);
  if (isTeacher(user) && _.isArray(groups) && !isTeacherPopupActive) {
    // Uncomment it when the customer will be ready to return this logic
    // if (user && user.role === 'teacher' && !enabledPopups[POPUP_WELCOME_DASHBOARD_VIDEO]) {
    // if (enabledTutorials[TUTORIAL_DASHBOARD_PLAYER_BUTTON]) {
    //   if (!tutorialIsRunning) {
    //     this.setState({ tutorialIsRunning: true });
    //   }
    //   return this.getTutorialConfigData(TUTORIAL_DASHBOARD_PLAYER_BUTTON, false);
    // }
    if (groups.length === 0) {
      if (enabledTutorials[TUTORIAL_WELCOME_DASHBOARD_WITHOUT_GROUPS]) {
        return getTutorialConfigData(TUTORIAL_WELCOME_DASHBOARD_WITHOUT_GROUPS, groupsExist);
      }
      if (enabledTutorials[TUTORIAL_CREATE_CLASS]) {
        return getTutorialConfigData(TUTORIAL_CREATE_CLASS, groupsExist, false);
      }
    }
    if (groups.length > 0) {
      return getAfterGroupCreationTutorial({ enabledPopups, enabledTutorials, ...props });
    }
  }

  return {
    continuous: false,
    tutorialKey: null,
    tutorialSteps: [],
  };
};

const isCreateClassChecklistActive = (groups, enabledPopups, enabledTutorials) =>
  groups &&
  groups.length > 0 &&
  !enabledTutorials[TUTORIAL_CREATE_CLASS] &&
  enabledPopups[POPUP_CHECKLIST_CREATE_CLASS];

const setModalKeys = props => {
  const { popupKey, tutorialModalIsVisible, tutorialModalKey, user, updateState } = props;
  const enabledPopups = lodashGet(user, 'enabled_popups', {});
  const isPopupAvailable = _.some(
    _.filter(enabledPopups, (_itemValue, itemKey) =>
      [DISTRIBUTE_GENERIC_AS_POPUP, STUDENTS_MUST_FILL_CIRCLES_POPUP, SCAN_GENERIC_AS_POPUP].includes(itemKey),
    ),
  );
  if (isPopupAvailable && !tutorialModalIsVisible) {
    let newPopupKey = popupKey;
    let newTutorialModalKey = tutorialModalKey;
    if (_.isNull(popupKey) && isPopupDisplayable(user, DISTRIBUTE_GENERIC_AS_POPUP)) {
      newPopupKey = DISTRIBUTE_GENERIC_AS_POPUP;
      newTutorialModalKey = DISTRIBUTE_GENERIC_AS_TUTORIAL_KEY;
    } else if (popupKey === DISTRIBUTE_GENERIC_AS_POPUP && isPopupDisplayable(user, STUDENTS_MUST_FILL_CIRCLES_POPUP)) {
      newPopupKey = STUDENTS_MUST_FILL_CIRCLES_POPUP;
      newTutorialModalKey = STUDENTS_MUST_FILL_CIRCLES_TUTORIAL_KEY;
    } else if (popupKey === STUDENTS_MUST_FILL_CIRCLES_POPUP && isPopupDisplayable(user, SCAN_GENERIC_AS_POPUP)) {
      newPopupKey = SCAN_GENERIC_AS_POPUP;
      newTutorialModalKey = SCAN_WRITTEN_GENERIC_AS_TUTORIAL_KEY;
    }
    updateState({ tutorialModalIsVisible: true, popupKey: newPopupKey, tutorialModalKey: newTutorialModalKey });
  }
};

export { cardStyle, getCardIcon, setModalKeys, getTutorialDashboard, isCreateClassChecklistActive, setColorsForGroups };
