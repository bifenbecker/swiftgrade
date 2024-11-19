export const styles = theme => ({
  student_answer_image: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    objectFit: 'contain',
    '-o-object-fit': 'contain',
    '@media (max-width: 992px)': {
      maxWidth: '100% !important',
    },
  },
  student_unit_image: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    maxHeight: 40,
    maxWidth: 100,
    border: '1px solid black',
  },
});
