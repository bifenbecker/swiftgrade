import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl, intlShape } from 'react-intl';
import { reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import messages from './messages';

import { GroupFormLayout } from '../Layouts';
import InputField from '../Fields/InputField';

function GroupsRenameForm(props) {
  const { group, intl, invalid, handleSubmit, onCancel } = props;
  return (
    <GroupFormLayout group={group} invalid={invalid} type="rename" onCancel={onCancel} handleSubmit={handleSubmit}>
      <InputField fullWidth name="name" placeholder={intl.formatMessage(messages.newClassName)} />
    </GroupFormLayout>
  );
}

GroupsRenameForm.propTypes = {
  intl: intlShape.isRequired,
  invalid: PropTypes.bool,
  group: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

const withForm = reduxForm({
  form: 'GroupsRenameForm',
  touchOnChange: true,
});

const mapStateToProps = (state, ownProps) => ({
  initialValues: { name: ownProps.group.name },
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  injectIntl,
  withConnect,
  withForm,
)(GroupsRenameForm);
