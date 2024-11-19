export const styles = theme => ({
  form: {
    padding: '0 28px 20px 28px',
    position: 'absolute',
    width: '100%',
  },
  content: {
    minHeight: 'calc(100vh - 310px)',
  },
  submit_btn: {
    padding: '40px 0px',
    position: 'relative',
    zIndex: 1,
    textAlign: 'end',
    maxWidth: '542px',
    margin: 'auto',
    marginBottom: '40px',
  },
  placeholder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#C3C3C4',
    userSelect: 'none',
    paddingTop: 15,
  },
  arrow_image: {
    width: 200,
    height: 47,
    paddingBottom: 10,
    userSelect: 'none',
  },
  assessment_items_container: {
    maxWidth: '542px',
    margin: 'auto',
  },
  assessment_items_title: {
    background: '#fafafa',
    fontWeight: 'bold',
    height: 40,
    borderBottom: 'none',
    borderLeft: 'none',
  },
  assessment_item_content: {
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
    },
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 2,
    borderRight: '1px solid #d4d4d4',
    borderTop: '1px solid #d4d4d4',

    '&.answer': {
      padding: 0,
    },
  },
  curtain: {
    position: 'absolute',
    background: 'rgb(228, 228, 228)',
    color: 'black',
    // width: '83.03%',
    width: '100%',
    // textAlign: 'center',
    fontSize: 16,
    height: '100%',
    alignItems: 'center',
    // border: '1px solid #e0e0e0',
    display: 'flex',
    justifyContent: 'center',
    transition: 'width 0.8s, color 0.4s 0s',
    left: 0,
    top: 0,
    zIndex: 9999,
    '&.clicked': {
      color: 'rgba(0, 0, 0, 0)',
      width: 0,
      // visibility: 'hidden',
    },
  },
  assessment_item: {
    background: '#fafafa',
    borderBottom: 'none',
    minHeight: 80,
    borderLeft: 'none',
  },
  assessment_item_index: {
    flexGrow: 0,
    maxWidth: '14.75%',
    flexBasis: '14.75%',
    fontSize: 18,
    borderLeft: '1px solid #d4d4d4',
    '&.lastItem': {
      borderBottom: '1px solid #d4d4d4',
    },
  },
  assessment_item_answer: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 0,
    maxWidth: '83.03%',
    flexBasis: '83.03%',
    '&.lastItem': {
      borderBottom: '1px solid #d4d4d4',
    },

    [theme.breakpoints.between('xs', 'sm')]: {
      paddingLeft: 3,
    },
  },
  unit_field: {
    paddingLeft: 3,
    marginLeft: 5,
    flexBasis: '19%',
    maxWidth: '19%',
    [theme.breakpoints.up('md')]: {
      '&.MuiGrid-grid-md-2': {
        flexGrow: 0,
        maxWidth: 76,
        flexBasis: '11.3%',
      },
    },
    [theme.breakpoints.only('md')]: {
      paddingLeft: 0,
    },
    [theme.breakpoints.only('xs')]: {
      '&.MuiGrid-grid-xs-4': {
        flexGrow: 0,
        maxWidth: '30%',
        flexBasis: '30%',
      },
    },
  },
  answer_wrapper: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: '100%',
    alignItems: 'center',
  },
  answer: {
    width: '100%',
    padding: '10px 10px 10px 15px',
  },
  answer_field: {
    maxWidth: '80%',
    flexBasis: '80%',
    marginRight: 5,
    '&.mc_answer': {
      maxWidth: '55%',
      flexBasis: '55%',
    },
  },
  assessment_item_number: {
    paddingRight: '5px',
  },
  assessment_item_octothorpe: {
    paddingLeft: 24,
  },
  progress_component: {
    maxWidth: '2.22%',
    flexBasis: '2.22%',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  assessment_item_progress_title: {
    maxWidth: '2.22%',
    flexBasis: '2.22%',
    background: '#fff',
  },
});
