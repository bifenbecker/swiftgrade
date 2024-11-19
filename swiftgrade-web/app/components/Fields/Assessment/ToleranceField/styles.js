export const styles = theme => ({
  tolerance_select: {
    height: theme.spacing(2),
    border: '1px solid #CCCCCC',
    borderRadius: 4,
    padding: '6px 10px 3px 5px',
    fontSize: 12,
    margin: '4px 0',
    [theme.breakpoints.only('xs')]: {
      fontSize: 11,
      padding: '4px 10px 3px 3px',
    },
  },
});
