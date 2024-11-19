import { HEADER_ICON_CONTAINER } from '../../commonStyles';

export const styles = theme => ({
  whatsapp_icon: {
    ...HEADER_ICON_CONTAINER,
    marginLeft: 40,
    [theme.breakpoints.only('xs')]: {
      '@media (orientation: portrait)': {
        marginRight: 20,
      },
    },
  },
});
