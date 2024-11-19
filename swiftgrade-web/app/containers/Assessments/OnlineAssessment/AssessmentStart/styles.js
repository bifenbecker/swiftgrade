export const styles = () => ({
  assessment_start_container: {
    width: '100%',
  },
  assessment_name: {
    marginTop: '-4px',
    paddingTop: '6px',
    paddingBottom: '7px',
  },
  loading: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  start_image: {
    // width: '34%',
    width: 500,
    margin: 'auto',
    paddingTop: 150,
    paddingBottom: 80,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '@media (max-width:600px)': {
      width: '95vw',
      margin: 'auto',
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
      height: '60vh',
    },
  },
  start_image_icon: {
    width: 300,
    height: 225,
  },
});
