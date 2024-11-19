export const styles = theme => ({
  anti_cheating_mode_container: {
    display: 'flex',
  },
  anti_cheating_tooltip_container: {
    display: 'flex',
    alignItems: 'center',
  },
  anti_cheating_tooltip_content: {
    padding: '8px 0 20px 10px',
    fontSize: '11px',
    fontWeight: '400',
  },
  anti_cheating_tooltip_content_item: {
    display: 'flex',
    marginBottom: '15px',

    '&:last-child': {
      marginBottom: '0px',
    },
  },
  anti_cheating_tooltip: {
    color: 'rgb(215, 215, 215)',
    width: '17px',
    height: '17px',
  },

  form: {
    padding: '20px 28px',
    position: 'absolute',
    width: '100%',
    [theme.breakpoints.only('xs')]: {
      padding: '10px',
    },
  },
  content_container: {
    minHeight: 'calc(100vh - 250px)',
  },
  settings_block: {
    padding: '10px 0 30px 0',
    borderBottom: '1px solid #F3F3F3',
    '&:last-child': {
      borderBottom: 'none',
    },
    [theme.breakpoints.only('xs')]: {
      padding: '5px 0 15px',
    },
  },
  block_title: {
    display: 'flex',
    textDecoration: 'underline',
    fontSize: 16,
    padding: '10px 37px',
    [theme.breakpoints.only('xs')]: {
      padding: '8px 20px',
      '@media (max-width: 333px) and (orientation: portrait)': {
        padding: '8px 10px',
      },
    },
  },
  setting_block_container: {
    padding: '0 36px',
    [theme.breakpoints.only('xs')]: {
      padding: '0 20px',
      '@media (max-width: 333px) and (orientation: portrait)': {
        padding: '0 10px',
      },
    },
  },
  footer: {
    padding: '40px 75px',
    position: 'relative',
    zIndex: 1,
    textAlign: 'end',
    [theme.breakpoints.only('xs')]: {
      textAlign: 'center',
    },
  },
  clock_icon: {
    width: 15,
    height: 15,
    margin: '0 5px',
  },
  dim_text: {
    color: 'rgba(0, 0, 0, 0.38)',
    fontSize: 14,
    padding: '0 10px',
  },
  timer_container: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 36px',
    [theme.breakpoints.only('xs')]: {
      padding: '0 20px',
      '@media (max-width: 333px) and (orientation: portrait)': {
        padding: '0 10px',
      },
    },
  },
  timer_fields: {
    display: 'flex',
    alignItems: 'center',
  },
  timer_field: {
    padding: '0 5px',
  },
  timer_value_root: {
    fontSize: 14,
    width: 70,
    border: '1px solid #e0e0e0',
    borderRadius: 4,
  },
  timer_value_input: {
    textAlign: 'center',
  },
  timer_unit_root: {
    width: 90,
    border: '1px solid #e0e0e0',
    borderRadius: 4,
  },
  checkbox_label: {
    fontSize: 14,
    '& .Mui-disabled': {
      cursor: 'url(/block.png) 18 18, auto',
    },
  },
  attached_files_root: {
    '& .Mui-disabled': {
      cursor: 'url(/block.png) 18 18, auto',
    },
  },
  attached_files_checkbox_root: {
    '@media(max-width: 425px)': {
      bottom: '7px',
    },
  },
  checkbox_root: {
    marginRight: '8px',
  },
  release_results_icon: {
    width: 18,
    height: 18,
    margin: '-5px 5px 0 5px',
    '&.checked': {
      width: 24,
      height: 24,
    },
  },
  release_results_types: {
    paddingLeft: 25,
  },
  password_container: {
    display: 'flex',
    paddingTop: 15,
  },
  text_box_icon: {
    height: 22,
    width: 22,
    marginLeft: 5,
  },
  auto_release_files_icon: {
    height: 19,
    width: 19,
    marginLeft: 5,
    marginTop: -2,
  },
  password_checkbox_root: {
    marginRight: 0,
  },
  password_root: {
    height: 37,
    width: 200,
    border: '1px solid #e0e0e0',
    borderRadius: 4,
    color: '#6d7881',
  },
  password_input: {
    fontSize: 14,
    paddingLeft: 10,
    paddingRight: 38,
  },
  error_input: {
    margin: '2px 0px',
    fontSize: 14,
    color: 'red',
    position: 'absolute',
    '&.timer_field': {
      margin: '2px 0px 2px -97px',
    },
  },
  radio_btn_label: {
    fontSize: '14px',
    cursor: 'pointer',
    pointerEvents: 'auto',
  },
  radio_btn_root: {
    cursor: 'default',
    pointerEvents: 'none',
    '& .MuiRadio-root': {
      cursor: 'pointer',
      pointerEvents: 'auto',
      padding: '3px 9px',
    },
    '@media(max-width: 435px)': {
      display: 'inline-flex',
      alignItems: 'flex-start',
    },
  },
  tooltip: {
    maxWidth: 580,
    borderRadius: 8,
  },
  tooltip_icon_container: {
    marginLeft: 10,
  },
  attachments_tooltip_wrap: {
    fontSize: 11,
    fontWeight: 400,
    padding: '8px 0',
  },
  attachments_tooltip_list: {
    lineHeight: 1.7,
  },
  info_icon: {
    width: 17,
    height: 17,
    color: 'rgb(215, 215, 215)',
  },
  file_uploader: {
    height: 250,
    width: '100%',
    padding: '0 37px',
    '& .drop-area-bold-text': {
      fontWeight: 'normal',
    },
    [theme.breakpoints.only('xs')]: {
      padding: '0 20px',
      '@media (max-width: 333px) and (orientation: portrait)': {
        padding: '0 10px',
      },
    },
  },
  vault_error: {
    marginLeft: '37px',
  },
});
