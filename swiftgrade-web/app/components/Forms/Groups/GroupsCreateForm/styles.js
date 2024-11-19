export const styles = theme => ({
  groups: {
    flexGrow: 1,
  },
  error_input_create_class: {
    position: 'absolute',
    fontSize: 14,
    color: 'red',
    bottom: -15,
    [theme.breakpoints.only('xs')]: {
      left: 0,
    },
  },
});
