export const styles = theme => ({
  select_classes_container: {
    [theme.breakpoints.down('md')]: {
      fontSize: 14,
      width: '100%',
      padding: `${theme.spacing(2.5)}px ${theme.spacing(1.5)}px ${theme.spacing(2.5)}px ${theme.spacing(3.5)}px`,
    },
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
      width: '100%',
      padding: `${theme.spacing(1)}px ${theme.spacing(1.5)}px ${theme.spacing(1)}px ${theme.spacing(1.5)}px`,
    },
    padding: `${theme.spacing(2.5)}px ${theme.spacing(3.5)}px ${theme.spacing(2.5)}px ${theme.spacing(3.5)}px`,
    position: 'relative',
  },
  any_class_text: {
    [theme.breakpoints.down('md')]: {
      paddingLeft: 0,
      fontSize: 14,
    },
    paddingLeft: theme.spacing(2),
    paddingTop: theme.spacing(0.75),
  },
  select_classes_title: {
    height: '25px',
    lineHeight: '25px',
  },
  checkbox_root: {
    color: '#e0e0e0',
    padding: 0,
    margin: 'auto',
    marginLeft: 0,
    marginRight: 0,
    marginTop: theme.spacing(-0.625),
    cursor: 'pointer',
    pointerEvents: 'visible',
    '&.option_checked': {
      color: '#285EF4',
    },
    '&.option_disabled': {
      color: '#e0e0e0',
      cursor: 'url(/block.png) 18 18, auto',
      pointerEvents: 'none',
    },
  },
  checked_checkbox_root: {
    padding: 5,
  },
  checkbox_label: {
    fontSize: 14,
    minHeight: theme.spacing(3.125),
    cursor: 'pointer',
    pointerEvents: 'visible',
    '&.option_disabled': {
      cursor: 'url(/block.png) 18 18, auto',
      pointerEvents: 'none',
      color: 'rgba(0, 0, 0, 0.38)',
    },
  },
  checkbox_label_root: {
    marginLeft: 0,
    display: 'flex',
    paddingTop: theme.spacing(0.625),
    cursor: 'default',
    '&.option_disabled': {
      cursor: 'url(/block.png) 18 18, auto',
    },
  },
  select_classes_list: {
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(-0.875),
      paddingLeft: 0,
    },
    paddingLeft: theme.spacing(1.25),
    zIndex: 1,
  },
});
