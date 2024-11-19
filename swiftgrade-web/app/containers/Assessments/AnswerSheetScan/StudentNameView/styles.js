export const styles = theme => ({
  name_img: {
    [theme.breakpoints.only('xs')]: {
      width: theme.spacing(17),
      height: theme.spacing(3),
    },
    width: theme.spacing(30),
    height: theme.spacing(6),
  },
  email_img: {
    [theme.breakpoints.only('xs')]: {
      width: theme.spacing(36),
      height: theme.spacing(3),
      margin: `${theme.spacing(0.5)}px 0px`,
    },
    width: theme.spacing(65),
    height: theme.spacing(6),
    margin: `${theme.spacing(1)}px 0px`,
  },
  error_text: {
    width: '50%',
    textAlign: 'center',

    '&.email': {
      width: '100%',
      marginTop: theme.spacing(0.5),
    },
  },
  student_names: {
    fontSize: 20,
    fontWeight: 500,
  },
  names: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing(2.5),
  },
  wrapper_fname_img: {
    [theme.breakpoints.only('xs')]: {
      paddingLeft: theme.spacing(2),
    },
    paddingLeft: theme.spacing(2.5),
  },
  wrapper_lname_img: {
    [theme.breakpoints.only('xs')]: {
      paddingRight: theme.spacing(2),
    },
    paddingRight: theme.spacing(2.5),
  },
  wrapper_email_img: {
    textAlign: 'center',
  },
  email_text: {
    marginTop: 4,
  },
});
