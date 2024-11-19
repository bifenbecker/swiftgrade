export const styles = theme => ({
  app_bar: {
    display: 'flex',
    flexFlow: 'row',
  },
  preview_header: {
    width: '100%',
    height: theme.spacing(7.5),
    '@media (max-width: 768px)': {
      height: '75px',
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
  back_icon: {
    marginTop: 10,
    color: 'black',
    marginLeft: -4,
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '50%',
    },
  },
  info_icon: {
    marginLeft: 5,
    marginTop: -2,
    fontSize: 20,
  },
  header_title: {
    fontSize: 20,
    paddingBottom: 5,
    '@media (max-width: 768px)': {
      fontSize: 14,
    },
    '@media (max-width: 400px)': {
      width: '70%',
    },
  },
  student_instructions: {
    display: 'flex',
    flexFlow: 'column',
    alignItems: 'center',
    margin: 'auto 10px auto auto',
    cursor: 'pointer',
    borderRadius: '4px',
    padding: '5px',

    '& svg': {
      width: '20px',
      height: '20px',
    },
    '& span': {
      color: 'black',
      width: 'max-content',
      fontSize: '12px',
    },

    '& div': {
      display: 'flex',
      flexFlow: 'column',
      alignItems: 'center',
    },

    '&:hover': {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
    },
  },
});
