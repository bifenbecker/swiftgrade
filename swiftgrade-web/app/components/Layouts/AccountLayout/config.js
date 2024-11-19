import MenuItemType from 'components/DataDisplay/ExpandableList/MenuItemType';

// Icons
import { ArrowDropDown, OpenInNew } from '@material-ui/icons';

import messages from './messages';

export const GET_STUDENT_MENU_ITEMS = (history, classes) => [
  new MenuItemType({
    icon: null,
    iconClasses: [],
    message: messages.myAccount,
    onClick: () => history.push('/account/'),
  }),
  new MenuItemType({
    icon: null,
    iconClasses: [classes.icon, classes.iconMainList],
    message: messages.help,
    onClick: () => window.open(process.env.HELP_PAGE_URL),
  }),
  new MenuItemType({
    icon: null,
    iconClasses: [],
    message: messages.logout,
    onClick: () => {
      localStorage.clear();
      window.location.replace(process.env.HOME_PAGE_URL);
    },
  }),
];

export const GET_TEACHER_MENU_ITEMS = (history, classes) => [
  new MenuItemType({
    icon: null,
    iconClasses: [],
    message: messages.myAccount,
    onClick: () => history.push('/account/'),
  }),
  new MenuItemType({
    icon: ArrowDropDown,
    iconClasses: [classes.icon, classes.iconMainList],
    message: messages.helpCenter,
    dropDownList: [
      new MenuItemType({
        icon: OpenInNew,
        iconClasses: [classes.icon, classes.iconFromDropdownList],
        message: messages.quickStartVideos,
        onClick: () => window.open(process.env.QUICKSTART_VIDEOS_PAGE_URL),
      }),
      new MenuItemType({
        icon: OpenInNew,
        iconClasses: [classes.icon, classes.iconFromDropdownList],
        message: messages.whatsapp,
        onClick: () => window.open(process.env.WHATSAPP_PAGE_URL),
      }),
      new MenuItemType({
        icon: OpenInNew,
        iconClasses: [classes.icon, classes.iconFromDropdownList],
        message: messages.helpCenter,
        onClick: () => window.open(process.env.HELP_PAGE_URL),
      }),
    ],
  }),
  new MenuItemType({
    icon: null,
    iconClasses: [],
    message: messages.logout,
    onClick: () => {
      localStorage.clear();
      window.location.replace(process.env.HOME_PAGE_URL);
    },
  }),
];
