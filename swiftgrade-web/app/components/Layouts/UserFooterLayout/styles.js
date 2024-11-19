export const styles = () => ({
  footer: {
    position: 'relative',
    background: '#4e4d5e',
    color: '#e3e3e3',
  },
  footer_container: {
    alignItems: 'center',
    display: 'flex',
    justifyContent: 'space-between',
    maxWidth: '100%',
    paddingBottom: 17,
    paddingTop: 17,
    margin: 'auto',
    width: 'calc(100% - 48px)',
    '-ms-flex-align': 'center',
    '-ms-flex-pack': 'justify',
    '-webkit-box-align': 'center',
    '-webkit-box-pack': 'justify',

    '@media (max-width: 576px)': {
      flexWrap: 'wrap',
      paddingTop: 27,
      paddingBottom: 37,
      '-ms-flex-wrap': 'wrap',
    },
  },
  footer_logo: {
    textAlign: 'center',
    '& a': {
      color: 'inherit',
      paddingBottom: 4,
      display: 'block',
      textDecoration: 'none',
      fontFamily: 'Gordita Regular',
    },
    '& span': {
      display: 'none',
      fontSize: 24,
    },

    '@media (max-width: 576px)': {
      width: '100%',
      order: 1,
      '& span': {
        paddingTop: 10,
        display: 'block',
      },
    },
  },
  copy: {
    margin: 0,
    '& span': {
      display: 'inline-block',
      fontSize: 12,
      fontFamily: 'Gordita Regular',
      lineHeight: '16px',
      color: 'inherit',
      paddingTop: 4,
    },
  },
  footer_menu: {
    display: 'flex',

    '@media (max-width: 576px)': {
      width: '100%',
      order: 0,
      '-ms-flex-wrap': 'wrap',
      flexWrap: 'wrap',
    },
  },
  footer_menu__item: {
    padding: '0 30px',
    '& h3': {
      textTransform: 'uppercase',
      paddingBottom: '6px',
      margin: 0,
      fontFamily: 'Gordita',
      fontWeight: 'normal',
      fontSize: 14,
      lineHeight: '19px',
    },
    '&:last-child': {
      paddingRight: 0,
    },
    '@media (max-width: 768px)': {
      padding: '0 20px',
    },
    '@media (max-width: 576px)': {
      padding: '0 0 20px',
      width: '100%',
      textAlign: 'center',
    },
  },
  footer_menu__item_list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,

    '& li': {
      paddingBottom: 6,
      fontFamily: 'Gordita Regular',
      '@media (max-width: 577px)': {
        paddingBottom: 15,
      },
      '& a': {
        color: 'inherit',
        textDecoration: 'none',
        fontSize: 14,
        lineHeight: '19px',
        '@media screen and (max-width: 1024px)': {
          fontSize: 11,
          lineHeight: '16px',
        },
        '@media (max-width: 577px)': {
          fontSize: 16,
          lineHeight: '16px',
        },
        '&:hover': {
          textDecoration: 'underline',
        },
      },
    },
  },
});
