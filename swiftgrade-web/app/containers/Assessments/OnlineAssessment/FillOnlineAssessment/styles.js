export const styles = () => ({
  loading: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  student_name: {
    fontSize: 14,
    paddingBottom: '5px',
  },
  placeholder: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: 'rgb(215, 213, 213)',
    userSelect: 'none',
    paddingTop: 15,
  },
  arrow_icon: {
    height: 30,
    width: 20,
    marginBottom: 15,
  },
  placeholder_title: {
    fontSize: 17,
    padding: '4px 0px',
  },
  doneBtnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  attachments_wrap: {
    paddingLeft: 25,
    '&.isMobilePortrait': {
      paddingLeft: 15,
    },
  },
  not_submitted_container: {
    padding: 10,
  },
  okay_btn: {
    paddingTop: 30,
    paddingRight: 5,
    textAlign: 'end',
  },
  collapse_button: {
    width: '1.2rem',
    height: '1.2rem',
    borderRadius: '300px',
    background: '#0092d1',
    cursor: 'pointer',
    userSelect: 'none',
    textAlign: 'center',
    color: 'white',
    border: '1px rgba(200, 200, 200, 0.5) solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  split_pane: {
    '&.SplitPane': {
      position: 'relative',
      height: '100vh',
    },
    '&:last-child': {
      overflowY: 'auto',
    },
  },
  tabs_scroller: {
    display: 'flex',
    justifyContent: 'center',
  },
  tabs_indicator: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    '& > span': {
      maxWidth: 40,
      width: '100%',
    },
  },
  tab_root: {
    textTransform: 'none',
    '&:focus': {
      opacity: 1,
    },
  },
});
