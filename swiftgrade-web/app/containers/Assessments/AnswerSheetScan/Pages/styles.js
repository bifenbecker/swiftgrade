export const styles = theme => ({
  pages: {
    '&.more_than_four_pages': {
      width: '70%',
    },
    '&.more_than_seven_pages': {
      width: '100%',
    },
    width: '50%',
  },
  page: {
    [theme.breakpoints.down('sm')]: {
      width: theme.spacing(5),
      height: theme.spacing(5.5),

      '&.more_than_four_pages': {
        width: theme.spacing(4),
        height: theme.spacing(4.5),
      },
      '&.more_than_seven_pages': {
        width: theme.spacing(3),
        height: theme.spacing(3.5),
      },
    },
    [theme.breakpoints.only('md')]: {
      width: theme.spacing(5),
      height: theme.spacing(5.5),

      '&.more_than_four_pages': {
        width: theme.spacing(4),
        height: theme.spacing(4.5),
      },
      '&.more_than_seven_pages': {
        width: theme.spacing(3),
        height: theme.spacing(3.5),
      },
    },

    [theme.breakpoints.up('lg')]: {
      width: theme.spacing(8),
      height: theme.spacing(9),

      '&.more_than_four_pages': {
        width: theme.spacing(7),
        height: theme.spacing(8),
      },
      '&.more_than_seven_pages': {
        width: theme.spacing(5),
        height: theme.spacing(6),
      },
    },
  },
});
