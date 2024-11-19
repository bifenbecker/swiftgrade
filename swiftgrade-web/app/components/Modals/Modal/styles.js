export const styles = theme => ({
  modal: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
    overflowY: 'auto',
  },
  paper: {
    [theme.breakpoints.only('xs')]: {
      '@media (orientation: portrait)': {
        width: theme.spacing(40),
        '@media (max-width: 333px)': {
          width: theme.spacing(35),
        },
      },
      '@media (max-height: 333px) and (orientation: landscape)': {
        width: theme.spacing(62),
      },
    },
    backgroundColor: theme.palette.background.paper,
    position: 'absolute',
    top: '25%',
    width: theme.spacing(70),
    outline: 'none !important',
    borderRadius: 6,

    '&:hover': {
      outline: 'none !important',
    },
    '@media (max-height:450px)': {
      top: 'auto',
    },
  },
  title: {
    padding: theme.spacing(1.5),
    fontSize: 18,
    fontWeight: 600,
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'center',
  },
  body: {
    padding: theme.spacing(2),
    maxHeight: '85vh',
    overflow: 'auto',
    [theme.breakpoints.down('sm')]: {
      '&.maxBodyHeight': {
        maxHeight: 'max-content',
      },
    },
    [theme.breakpoints.only('xs')]: {
      overflow: 'auto',
      maxHeight: '300px',
    },
    '@media(max-height:450px)': {
      maxHeight: '220px',
      overflow: 'auto',
    },
  },
  landscape: {
    color: 'yellow',
  },
  error_icon: {
    margin: '0px 4px',
    color: 'red',
  },
  name_body_border: {
    height: '1px',
    backgroundImage: 'linear-gradient(to bottom, #9e9e9e 0%, #9e9e9e 40%, transparent 60%)',
    backgroundSize: '100% 1px',
    '@supports (-ms-accelerator:true) or (-ms-ime-align: auto)': {
      borderBottom: '0.5px solid #9e9e9e',
    },
  },
});
