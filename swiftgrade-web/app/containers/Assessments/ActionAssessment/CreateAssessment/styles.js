export const styles = theme => ({
  page: {
    minWidth: 600,
    overflowX: 'auto',
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  loading: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  create_assessment_title: {
    fontSize: 18,
    fontWeight: 500,
  },
  no_internet_button: {
    textAlign: 'right',
  },
  select_type_modal_title: {
    paddingTop: '40px',
    fontFamily: 'Roboto Light',
    fontSize: 18,

    '@media(max-width: 576px)': {
      fontSize: 14,
    },
  },
  select_type_modal_close: {
    position: 'absolute',
    top: 20,
    right: 12,
    width: 'auto',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: 3,
    border: 'none',
    cursor: 'pointer',
    zIndex: 999,

    '@media(max-width: 576px)': {
      top: 20,
      right: 20,
    },
    '& svg': {
      width: 25,
      height: 25,
      fill: '#b7bfc6',
      opacity: '.6',
      transition: 'opacity .15s ease-in-out',
      '&:hover': {
        fill: '#b7bfc6',
        opacity: 1,
      },
      '@media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)': {
        width: 20,
      },
      [theme.breakpoints.only('xs')]: {
        width: '15px',
        height: '15px',
      },
    },
  },
  tutorial_help: {
    display: 'flex',
    flexFlow: 'column',
    textAlign: 'left',
  },
  tutorial_help_title: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  tutorial_help_body: {
    textAlign: 'start',
  },
});
