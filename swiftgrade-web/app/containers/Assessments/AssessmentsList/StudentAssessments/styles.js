export const styles = theme => ({
  loading: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  create_button: {
    marginBottom: theme.spacing(3),
  },
  processing_modal_text: {
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  processing_modal_button: {
    float: 'right',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  name_column: {
    [theme.breakpoints.only('xs')]: {
      padding: '16px 2px 16px 2px',
    },
    padding: '16px 16px 16px 0px',
  },
  processing: {
    fontSize: 14,
  },
  processing_time_msg: {
    fontSize: 11,
  },
  delete_assessments_container: {
    padding: 10,
  },
  delete_assessments_buttons: {
    marginTop: 35,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  delete_assessment_button: {
    marginRight: 20,
  },
});
