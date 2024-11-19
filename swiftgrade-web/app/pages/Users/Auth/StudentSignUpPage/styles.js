export const styles = () => ({
  icon_join: {
    '& svg': {
      width: 200,
      height: 175,
      '@media only screen and (min-width:1024px) and (max-width: 1366px)': {
        width: 250,
        height: 217,
      },
      '@media (max-width: 1024px) and (min-width: 577px)': {
        width: 240,
        height: 'auto',
      },
    },
  },
});
