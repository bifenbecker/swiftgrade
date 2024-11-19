export const styles = () => ({
  checklist_tutorial_wrapper: {},
  checklist_wrapper: {
    listStyle: 'none',
  },
  circle_wrapper: {
    height: '2rem',
    width: '2rem',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  done_circle_wrapper: {
    fontSize: '2rem',
    height: '2rem',
    width: '2rem',
    color: '#0F3AE8',
    '&.isPassed': {
      color: '#00D260',
    },
  },
  todo_circle_wrapper: {
    height: '2rem',
    width: '2rem',
  },
  done_step_text: {
    textDecoration: 'line-through',
    color: '#555555',
  },
  todo_step_text: {
    color: '#555555',
  },
  line_wrapper: {
    display: 'flex',
    alignItems: 'center',
    padding: '3px 35px',
    '&.isBottomChecklist': {
      padding: '3px 0',
    },
  },
  linear_bar: {
    height: '20px',
    borderRadius: '20px',
    marginTop: '15px',
  },
  linear_bar_container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'end',
    padding: '0 15px',
    position: 'relative',
    '&.isBottomChecklist': {
      padding: 0,
    },
  },
  linear_bar_wrapper: {
    width: '100%',
  },
  percentage_wrapper: {
    position: 'absolute',
    fontWeight: 'bold',
    color: '#fff',
    '&.isLessHalf': {
      color: 'unset',
    },
    '&.isPassed': {
      color: '#fff',
    },
  },
});
