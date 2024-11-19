export const styles = theme => ({
  wrapper_component: {
    padding: 0,
    margin: 0,
    display: 'flex',
    justifyContent: 'space-between',
  },
  component_left: {
    padding: '30px 20px 20px',
    maxWidth: '70vw',
    width: '100%',
    height: 'calc(100vh - 80px)',
    overflowY: 'auto',
    scrollbarWidth: 'none',
    margin: '0 auto',
    '&.student_account': {
      paddingTop: '95px',
    },
    '&::-webkit-scrollbar': {
      width: 0,
    },
  },
  welcome_title: {
    fontSize: 32,
    fontWeight: 'normal',
    lineHeight: '40px',
    color: '#273240',
    fontFamily: 'Segoe UI,Optima,Arial,sans-serif',
  },
  welcome_subtitle: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: '24px',
    color: '#6f7782',
    marginTop: 16,
  },
  line: {
    border: '1px solid #e0e6e8',
    marginBottom: 40,
  },
  component_right: {
    maxWidth: '25vw',
    width: '20%',
    height: '100vh',
    background:
      'linear-gradient(180deg, ' +
      'rgba(15, 128, 194, 1) 0%, ' +
      'rgba(44, 163, 219, 1) 17%, ' +
      'rgba(99, 193, 165, 1) 52%, ' +
      'rgba(104, 188, 127, 1) 81%, ' +
      'rgba(91, 152, 97, 1) 100%, ' +
      'rgba(243, 157, 120, 1) 100%)',
    '&.student_account': {
      background:
        'linear-gradient(155deg, ' +
        'rgba(34, 199, 253, 0.9) 22%, ' + // 25
        'rgba(79, 98, 252, 0.9) 60%, ' + // 65
        'rgba(134, 11, 252, 0.85) 100%)',
    },
  },

  header_account: {
    background: 'white',
    position: 'relative',
    height: 65,
    boxShadow: '0px 2px 6px #bbb',
  },
  account_icon: {
    width: theme.spacing(3.2),
    height: theme.spacing(3.2),
  },
  icon_button: {
    margin: 0,
  },
  header_account_container: {
    '&.MuiGrid-container': {
      width: '100%',
      height: '100%',
      display: 'flex',
      padding: '0px 20px 0px 16px',
    },
  },
  header_account_title_text: {
    marginLeft: 10,
    fontSize: 20,
  },
  back_icon_account: {
    cursor: 'pointer',
    '&:focus': {
      outline: 'none',
    },
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '50%',
    },
  },
  tabs_title: {
    maxWidth: 270,
    width: '100%',
    margin: '0 auto 17px',
    '& .MuiTabs-flexContainer': {
      justifyContent: 'center',
    },
    '& span': {
      textTransform: 'uppercase',
      fontFamily: 'Arial, sans-serif',
      fontSize: 14,
      color: '#203046',
      '&:hover': {
        position: 'relative',
        '&:after': {
          position: 'absolute',
          content: '""',
          height: 3,
          width: '80%',
          background: ' #00a2e8',
          opacity: 0.5,
          bottom: -2,
          left: 0,
          right: 0,
          margin: 'auto',
          [theme.breakpoints.up('sm')]: {
            width: '50%',
          },
        },
      },
    },
  },
  tabs_title_item: {
    minWidth: 125,
    opacity: 1,
    paddingLeft: 0,
    paddingRight: 0,
    '@media (max-width: 550px)': {
      minWidth: 80,
    },
  },
  tab_selected: {
    '& span': {
      position: 'relative',
      '&:after': {
        position: 'absolute',
        content: '""',
        height: 3,
        width: '80%',
        background: ' #00a2e8',
        bottom: -2,
        left: 0,
        right: 0,
        margin: 'auto',
        [theme.breakpoints.up('sm')]: {
          width: '50%',
        },
      },
      '&:hover': {
        '&:after': {
          opacity: 1,
        },
      },
    },
    '&:last-child span:after': {
      width: '55%',
      [theme.breakpoints.up('sm')]: {
        width: '36%',
      },
    },
  },
});
