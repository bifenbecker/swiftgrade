import { HEADER_ICON_CONTAINER } from '../../commonStyles';

export const styles = theme => ({
  app_bar: {
    display: 'flex',
    flexFlow: 'row',
  },
  header: {
    width: '100%',
    height: theme.spacing(10),
    minWidth: 500,
    '&.isMobilePortrait': {
      minWidth: 230,
      height: theme.spacing(11.25),
      '@media (max-width: 345px)': {
        minWidth: 210,
      },
    },
  },
  preview_header: {
    width: '100%',
    height: theme.spacing(8.5),
    '@media (max-width: 600px)': {
      width: '75%',
      '&.tipsLoading': {
        width: '65%',
      },
    },
  },
  popup_close_icon: {
    position: 'absolute',
    background: 'transparent',
    border: 'none',
    right: 6,
    top: 11,
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '50%',
    },
  },
  header_item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    marginLeft: theme.spacing(3.5),
    '@media (max-width: 768px)': {
      marginLeft: theme.spacing(1.5),
    },
  },
  header_group_name: {
    fontSize: 20,
    '@media (max-width: 600px)': {
      fontSize: 15,
      width: '90%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
  },
  helper_icon: {
    display: 'flex',
    alignSelf: 'flex-end',
    height: 'max-content',
    marginRight: '50px',
    marginBottom: '5px',
    '@media (max-width: 600px)': {
      marginRight: '20px',
    },
  },
  whatsapp_icon: {
    display: 'flex',
    alignSelf: 'flex-end',
    height: 'max-content',
    marginRight: '50px',
    marginBottom: '5px',
    '&.isMobilePortrait': {
      marginRight: '20px',
    },
  },
  back_icon: {
    cursor: 'pointer',
    outline: 'none !important',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '50%',
    },
  },
  account_item: {
    textAlign: 'right',
  },
  account_icon: {
    color: 'white',
    fontSize: 35,
    marginBottom: theme.spacing(1.8),
    marginRight: theme.spacing(2.5),
    width: theme.spacing(4),
    height: theme.spacing(4),
  },
  accuracy_tips_container: {
    ...HEADER_ICON_CONTAINER,
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '4px',
    },
  },
  loading: {
    marginTop: '10px',
    marginRight: '10px',
  },
  tooltip_follow_pdf_instructions: {
    fontSize: '11px',
    background: 'rgba(80, 80, 80, 0.95)',
    opacity: 0.5,
    textAlign: 'center',
  },
  shortcutsTitle: {
    fontSize: '16px',
  },
  shortcutsBody: {
    fontSize: '14px',
    '& img': {
      paddingTop: 10,
      paddingBottom: 10,
      width: '-webkit-fill-available',
    },
  },
  shortcutBodyTitle: {
    paddingLeft: 30,
  },
  shortcutBodyImageTitle: {
    paddingLeft: 30,
    color: '#435E93',
    textDecoration: 'underline',
  },
  shortcutButton: {
    paddingTop: 10,
    float: 'right',
  },
  help_articles_icon: {
    width: 21,
    height: 21,
    marginRight: 3,
  },
  right_arrow_icon: {
    width: 21,
    height: 21,
    marginRight: 2,
  },
  settings_help_modal_points: {
    padding: 10,
  },
  gotit_btn_container: {
    marginTop: 20,
    textAlign: 'end',
  },
  gotit_button: {
    borderRadius: 4,
    backgroundColor: 'transparent',
    boxShadow: 'none',
    width: 'max-content',
    textTransform: 'none',

    '&:hover': {
      backgroundColor: 'transparent',
      boxShadow: 'none',
    },

    '&.Mui-disabled': {
      backgroundColor: 'transparent',
    },
    '&.MuiButton-root:hover': {
      textDecoration: 'none',
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
});
