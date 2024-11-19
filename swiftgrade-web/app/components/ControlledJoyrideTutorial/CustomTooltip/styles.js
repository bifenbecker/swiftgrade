export const styles = theme => ({
  joyride_custom_tooltip: {
    display: 'flex',
    flexFlow: 'column',
    justifyContent: 'center',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '5px',
    maxWidth: '400px',
    minWidth: '250px',
    [theme.breakpoints.only('xs')]: {
      maxWidth: '300px',
    },
  },
  joyride_custom_tooltip_buttons: {
    display: 'flex',
    justifyContent: 'center',
  },
  joyride_custom_tooltip_buttons_third_block: {
    display: 'flex',
    width: `${100 / 3}%`,
    justifyContent: 'center',
    alignItems: 'center',

    '&:first-child': {
      justifyContent: 'flex-start',
    },
    '&:last-child': {
      justifyContent: 'flex-end',
    },
  },
  joyride_custom_tooltip_back_button: {
    color: '#7f7f7f',
    textTransform: 'none',
  },
  joyride_custom_tooltip_close_button: {
    textTransform: 'none',
    color: '#3367d6',
    marginLeft: 'auto',
  },
  joyride_custom_tooltip_next_button: {
    color: '#3367d6',
    textTransform: 'none',
  },
  joyride_custom_tooltip_content: {
    display: 'flex',
    alignItems: 'center',
    textAlign: 'left',
    marginBottom: '20px',
    lineHeight: 1.5,
  },
  cross_button: {
    display: 'flex',
    justifyContent: 'end',
    margin: '-10px -10px 0 0',
  },
  cross_button_icon: {
    width: 25,
    height: 25,
    color: 'rgba(195, 195, 195, 1)',
    cursor: 'pointer',
  },
});
