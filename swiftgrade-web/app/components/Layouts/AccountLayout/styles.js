import { FONT_SIZE_ICON_CHILD, FONT_SIZE_ICON_MAIN } from 'components/DataDisplay/ExpandableList/config';

export const styles = theme => ({
  account_dropdown: {
    position: 'absolute',
    width: 145,
    right: 30,
    borderRadius: 4,
    overflow: 'hidden',
    marginTop: 5,
    background: 'rgba(0, 0, 0, 0.8)',
    [theme.breakpoints.only('xs')]: {
      '@media (orientation: portrait)': {
        zIndex: 1,
      },
    },
  },
  account_tooltip: {
    color: '#fff',
    textTransform: 'none',
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
  },
  tooltip: {
    background: 'rgba(80, 80, 80, 0.98)',
    opacity: 0.5,
  },
  arrow: {
    color: 'rgba(80, 80, 80, 0.98)',
  },
  account_tooltip_name: {
    fontSize: 13,
    fontWeight: 300,
  },
  account_tooltip_role: {
    fontSize: 11,
    color: 'rgb(185, 184, 184)',
    fontWeight: 300,
  },
  icon_logged_user: {
    padding: '6px 0',
    margin: 'auto',
    width: 30,
    height: 30,
    minWidth: 30,
    borderRadius: '50%',
    border: '1px solid #000',
    fontWeight: 'bold',
    fontSize: 14,
  },
  item_icon: {
    '& svg': {
      width: 12,
      height: 12,
      marginLeft: 4,
    },
  },
  hidden: {
    display: 'none',
  },
  profile_icon_container: {
    [theme.breakpoints.only('xs')]: {
      margin: '0 10px 0 5px',
    },
  },
  icon: {
    color: '#fff',
  },
  iconMainList: { fontSize: FONT_SIZE_ICON_MAIN },
  iconFromDropdownList: { fontSize: FONT_SIZE_ICON_CHILD },
});
