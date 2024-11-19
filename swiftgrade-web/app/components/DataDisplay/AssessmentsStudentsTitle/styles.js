export const styles = theme => ({
  group: {
    borderRadius: 10,
    height: theme.spacing(14),
    margin: 'auto',
    maxWidth: '100%',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
    [theme.breakpoints.only('xs')]: {
      '@media (orientation: portrait)': {
        marginTop: 15,
      },
    },
  },
  group_title: {
    color: 'white',
    padding: `10px ${theme.spacing(2)}px`,
    fontSize: 22,
    fontWeight: 200,
    [theme.breakpoints.only('xs')]: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      display: '-webkit-box !important',
      '-webkit-line-clamp': 2,
      '-webkit-box-orient': 'vertical',
      whiteSpace: 'normal',
      wordBreak: 'break-word',
      padding: 0,
      margin: `10px ${theme.spacing(2)}px`,
    },
  },
  group_message: {
    color: 'white',
    paddingTop: '70px',
    textAlign: 'center',
  },
  group_description: {
    color: 'white',
    fontSize: 15,
    fontWeight: 200,
    padding: `0px ${theme.spacing(2)}px`,
  },
  group_icon: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(2),
  },
  card_icon: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    marginTop: theme.spacing(2.25),
  },
});
