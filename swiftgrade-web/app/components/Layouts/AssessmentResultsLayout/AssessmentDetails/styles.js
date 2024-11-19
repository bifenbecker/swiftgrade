export const styles = theme => ({
  assessment_details_wrapper: {
    '&.MuiGrid-grid-xs-5': {
      flexGrow: 0,
      maxWidth: '37.333333%',
      flexBasis: '37.333333%',
    },
  },
  group_name_wrapper: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'flex-start',
    width: '100%',
  },
  group_name: {
    fontSize: 18,
    marginLeft: theme.spacing(3),
    marginBottom: 2,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    paddingBottom: 2,
    textOverflow: 'ellipsis',
  },
  assessment_details: {
    fontSize: 15,
    marginLeft: theme.spacing(3),
    marginBottom: 2,

    '&.count': {
      fontSize: 13,
      marginBottom: 2.5,
    },
  },
  back_icon: {
    marginLeft: theme.spacing(2.5),
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '50%',
    },
  },
});
