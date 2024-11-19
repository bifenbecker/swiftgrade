export const styles = theme => ({
  helper_icon: {
    position: 'relative',
    display: 'flex',
    bottom: '5px',
    marginRight: '25px',

    '&.isMobile': {
      position: 'absolute',
      top: '15px',
      right: '15px',
      marginRight: '0',
      height: '50px',
    },
  },
  tabs_container: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  tabs: {
    display: 'flex',
    marginLeft: theme.spacing(2.7),
    '@supports (-ms-accelerator:true) or (-ms-ime-align:auto)': {
      marginTop: -0.5,
    },
    '&.isMobile': {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      margin: '0px',
    },
    '&.iOS': {
      '@supports (-moz-appearance:none)': {
        marginTop: -2,
        '@media (width: 1336px)': {
          marginTop: -1,
        },
      },
    },
    '@supports (-moz-appearance:none)': {
      marginTop: -1,
    },
  },
  tab: {
    padding: '4px 16px',
    margin: '0px 7px',
    textAlign: 'center',
    cursor: 'pointer',
    outline: 'none !important',
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
    fontSize: 19,
    '@media (max-width: 600px)': {
      width: '25%',
      padding: '4px 10px',
      margin: '5px',
      height: 'fit-content',
      borderRadius: '3px',
      fontSize: '3.5vw',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    },

    '&.first': {
      marginLeft: 0,
      marginRigth: 5,
      '@media (max-width: 600px)': {
        marginLeft: 5,
      },
    },

    '&:hover': {
      opacity: '0.7',
    },
  },
});
