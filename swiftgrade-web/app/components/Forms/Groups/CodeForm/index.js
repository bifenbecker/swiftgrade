import React from 'react';
import PropTypes from 'prop-types';
import { reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { injectIntl, intlShape } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

import { GroupsFormLayout } from '../Layouts';
import CustomInputField from '../Fields/CustomInputField';

function CodeForm(props) {
  const { classes, intl, handleSubmit, onCancel } = props;
  const fieldProps = {
    customErrorClass: classes.error_input_create_class,
    name: 'code',
    placeholder: intl.formatMessage(messages.classCode),
  };
  return (
    <GroupsFormLayout
      type="join"
      onCancel={onCancel}
      handleSubmit={handleSubmit}
      secondaryButtonStyles={{ color: 'white', backgroundColor: '#7f7f7f' }}
    >
      <CustomInputField fieldProps={fieldProps} type="join" />
    </GroupsFormLayout>
  );
}

CodeForm.propTypes = {
  intl: intlShape.isRequired,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

const withForm = reduxForm({ form: 'CodeForm', touchOnChange: true });
const mapStateToProps = () => ({
  initialValues: { code: null },
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  withForm,
  injectIntl,
  withStyles(styles),
)(CodeForm);
