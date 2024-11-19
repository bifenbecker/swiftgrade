export const styles = theme => ({
  header: {
    width: '100%',
    height: theme.spacing(10),
    minWidth: 500,
    '&.isMobilePortrait': {
      minWidth: 300,
    },
  },
  header_item: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: '100%',
    marginLeft: theme.spacing(3.5),
    '&.isMobilePortrait': {
      marginLeft: 15,
    },
    '@media (max-width: 768px)': {
      marginLeft: theme.spacing(1.5),
    },
  },
  header_group_name: {
    fontSize: 18,
    padding: '5px 0 3px 0',
  },
  back_icon_wrapper: {
    width: 20,
    height: 35,
  },
  back_icon: {
    cursor: 'pointer',
    outline: 'none !important',
    transform: 'rotate(180deg)',
    width: 31,
    height: 31,
    margin: '0px 0px -0px -11px',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '50%',
    },
  },
  additional_content_wrapper: {
    display: 'flex',
    justifyContent: 'flex-end',
    flexDirection: 'row',
    height: '100%',
    marginRight: theme.spacing(2.5),
    alignItems: 'center',
  },
  student_name: {
    fontSize: 14,
    paddingBottom: '5px',
  },
});
