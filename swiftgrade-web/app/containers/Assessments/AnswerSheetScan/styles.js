export const styles = theme => ({
  loading: {
    display: 'flex',
    height: '100vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loading_image: {
    pointerEvents: 'none',
  },
  content: {
    height: '80vh',
  },
  modal_wrapper: {
    alignItems: 'center',
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
  },
  modal: {
    [theme.breakpoints.only('xs')]: {
      width: theme.spacing(40),
      height: theme.spacing(25),

      '&.multiple_pages': {
        height: theme.spacing(30),
      },
    },
    background: '#ededed',
    position: 'absolute',
    top: '30%',
    width: theme.spacing(70),
    height: theme.spacing(30),
    borderRadius: 6,

    '&.multiple_pages': {
      height: theme.spacing(35),
    },
  },
  errorModalText: {
    marginBottom: 10,
  },
  progress: {
    position: 'fixed',
  },
  result: {
    fontSize: 22,
    fontWeight: 500,
  },
  student_result_deleted_text: {
    marginTop: 20,
    marginBottom: 20,
  },
});
