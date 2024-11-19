export const styles = theme => ({
  timer_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',

    '&.default': {
      minHeight: 80,

      [theme.breakpoints.only('xs')]: {
        width: '30%', // 60
      },
      [theme.breakpoints.only('sm')]: {
        width: '50%',
      },
      [theme.breakpoints.only('md')]: {
        width: '30%',
      },
      [theme.breakpoints.only('lg')]: {
        width: '20%',
      },
      [theme.breakpoints.up('xl')]: {
        width: '15%',
      },
    },
    '& .tooltip_wrapper': {
      width: '100%',
    },
  },
  timer_item_msg: {
    fontSize: 14,
    [theme.breakpoints.only('xs')]: {
      fontSize: 12,
    },
  },
  timer_icon: {
    width: 25,
    height: 25,
    margin: '1px 0px 3px',
    [theme.breakpoints.only('xs')]: {
      width: 18,
      height: 18,
    },
  },
});
