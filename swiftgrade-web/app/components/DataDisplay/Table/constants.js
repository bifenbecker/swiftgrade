export const ICON_STYLE = backgroundColor => ({
  height: 25,
  width: '100%',
  margin: 0,
  backgroundColor,
  borderRadius: '0px 0px 15px 15px',
  boxShadow: '2px 1px 2px rgb(0, 0, 0, 0.15), -2px 1px 2px rgb(0, 0, 0, 0.15)',
});

export const COLLAPSE_TABLE_ROW_STYLE = collapse => ({
  visibility: collapse ? 'visible' : 'collapse',
  border: collapse && 'hidden',
});
