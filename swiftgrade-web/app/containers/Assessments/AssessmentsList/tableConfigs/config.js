import '../styles.scss';

const TABLE_STYLE = { width: '80%', margin: 'auto', border: '1px solid rgba(224, 224, 224, 1)', marginBottom: '80px' };

const MOBILE_PORTRAIT_TABLE_STYLE = {
  width: '93%',
  margin: '15px auto 100px',
  border: '1px solid rgba(224, 224, 224, 1)',
};

const MOBILE_PORTRAIT_TABLE_CONTAINER_STYLE = {
  maxHeight: '100%',
  overflowY: 'auto',
  paddingTop: '100px',
  position: 'absolute',
};

const SORT_ORDER = topToBottom => {
  if (topToBottom) {
    return 'desc';
  }
  return 'asc';
};

export { MOBILE_PORTRAIT_TABLE_CONTAINER_STYLE, MOBILE_PORTRAIT_TABLE_STYLE, SORT_ORDER, TABLE_STYLE };
