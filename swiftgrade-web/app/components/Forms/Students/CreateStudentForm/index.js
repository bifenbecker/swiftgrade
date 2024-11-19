import React from 'react';
import PropTypes from 'prop-types';
import { InputField } from 'components/Fields';
import { DefaultButton } from 'components/Controls';
import { Field, reduxForm } from 'redux-form/immutable';
import { getGroupsRequest, setGroups } from 'containers/Groups/actions';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';
import { STUDENT_FIELDS } from './constants';

function CreateStudentForm(props) {
  const { classes, handleSubmit, intl } = props;
  const { formatMessage } = intl;

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      {STUDENT_FIELDS.map(data => {
        const placeholder = formatMessage(data.message);
        return (
          <div className={classes.block_input}>
            <Field
              component={InputField}
              name={data.name}
              fullWidth
              placeholder={placeholder}
              customClasses={{ root: classes.input_root, focused: classes.input_focused, input: classes.input }}
              customErrorClass={classes.error_input_join}
            />
          </div>
        );
      })}
      <div>
        <DefaultButton
          borderRadius={4}
          type="submit"
          text={<FormattedMessage {...messages.joinClass} />}
          className={classes.joinclass_btn}
        />
      </div>
    </form>
  );
}

CreateStudentForm.propTypes = {
  intl: intlShape.isRequired,
  invalid: PropTypes.bool,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
};

const withForm = reduxForm({
  form: 'CreateStudentForm',
  touchOnChange: true,
});

const mapDispatchToProps = {
  getGroupsRequest,
  setGroups,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
  withForm,
  withStyles(styles),
)(CreateStudentForm);
