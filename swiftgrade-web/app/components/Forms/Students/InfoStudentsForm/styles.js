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
  block_input: {
    width: '100%',
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
  },
  title: {
    minWidth: 120,
    width: '50%',
  },
  error: {
    margin: '2px 0px',
    fontSize: 14,
    color: 'red',
    position: 'absolute',
    marginTop: 55,
    '&.results': {
      paddingLeft: 120,
    },
  },
});
