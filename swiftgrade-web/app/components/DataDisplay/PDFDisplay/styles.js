export const styles = theme => ({
  pdf_title: {
    fontSize: 12,
    fontFamily: 'Noto Sans',
    margin: `${theme.spacing(0.2)}px 0px`,
    textAlign: 'center',
    color: 'dimgrey',
    marginBottom: theme.spacing(1),
    marginTop: theme.spacing(2),
    '@media (max-width: 600px)': {
      marginTop: theme.spacing(2) + 50,
    },
  },
  pagination: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
    fontSize: 12,
    fontFamily: 'Noto Sans',
    color: 'dimgrey',
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(0.5),
    '@media (max-width: 600px)': {
      marginTop: 50,
    },
  },
  loading: {
    display: 'flex',
    height: '80vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  no_selected_title: {
    color: 'dimgrey',
    textAlign: 'center',
    paddingTop: theme.spacing(30),
    fontSize: 18,
  },
  pdf_text: {
    paddingTop: 270,
    [theme.breakpoints.down('sm')]: {
      paddingTop: 180,
    },
    textAlign: 'center',
  },
  takesTime: {
    fontSize: 12,
    lineHeight: '18px',
  },
  not_allowed: {
    cursor: 'url(/block.png) 18 18, auto',
  },
  allowed: {
    cursor: 'pointer',
  },
});
