import React from 'react';
import PropTypes from 'prop-types';
import { Field, formValueSelector, reduxForm } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { DefaultButton, RadioGroup } from 'components/Controls';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { styles } from './styles';
import messages from './messages';

const OPTIONS = [
  { key: 'mark', value: 'mark', label: <FormattedMessage {...messages.finalMark} /> },
  {
    key: 'mark_plus_student_answers',
    value: 'mark_plus_student_answers',
    label: <FormattedMessage {...messages.finalMarkPlusStudentAnswers} />,
  },
  {
    key: 'mark_plus_student_answers_plus_correct_answers',
    value: 'mark_plus_student_answers_plus_correct_answers',
    label: <FormattedMessage {...messages.finalMarkPlusStudentAnswersPlusCorrectAnswers} />,
  },
];

const THEME = color =>
  createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
    },
  });

function EmailForm(props) {
  const { classes, group, type, handleSubmit, onCancel } = props;
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.title}>
        <FormattedMessage {...messages.selectWhatShouldBeEmailed} />
      </div>
      <ThemeProvider theme={THEME(group.color)}>
        <Field name="type" component={RadioGroup} options={OPTIONS} value={type} />
      </ThemeProvider>
      <div className={classes.buttons}>
        <div className={classes.button}>
          <DefaultButton borderRadius={4} text={<FormattedMessage {...messages.cancel} />} onClick={onCancel} />
        </div>
        <div>
          <DefaultButton
            backgroundColor={group.color}
            borderRadius={4}
            type="submit"
            text={<FormattedMessage {...messages.email} />}
          />
        </div>
      </div>
    </form>
  );
}

EmailForm.propTypes = {
  type: PropTypes.string,
  classes: PropTypes.object,
  group: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

const withForm = reduxForm({
  form: 'EmailForm',
  touchOnChange: true,
});

const selector = formValueSelector('EmailForm');
const mapStateToProps = state => {
  const defaultValues = {
    initialValues: { type: 'mark' },
    type: selector(state, 'type'),
  };
  return defaultValues;
};

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  withForm,
  withStyles(styles),
)(EmailForm);
