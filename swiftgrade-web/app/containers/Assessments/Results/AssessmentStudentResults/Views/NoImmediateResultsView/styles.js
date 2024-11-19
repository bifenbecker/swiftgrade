export const styles = () => ({
  finish_btn_wrapper: {
    width: '500px', // 60%
    margin: 'auto',
    '@media (max-width:600px)': {
      width: '100%',
      padding: 0,
    },
  },
  finish_btn: {
    height: 50,
    lineHeight: '50px',
    padding: '0 24px',
    width: '100%',
    color: '#fff',
    borderRadius: 3,
    border: 'none',
    letterSpacing: '.5px',
    transition: 'background-color .15s, color .15s ease-in-out',
    cursor: 'pointer',
    fontSize: 18,
    fontFamily: 'Gordita',
    textTransform: 'capitalize',
    '& span': {
      height: 50,
    },
  },
  no_immediate_results_image: {
    width: '300px',
    margin: 'auto',
    paddingBottom: '20px',
    paddingTop: '15vh',
  },
  no_immediate_results_icon: {
    width: '300px',
    height: '388px',
    paddingRight: '60px',
  },
  no_immediate_results_title: {
    textAlign: 'center',
    font: '44px Gordita regular',
    color: '#151b26',
    margin: '25px 0 25px',
    '@media(max-width: 576px)': {
      fontSize: 30,
      margin: '50px 0 25px',
    },
    '@media(min-width: 576px) and (max-width:1024px)': {
      fontSize: 40,
      margin: '15px 0 25px',
    },
    '@media (device-height: 568px) and (device-width: 320px) and (-webkit-min-device-pixel-ratio: 2)': {
      fontSize: 25,
      margin: '50px 0 25px',
    },
  },
});
