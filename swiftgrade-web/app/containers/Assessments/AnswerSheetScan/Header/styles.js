export const styles = theme => ({
  header: {
    height: theme.spacing(7),
    color: 'white',
    fontSize: 16,

    '&.loading': {
      opacity: 0.7,
      pointerEvents: 'none',
    },
  },
  grid6: {
    '&.MuiGrid-grid-xs-6': {
      flexGrow: 0,
      maxWidth: '42%',
      flexBasis: '42%',
    },
  },
  grid3: {
    '&.MuiGrid-grid-xs-3': {
      flexGrow: 0,
      maxWidth: '28%',
      flexBasis: '28%',
    },
  },
  title_item: {
    color: 'white',
    width: '100%',
    height: '100%',
  },
  name_wrapper: {
    alignItems: 'flex-end',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  name: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    paddingBottom: 1,

    '&.assessment': {
      marginBottom: 2,
    },
  },
  button: {
    color: 'white',
    textTransform: 'none',
    lineHeight: 'unset',
    padding: 0,
    fontSize: 16,
    width: 90,
    height: '100%',

    '&.oneScan': {
      marginLeft: -2,
    },
    '&.moreThanNinetyNineScans': {
      marginLeft: -10,
      fontSize: 14,
    },
    '&.moreThanNineScans': {
      marginLeft: -10,
      width: 105,
    },
  },
  back_icon_wrapper: {
    margin: '0px 2px 3px -4px',
  },
  back_icon_wrapper_with_scans: {
    margin: '0px 2px 3px 4px',
  },
  back_icon: {
    marginLeft: 8,
    cursor: 'pointer',
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.04)',
      borderRadius: '50%',
    },

    '@media (max-width: 360px)': {
      fontSize: 18,

      '&.moreThanNinetyNineScans': {
        fontSize: 14,
      },
    },
  },
});
