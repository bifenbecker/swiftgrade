export const styles = theme => ({
  wrapper: {
    position: 'relative',
    '@media (max-width:600px)': {
      bottom: '0',
    },
  },
  filter_btn: {
    position: 'absolute',
    right: 23,
    top: 14,
    minWidth: 85,
  },
  modal_wrapper: {
    position: 'absolute',
    right: 13,
    top: 10,
    zIndex: 1,
  },
  modal: {
    position: 'relative',
    height: 345,
    width: 400,
    background: '#ffffff',
    border: '2px solid #d2d2d2',
    boxShadow: '0 0 6px rgba(0, 0, 0, 0.5)',
    '@media (max-width:600px)': {
      width: '90vw',
    },
  },
  modal_btn: {
    position: 'absolute',
    right: 10,
    top: 4,
  },
  content: {
    marginTop: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
  checkbox_root: {
    paddingTop: 4,
    paddingBottom: 4,
    margin: '2px 0px',
    cursor: 'pointer',
    pointerEvents: 'visible',
  },
  checkbox_label: {
    fontSize: 14,
    marginTop: 1,
    cursor: 'pointer',
    pointerEvents: 'visible',
    '&.Mui-disabled': {
      cursor: 'default',
    },
  },
  checkbox_label_root: {
    display: 'flex',
    cursor: 'default',
    pointerEvents: 'none',
    '&.need_grading_block': {
      paddingTop: 10,
    },
  },
  reset_btn: {
    marginTop: 30,
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    bottom: '35px',
  },
  title: {
    width: '70%',
    marginBottom: 15,
    fontWeight: 'bold',
    fontSize: 16,
  },
  info_icon: {
    width: 17,
    height: 17,
    color: 'rgb(215, 215, 215)',
  },
  low_confidence_tooltip: {
    width: 180,
    fontSize: 12,
    fontWeight: 400,
  },
  low_confidence_container: {
    display: 'flex',
  },
  info_icon_container: {
    paddingLeft: 5,
  },
  low_confidence_label: {
    marginBottom: '-14px',
  },
  tutorial_help: {
    display: 'flex',
    flexFlow: 'column',
    textAlign: 'left',
  },
  filters_options_img: {
    width: 400,
    [theme.breakpoints.only('xs')]: {
      width: 300,
    },
  },
});
