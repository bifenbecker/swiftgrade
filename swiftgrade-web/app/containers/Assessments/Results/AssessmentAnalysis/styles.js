export const styles = () => ({
  body_column: {
    borderBottom: 0,
  },
  loading: {
    display: 'flex',
    flexDirection: 'column',
    height: '90vh',
    justifyContent: 'center',
    alignItems: 'center',
  },
  analysis_key_column_title: {
    borderLeft: '1px solid rgb(224, 224, 224)',
    borderRight: '1px solid rgb(224, 224, 224)',
    paddingLeft: 32,
    paddingRight: 6,
  },
  analysis_key_column: {
    borderLeft: '1px solid rgb(224, 224, 224)',
    borderRight: '1px solid rgb(224, 224, 224)',
    paddingLeft: 6,
    paddingRight: 6,
  },
  analysis_key_column_end: {
    borderLeft: '1px solid rgb(224, 224, 224)',
    borderRight: '1px solid rgb(224, 224, 224)',
    paddingLeft: 6,
    paddingRight: 6,
  },
  number_head: {
    borderLeft: '1px solid rgb(224, 224, 224)',
    borderRight: '1px solid rgb(224, 224, 224)',
    paddingLeft: 6,
    paddingRight: 6,
    '& .MuiButtonBase-root': {
      position: 'relative',
      left: 6,
    },
  },
  head_key: {
    fontSize: 'inherit',
  },
  table_count: {
    fontSize: 16,
  },
  table_ratio: {
    color: 'rgb(166, 166, 166)',
    fontSize: 14,
    position: 'relative',
    right: -6,
  },
  table_height: {
    maxHeight: 'calc(100vh - 120px) !important',
    maxWidth: '99vw',
    overflowX: 'scroll',
  },
  number_wrapper: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&.flag_visible': {
      marginRight: 18,
    },
  },
  flag_icon: {
    color: 'rgb(237, 28, 36)',
    height: 16,
    width: 16,
    marginRight: 2,
  },
  analysis_tooltip: {
    textAlign: 'center',
    maxWidth: 185,
  },
  background: 'red',
});
