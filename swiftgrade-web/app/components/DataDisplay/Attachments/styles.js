export const styles = theme => ({
  attachments_block: {
    width: 100,
    minHeight: 80,
    cursor: 'pointer',
    [theme.breakpoints.only('xs')]: {
      width: 80,
    },
  },
  attachments_icon_wrap: {
    textAlign: 'center',
    paddingRight: 5,
  },
  attachments_icon: {
    width: 33,
    height: 47,
  },
  attachments_text: {
    fontSize: 12,
    textAlign: 'center',
  },
});
