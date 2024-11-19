export const styles = () => ({
  type_buttons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  icon_button: {
    justifyContent: 'center',
    display: 'block',
    width: 135, // 120
    height: 165, // 160
    textTransform: 'capitalize',
    '&.paper': {
      paddingLeft: 25,
    },
  },
  button_text: {
    fontSize: 16,
    '&.paper': {
      paddingTop: 15,
      paddingRight: 20,
    },
  },
  customWidth: {
    width: '100px',
  },
});
