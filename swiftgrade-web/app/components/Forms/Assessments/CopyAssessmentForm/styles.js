export const styles = () => ({
  form: {
    margin: 10,
  },
  buttons: {
    marginTop: 35,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  button: {
    marginRight: 20,
  },
  block_label: {
    display: 'flex',
    alignItems: 'center',
    '&:nth-child(n+2)': {
      marginTop: 20,
    },
  },
  input_root: {
    border: '1px solid #9e9e9e',
    borderRadius: 4,
    padding: '2px 10px 0px 10px',
    minWidth: 217,
  },
  input: {
    padding: '6px 0 7px',
    color: 'currentColor',
    fontSize: 'inherit',
  },
  cards_wrapper: {
    width: '100%',
  },
  input_wrap: {
    position: 'relative',
    width: '100%',
  },
  cards_select: {
    '& ul': {
      scrollbarWidth: 'thin',
      overflow: '-moz-scrollbars-none',
      '&::-webkit-scrollbar': {
        width: 2,
        height: 2,
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#ccc',
      },
    },
  },
  group_id: {
    border: '1px solid #9e9e9e',
    padding: '2px 10px 0px 10px',
  },
  label_item: {
    fontSize: 18,
    paddingRight: 15,
    width: 165,
  },
});
