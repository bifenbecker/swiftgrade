export const styles = () => ({
  read_book_image: {
    margin: 'auto',
    justifyContent: 'center',
    display: 'flex',
    alignItems: 'center',
    height: 'calc(100vh - 100px)',
  },
  read_book_icon: {
    width: 500,
    height: 466,
    '@media (max-width: 960px)': {
      width: 420,
      height: 392,
    },
    '@media (max-width: 460px)': {
      width: '80%',
    },
  },
});
