import React from 'react';
import PropTypes from 'prop-types';
import { InputField } from 'components/Fields';
import { DefaultButton } from 'components/Controls';
import { Field, reduxForm } from 'redux-form/immutable';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';
import messages from './messages';

function RenameAssessmentNameForm(props) {
  const { classes, group, intl, invalid, handleSubmit, onCancel } = props;
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Field
        component={InputField}
        fullWidth
        max={50}
        name="name"
        placeholder={intl.formatMessage(messages.newAssessmentName)}
      />
      <div className={classes.buttons}>
        <div className={classes.button}>
          <DefaultButton borderRadius={4} text={<FormattedMessage {...messages.cancel} />} onClick={onCancel} />
        </div>
        <div>
          <DefaultButton
            backgroundColor={group.color}
            borderRadius={4}
            disabled={invalid}
            type="submit"
            text={<FormattedMessage {...messages.rename} />}
          />
        </div>
      </div>
    </form>
  );
}

RenameAssessmentNameForm.propTypes = {
  intl: intlShape.isRequired,
  invalid: PropTypes.bool,
  classes: PropTypes.object,
  group: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

const withForm = reduxForm({
  form: 'RenameAssessmentNameForm',
  touchOnChange: true,
});

const mapStateToProps = (state, ownProps) => ({
  initialValues: { name: ownProps.assessment.name },
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
)(RenameAssessmentNameForm);
