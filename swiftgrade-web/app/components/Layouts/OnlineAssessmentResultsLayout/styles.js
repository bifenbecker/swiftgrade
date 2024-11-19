export const styles = theme => ({
  header: {
    width: '100%',
    height: 100,
    minWidth: 500,
    '&.isMobilePortrait': {
      minWidth: 300,
    },
  },
  preview_header: {
    width: '100%',
    height: theme.spacing(8.5),
  },
  header_item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
    alignItems: 'center',
  },
  header_group_name: {
    fontSize: 20,
    padding: '5px 0',
    '&.isMobilePortrait': {
      fontSize: 16,
    },
  },
  back_icon: {
    outline: 'none !important',
    transform: 'rotate(180deg)',
    marginLeft: '10px',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '50%',
    },
  },
  start_back_icon: {
    cursor: 'pointer',
    outline: 'none !important',
    margin: '0 10px',
  },
  titles_block: {
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'column',
    height: '100%',
    textAlign: 'center',
  },
  finish_block: {
    textAlign: 'end',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'center',
  },
  start_block: {
    textAlign: 'start',
    height: '100%',
    flexDirection: 'column',
    alignItems: 'flex-start',
    display: 'flex',
    justifyContent: 'center',
  },
  finish_group: {
    display: 'flex',
    marginRight: 30,
    cursor: 'pointer',
    outline: 'none',
    '&.isMobilePortrait': {
      marginRight: 10,
    },
  },
  finish_title: {
    fontSize: 16,
    alignSelf: 'center',
    '&.isMobilePortrait': {
      fontSize: 14,
      '@media (max-width: 330px)': {
        fontSize: 12,
      },
    },
  },
  title: {
    fontSize: 16,
    paddingBottom: 5,
    '&.isMobilePortrait': {
      fontSize: 14,
    },
  },
  doneBtnWrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
});
