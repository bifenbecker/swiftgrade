export const styles = theme => ({
  welcome_to_sg_img: {
    width: '100%',
  },
  welcome_to_sg_text: {
    textAlign: 'center',
    margin: '10px',
  },
  welcome_to_sg_title: {
    fontSize: 'large',
    fontWeight: 'bold',
  },
  welcome_to_sg_button: {
    float: 'center',
    width: '50%',
    margin: '0 auto 40px auto',
  },
  welcome_modal_body_border: {
    height: 0,
  },
  welcome_modal_body: {
    padding: 0,
    [theme.breakpoints.only('xs')]: {
      maxHeight: '400px',
    },
  },
});
