import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl } from 'react-intl';
import { formValueSelector, reduxForm } from 'redux-form/immutable';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import { isAssessmentPasswordExist } from 'utils/helpers/assessments';
import { styles } from './styles';
import messages from './messages';
import { DefaultButton } from '../../../Controls';
import { PasswordField } from '../../Users/Fields';

function StartAssessmentForm(props) {
  const { assessment, classes, handleSubmit, intl, password } = props;

  const placeholder = intl.formatMessage(messages.assessmentPassword);
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {isAssessmentPasswordExist(assessment) && (
        <div className={classes.password_field}>
          <PasswordField
            placeholder={placeholder}
            password={password}
            customClasses={{ root: classes.input_root, input: classes.input, focused: classes.focused }}
          />
        </div>
      )}
      <div className={classes.start_btn_wrapper}>
        <DefaultButton
          className={classes.start_btn}
          text={<FormattedMessage {...messages.start} />}
          backgroundColor={assessment.group.color}
          type="submit"
        />
      </div>
    </form>
  );
}

StartAssessmentForm.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  intl: PropTypes.object,
  password: PropTypes.string,
  settings: PropTypes.object,
};

const withForm = reduxForm({
  form: 'StartAssessmentForm',
  touchOnChange: true,
  initialValues: {
    password: null,
  },
});

const selector = formValueSelector('StartAssessmentForm');
const mapStateToProps = createStructuredSelector({
  password: state => selector(state, 'password'),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  injectIntl,
  withConnect,
  withForm,
  withStyles(styles),
)(StartAssessmentForm);
