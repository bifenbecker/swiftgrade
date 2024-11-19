export const styles = theme => ({
  select: {
    [theme.breakpoints.down('md')]: {
      marginLeft: 0,
    },
    border: '2px solid #e0e0e0',
    borderRadius: '10px',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(0.5),
    width: 85,
  },
  select_container: {
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
  },
  select_root: {
    borderRadius: 10,
    '&:focus': {
      borderRadius: 10,
    },
    paddingTop: theme.spacing(0.875),
    paddingBottom: theme.spacing(0.875),
  },
});
