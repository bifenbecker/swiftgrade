import { HEADER_ICON_CONTAINER } from '../../commonStyles';

export const styles = theme => ({
  helper_icon: {
    ...HEADER_ICON_CONTAINER,
    marginRight: 40,
    [theme.breakpoints.only('xs')]: {
      '@media (orientation: portrait)': {
        marginRight: 20,
      },
    },
  },
});
