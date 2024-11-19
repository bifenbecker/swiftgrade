export const styles = theme => ({
  cards_wrapper: {
    overflowY: 'auto',
    maxHeight: '92vh',
    flexWrap: 'wrap',
    paddingBottom: 20,
  },
  cards: {
    [theme.breakpoints.only('xs')]: {
      padding: '0px 10px',
    },
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    padding: '0px 18px',
    paddingTop: theme.spacing(0.9),

    '&.MuiGrid-spacing-xs-6': {
      width: 'unset',
      margin: 'unset',
    },
    '&.MuiGrid-spacing-xs-5': {
      width: 'unset',
      margin: 'unset',
    },
  },
  card: {
    position: 'relative',
    height: theme.spacing(16),
    borderRadius: 10,
    cursor: 'pointer',
  },
  card_title: {
    color: 'white',
    fontSize: 24,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    display: '-webkit-box !important',
    '-webkit-line-clamp': 2,
    '-webkit-box-orient': 'vertical',
    whiteSpace: 'normal',
    wordBreak: 'break-word',
    padding: 0,
    margin: `10px ${theme.spacing(2)}px`,
  },
  card_description: {
    color: 'white',
    fontSize: 14,
    padding: `0px ${theme.spacing(2)}px`,
  },
  card_icon_wrapper: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingRight: theme.spacing(4),
  },
  card_icon: {
    width: theme.spacing(9),
    height: theme.spacing(9),
    marginTop: theme.spacing(2.25),
  },
  empty_page: {
    height: '90vh',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    '&.withFooterBanner': {
      height: '70vh',
      [theme.breakpoints.only('xs')]: {
        height: '65vh',
      },
    },
  },
  empty_page_icon: {
    width: theme.spacing(50),
    height: theme.spacing(50),

    [theme.breakpoints.only('xs')]: {
      width: theme.spacing(24),
      height: theme.spacing(24),
    },
    [theme.breakpoints.only('sm')]: {
      width: theme.spacing(35),
      height: theme.spacing(35),
    },
    '@media (min-width: 1500px)': {
      width: theme.spacing(80),
      height: theme.spacing(80),
      '&.withFooterBanner': {
        width: theme.spacing(70),
        height: theme.spacing(70),
      },
    },
  },
  tutorial: {
    position: 'relative',
    bottom: 0,
    width: '100%',
    padding: '1rem 1.5rem 2rem 2rem',
    backgroundColor: '#ffffff',
    '&.isFixed': {
      position: 'fixed',
    },
  },
  tutorial_title: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid rgb(116, 116, 116)',
  },
  tutorial_videos_link_wrapper: {
    textAlign: 'end',
    zIndex: 1000,
    marginRight: 220,
    marginBottom: -15,
  },
  tutorial_videos_link_tooltip_wrapper: {
    fontSize: '0.8rem',
    display: 'flex',
    alignItems: 'center',
  },
  tutorial_videos_link_tooltip_icon: { width: 15, height: 15, marginLeft: 6 },
  tutorial_videos_link_button: {
    padding: 0,
    margin: 0,
  },
  tutorial_videos_link_icon: {
    width: 50,
    height: 50,
    filter: 'invert(15%) sepia(85%) saturate(6386%) hue-rotate(235deg) brightness(92%) contrast(97%)', // Color #0F3AE8 for svg component
  },
  tooltip_tutorial_close_wrapper: {
    fontSize: '0.8rem',
    padding: 5,
  },
  tutorial_close: {
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
      fill: 'rgb(116, 116, 116)',
      opacity: '.6',
      transition: 'opacity .15s ease-in-out',
      '&:hover': {
        fill: 'rgb(116, 116, 116)',
        opacity: 1,
      },
    },
  },
  tutorial_description: {
    display: 'flex',
    flexDirection: 'column',
    padding: '0.5rem 0',
  },
  tutorial_link: {
    color: 'rgb(116, 116, 116)',
    opacity: 0.8,
    transition: 'all .3s',
    '&:hover': {
      opacity: 1,
    },
  },
  tutorial_link_wrapper: {
    padding: '.4rem 0',
    '&:first-child': {
      padding: '0 0 .4rem 0',
    },
  },
});
