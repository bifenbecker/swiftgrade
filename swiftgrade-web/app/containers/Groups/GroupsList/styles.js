export const styles = () => ({
  loading: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  banner: {
    top: 0,
    maxHeight: 60,
    backgroundColor: 'black',
    color: 'white',
    textAlign: 'center',
    paddingTop: 5,
    paddingBottom: 5,
    '@media (max-width: 600px)': {
      fontSize: '12px',
    },
  },
  banner_link: {
    cursor: 'pointer',
    color: 'white',
    textDecoration: 'underline',
  },
  banner_link_without_underline: {
    cursor: 'pointer',
    color: 'white',
    textDecoration: 'none',
  },
  banner_close: {
    position: 'absolute',
    right: 20,
    color: '#fff',
    textDecoration: 'none',
    borderRadius: 3,
    border: 'none',
    cursor: 'pointer',
    zIndex: 999,
    '& svg': {
      width: '15px',
      height: '15px',
      fill: '#b7bfc6',
      opacity: '.6',
      transition: 'opacity .15s ease-in-out',
      '&:hover': {
        fill: '#b7bfc6',
        opacity: 1,
      },
    },
  },
  video_player_title_container: {
    width: '100%',
    textAlign: 'center',
    padding: '5px 0',
  },
  video_player_title_top: {
    textDecoration: 'underline',
    textTransform: 'uppercase',
  },
  video_player_title_bottom: {
    fontSize: 13,
    paddingTop: 10,
  },
  video_player_title: {
    width: '100%',
    textAlign: 'center',
    padding: '5px 0',
    textTransform: 'uppercase',
    textDecoration: 'underline',
  },
  player_button_modal_title: {
    fontSize: 14,
  },
});
