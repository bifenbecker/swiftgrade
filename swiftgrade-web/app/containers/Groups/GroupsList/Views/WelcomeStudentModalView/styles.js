export const styles = theme => ({
  welcome_modal_body_border: {
    height: 0,
  },
  welcome_modal_body: {
    padding: 0,
    [theme.breakpoints.only('xs')]: {
      maxHeight: '400px',
    },
  },
  mobile_container: {
    position: 'relative',
    textAlign: 'center',
    color: 'white',
  },
  top_center_text: {
    width: '90%',
    position: 'absolute',
    top: '12%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontWeight: '450',
  },
  bottom_center_text: {
    width: '90%',
    position: 'absolute',
    top: '75%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    fontWeight: '300',
  },
  bottom_center_button: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0px',
  },
  container: {
    display: 'flex',
  },
  welcome_rocket_img: {
    width: '50%',
    float: 'left',
  },
  welcome_rocket_image: {
    width: 270,
  },
  welcome_text: {
    padding: '80px 30px 0px',
    paddingBottom: 15,
  },
  welcome_text_title: {
    fontSize: '20px',
    paddingBottom: 15,
  },
  welcome_text_body: {
    fontSize: '14px',
    paddingBottom: 30,
  },
  welcome_student_modal_button: {
    display: 'flex',
  },
});
