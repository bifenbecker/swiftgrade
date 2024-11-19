export const styles = () => ({
  please_check_svg_wrapper: {
    display: 'flex',
    justifyContent: 'center',
    '@media (max-width: 600px)': {
      width: '40%',
      margin: 'auto',
    },
  },
  please_check_wrapper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
  },
  please_check_title: {
    fontSize: 33,
    fontWeight: 400,
    color: '#151b26',
    margin: '9px 0 5px',
    fontFamily: 'Gordita Regular',
    lineHeight: 'normal',
    '@media (max-width: 600px)': {
      fontSize: 22,
    },
  },
  please_check_sub_title: {
    fontSize: 16,
    fontWeight: 'normal',
    fontFamily: 'Gordita Regular',
    color: '#151b26',
    margin: '10px 0 8px',
    lineHeight: 'normal',
    '@media (max-width: 600px)': {
      fontSize: 14,
      margin: '5px auto 5px',
    },
  },
  please_check_text: {
    fontFamily: 'Gordita Light',
    fontSize: 14,
    fontWeight: 'normal',
    color: 'rgba(88, 98, 107)',
    marginTop: 5,
    lineHeight: '23px',
    marginBottom: '30px',
    '@media (max-width: 600px)': {
      fontSize: 10,
    },
  },
});
