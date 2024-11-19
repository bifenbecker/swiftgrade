export const styles = theme => ({
  account_icon: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    marginLeft: theme.spacing(0.65),
    cursor: 'pointer',
  },
  circle: {
    width: theme.spacing(3.5),
    height: theme.spacing(3.5),
    borderRadius: '50%',
    cursor: 'pointer',
  },
  circle_icon: {
    width: theme.spacing(3),
    height: theme.spacing(3),
    margin: '0px 6px',
  },
  table_root: {
    padding: theme.spacing(2),
  },
  tutorial_head: {
    textAlign: 'left',
  },
  first_name_column: {
    [theme.breakpoints.only('xs')]: {
      padding: '16px 2px 16px 2px',
    },
    paddingLeft: 0,
    paddingRight: theme.spacing(4),

    '&.not_collapse': {
      '$table_row_class:hover &': {
        '@media not all and (min-resolution:.001dpcm)': {
          '@media': {
            boxShadow: 'inset 0px 10px 4px -10px rgba(60,64,67,0.302), inset 0px -10px 4px -10px rgba(60,64,67,0.302)',
            borderBottom: 'unset',
          },
        },
      },
    },
    '@media (max-width: 600px)': {
      paddingLeft: 15,
      paddingRight: 0,
    },
  },
  second_name_column: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(1),

    '&.not_collapse': {
      '$table_row_class:hover &': {
        '@media not all and (min-resolution:.001dpcm)': {
          '@media': {
            boxShadow: 'inset 0px 10px 4px -10px rgba(60,64,67,0.302), inset 0px -10px 4px -10px rgba(60,64,67,0.302)',
            borderBottom: 'unset',
          },
        },
      },
    },
    '@media (max-width: 600px)': {
      padding: 5,
    },
  },
  email_column: {
    paddingRight: theme.spacing(6),
    paddingLeft: 0,

    '&.not_collapse': {
      '$table_row_class:hover &': {
        '@media not all and (min-resolution:.001dpcm)': {
          '@media': {
            boxShadow: 'inset 0px 10px 4px -10px rgba(60,64,67,0.302), inset 0px -10px 4px -10px rgba(60,64,67,0.302)',
            borderBottom: 'unset',
          },
        },
      },
    },
    '@media (max-width: 600px)': {
      padding: 5,
    },
  },
  total_column: {
    paddingLeft: theme.spacing(5),

    '@media (max-width: 600px)': {
      padding: 5,
    },
  },
  sup: {
    verticalAlign: 'super',
    fontSize: 10,
  },
  table_row_class: {
    position: 'relative',

    '&.collapse': {
      backgroundColor: 'transparent',
      borderRadius: '15px 15px 0px 0px',
      boxShadow: 'rgba(0, 0, 0, 0.10) 2px 1px 2px, rgba(0, 0, 0, 0.10) -2px 1px 2px, rgba(0, 0, 0, 0.10) 0px -1px 3px',

      '&:hover': {
        backgroundColor: 'transparent',
      },
    },
    '&.not_collapse': {
      '&:hover': {
        boxShadow: '0 1px 2px 0 rgba(60,64,67,0.302), 0 2px 6px 2px rgba(60,64,67,0.149)',
        borderRadius: '0.5rem',
        overflow: 'hidden',

        '@media not all and (min-resolution:.001dpcm)': {
          '@supports (-webkit-appearance:none)': {
            ' & .MuiTableCell-root': {
              borderBottom: 'none !important',
            },
          },
        },
      },
      '&.MuiTableRow-root': {
        '&.MuiTableRow-hover:hover': {
          backgroundColor: 'transparent',
        },
      },

      '& td': {
        position: 'relative',
      },

      '&:hover td:after': {
        position: 'absolute',
        content: '""',
        height: 1,
        background: 'rgba(255, 255, 255, 0.7)',
        maxWidth: 'calc(100vw - 30px)',
        width: '100%',
        left: 0,
        right: 0,
        top: -1,
        margin: 'auto',
      },
    },
  },
  table_row_column: {
    '&.collapse': {
      '&:last-child': {
        borderRadius: '0px 15px 0px 0px',
        '$table_row_class:hover &': {},
      },
      '&:first-child': {
        borderRadius: '15px 0px 0px 0px',
        '$table_row_class:hover &': {},
      },
    },
    '@media (max-width: 600px)': {
      padding: '5px 5px 0 5px',
    },

    '&.not_collapse': {
      '$table_row_class:hover &': {
        '@media not all and (min-resolution:.001dpcm)': {
          '@media': {
            '&:first-child': {
              boxShadow:
                'inset 0px 10px 4px -10px rgba(60,64,67,0.302), inset 0px -10px 4px -10px rgba(60,64,67,0.302), inset 10px 0px 4px -10px rgba(60,64,67,0.302)',
              borderRadius: '5px 0px 0px 8px',
              borderBottom: 'unset',
            },
            '&:last-child': {
              boxShadow:
                'inset 0px 10px 4px -10px rgba(60,64,67,0.302), inset 0px -10px 4px -10px rgba(60,64,67,0.302), inset -10px 0px 4px -10px rgba(60,64,67,0.302)',
              borderRadius: '0px 8px 8px 0px',
              borderBottom: 'unset',
            },
          },
        },
      },
    },
  },
  student_answer_image: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
  student_unit_image: {
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
    maxHeight: 40,
    maxWidth: 100,
    border: '1px solid black',
  },
  student_units: {
    border: 'unset',
  },
  id_column: {
    fontWeight: 'normal',
  },
  student_result_table_column: {
    position: 'relative',
    border: '1px solid rgba(224, 224, 224, 1)',
  },
  answer_key_column: {
    fontWeight: 'normal',
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  student_answer_column: {
    fontWeight: 'normal',
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  student_image_column: {
    fontWeight: 'normal',
    paddingLeft: 0,
    paddingRight: 0,
    borderLeft: '1px solid rgba(224, 224, 224, 1)',
    borderRight: '1px solid rgba(224, 224, 224, 1)',
  },
  mark_column: {
    fontWeight: 'normal',
  },
  assessment_item_type: {
    padding: `${theme.spacing(2)}px ${theme.spacing(1)}px`,
  },
  assessment_mark: {
    padding: `${theme.spacing(2)}px ${theme.spacing(0.375)}px`,
    position: 'relative',
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
  mc_answer_letters: {
    fontFamily: 'Symbola, "Times New Roman", serif',
    fontSize: 16,
  },
  need_grading_button: {
    cursor: 'pointer',
    display: 'block',
    textAlign: 'left',
    fontSize: 12,
    '&:hover': {
      textDecoration: 'underline',
    },
  },
});
