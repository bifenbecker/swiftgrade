export const styles = () => ({
  form_title: {
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
  block_input: {
    position: 'relative',
    width: '100%',
    marginBottom: 25,
    '& .MuiInputBase-root': {
      width: '100%',
    },
  },
  input_root: {
    backgroundColor: '#fff',
    border: '2px solid #e0e6e8',
    borderRadius: 3,
    boxSizing: 'border-box',
    color: '#6d7881',
    fontFamily: 'Gordita Regular',
    fontSize: 20,
    height: 51,
    position: 'relative',
    transition: 'border .15s',
    wordBreak: 'normal',
    '@media (max-width: 577px)': {
      fontSize: 16,
    },
  },
  input: {
    height: 47,
    padding: '0px 38px 0px 20px',
    lineHeight: '25px',
  },
  input_focused: {
    borderColor: '#aba3ff',
  },
  btn_finish: {
    font: '18px "Gordita"',
    height: 50,
    lineHeight: '50px',
    padding: '0 24px',
    width: '100%',
    boxSizing: 'border-box',
    marginTop: 0,
    background: '#796eff',
    color: '#fff',
    textDecoration: 'none',
    borderRadius: 3,
    border: 'none',
    letterSpacing: '.5px',
    transition: 'background .15s, color .15s ease-in-out',
    cursor: 'pointer',
    '&:hover': {
      background: '#635ac7',
      borderBottom: 'none',
      color: '#fff',
      textDecoration: 'none',
    },
  },
});
