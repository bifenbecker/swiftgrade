export const styles = theme => ({
  button_group_container: {
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
      width: '100%',
      padding: `${theme.spacing(2.5)}px ${theme.spacing(1.5)}px ${theme.spacing(2.5)}px ${theme.spacing(3.5)}px`,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
      width: '100%',
      padding: `${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px ${theme.spacing(1)}px`,
    },
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    padding: `${theme.spacing(2.5)}px ${theme.spacing(3.5)}px ${theme.spacing(2.5)}px ${theme.spacing(3.5)}px`,
    position: 'relative',
  },
  button_group: {
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
    },
    paddingLeft: theme.spacing(2),
  },
  toggle_button_root: {
    '&:disabled': {
      color: '#fff',
      background: '#285EF4',
    },
    height: 35,
    width: 50,
    '@media (max-width:768px)': {
      height: 25,
      width: 45,
      marginTop: 8,
    },
  },
  info_icon_container: {
    display: 'inline-flex',
    margin: 'auto',
    paddingTop: 5,
    paddingLeft: 5,
    '& svg': {
      width: '15px',
      height: '15px',
      opacity: '0.5',
    },
  },
});
