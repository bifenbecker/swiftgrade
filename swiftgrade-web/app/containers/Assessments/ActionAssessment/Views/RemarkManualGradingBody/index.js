import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { DefaultButton, RadioGroup } from 'components/Controls';
import { Field, reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';
import { ThemeProvider, withStyles } from '@material-ui/core/styles';
import { OPTIONS, THEME } from './constants';
import messages from './messages';
import { styles } from './styles';

function RemarkManualGradingBody(props) {
  const { assessment, classes, handleSubmit, onCancel } = props;
  return (
    <form onSubmit={handleSubmit} className={classes.remark_manual_container}>
      <FormattedMessage {...messages.replaceManualBody} />
      <div className={classes.radio_btn_container}>
        <ThemeProvider theme={THEME(assessment.group.color)}>
          <Field component={RadioGroup} name="remark_type" options={OPTIONS} />
        </ThemeProvider>
      </div>
      <div className={classes.buttons_container}>
        <DefaultButton borderRadius={4} text={<FormattedMessage {...messages.cancel} />} onClick={onCancel} />
        <DefaultButton
          backgroundColor={assessment.group.color}
          borderRadius={4}
          className={classes.remark_btn}
          text={<FormattedMessage {...messages.remark} />}
          type="submit"
        />
      </div>
    </form>
  );
}

RemarkManualGradingBody.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

const withForm = reduxForm({
  form: 'RemarkManualGradingForm',
  initialValues: {
    remark_type: 'without_manually_graded',
  },
});

export default compose(
  withForm,
  withStyles(styles),
)(RemarkManualGradingBody);
