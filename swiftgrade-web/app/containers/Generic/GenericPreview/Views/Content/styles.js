export const styles = theme => ({
  title: {
    '& span': {
      position: 'relative',
      '&:after': {
        position: 'absolute',
        content: '""',
        width: '100%',
        height: '2px',
        background: '#000',
        bottom: 2,
        left: 0,
        right: 0,
        margin: 'auto',
        [theme.breakpoints.down('xs')]: {
          bottom: '-2px',
        },
      },
    },
    [theme.breakpoints.down('md')]: {
      padding: `${theme.spacing(2.5)}px ${theme.spacing(1.5)}px ${theme.spacing(2.5)}px ${theme.spacing(3.5)}px`,
    },
    [theme.breakpoints.down('xs')]: {
      padding: `${theme.spacing(5.5)}px ${theme.spacing(1.5)}px ${theme.spacing(1.5)}px ${theme.spacing(1.5)}px`,
      fontSize: 16,
    },
    fontSize: 20,
    padding: `${theme.spacing(2.5)}px ${theme.spacing(3.5)}px ${theme.spacing(2.5)}px ${theme.spacing(3.5)}px`,
  },
  download: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    // paddingTop: theme.spacing(6),
    // [theme.breakpoints.up('xl')]: {
    //   paddingTop: theme.spacing(11),
    // },
    position: 'absolute',
    right: '0',
    left: '0',
    top: 'calc(50px + (100vh - 126px)*0.88)',
    '@media (max-height: 660px)': {
      top: 'calc(50px + (100vh - 126px))',
    },
  },
  download_btn_text: {
    fontWeight: 700,
    fontSize: 13,
    textTransform: 'none',
  },
  download_btn: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  pdf: {
    height: '100%',
    background: '#DCDCDC',
    marginTop: theme.spacing(7.5),
    paddingBottom: theme.spacing(6.25),
    overflowY: 'auto',
    overflowX: 'hidden',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100%',
    paddingTop: theme.spacing(7.5),
    position: 'relative',
  },
  loading: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  customize_container: {
    display: 'flex',
    flexDirection: 'column',
  },
  pulse: {
    borderRadius: '50%',
    animation: 'pulse 1.7s infinite',
    '&:hover': {
      animation: 'none',
    },
  },
});
