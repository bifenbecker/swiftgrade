export const styles = () => ({
  icon_card_button: {
    position: 'absolute',
    right: 0,
    top: 10,
    padding: 7,
    zIndex: 1,
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.08)',
    },
  },
  list: {
    paddingRight: 70,
  },
  dropdown_group_list: {
    marginLeft: -185,
  },
  dropdown_group_item: {
    width: 192,
    fontSize: 14,
    color: '#222',
    minHeight: 'auto',
  },
  simple_menu: {
    '&:nth-child(3n - 2)': {
      '& .MuiPaper-root.MuiMenu-paper': {
        marginLeft: -185,
      },
    },
  },
});
