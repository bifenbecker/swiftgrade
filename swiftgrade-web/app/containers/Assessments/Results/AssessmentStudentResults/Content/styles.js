export const styles = theme => ({
  table_row_class: {
    backgroundColor: '#fafafa',
    border: '1px solid #d4d4d4',
    '&:hover': {
      backgroundColor: '#fafafa !important',
    },
  },
  table_container: {
    height: 'calc(100vh - 120px) !important',
    padding: '0px 20px 0px 20px',
  },
  id_column: {
    border: '1px solid #d4d4d4',
    fontWeight: 'bold',
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 17,
    background: '#fafafa !important',
  },
  answer_key_column: {
    border: '1px solid #d4d4d4',
    fontWeight: 'bold',
    background: '#fafafa !important',
  },
  student_answer_column: {
    border: '1px solid #d4d4d4',
    fontWeight: 'bold',
    background: '#fafafa !important',
  },
  mark_column: {
    border: '1px solid #d4d4d4',
    fontWeight: 'bold',
    background: '#fafafa !important',
  },
  assessment_item_type: {
    paddingLeft: 0,
    paddingRight: 0,
    fontSize: 17,
  },
  student_result_table_column: {
    border: '1px solid #d4d4d4',
    position: 'relative',
  },
  assessment_mark: {
    padding: `${theme.spacing(2)}px ${theme.spacing(0.375)}px`,
    '&.correct': {
      background: '#BCEFAD !important',
    },
    '&.partially_correct': {
      background: '#ffe48a !important',
    },
    '&.incorrect': {
      background: '#f79196 !important',
    },
  },
  student_image_column: {
    border: '1px solid #d4d4d4',
    fontWeight: 'bold',
    background: '#fafafa !important',
  },
});
