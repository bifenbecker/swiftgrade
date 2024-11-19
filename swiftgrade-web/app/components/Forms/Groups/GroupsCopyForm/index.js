import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { reduxForm } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

import { GroupFormLayout } from '../Layouts';
import InputField from '../Fields/InputField';

function GroupsCopyForm(props) {
  const { classes, group, intl, invalid, handleSubmit, onCancel } = props;
  return (
    <Fragment>
      <div className={classes.copy_text_container}>
        <FormattedMessage {...messages.copyText} />
      </div>
      <GroupFormLayout group={group} invalid={invalid} onCancel={onCancel} handleSubmit={handleSubmit}>
        <InputField fullWidth name="name" placeholder={intl.formatMessage(messages.copiedClassName)} />
      </GroupFormLayout>
    </Fragment>
  );
}

GroupsCopyForm.propTypes = {
  intl: intlShape.isRequired,
  invalid: PropTypes.bool,
  classes: PropTypes.object,
  group: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

const withForm = reduxForm({
  form: 'GroupsCopyForm',
  touchOnChange: true,
});

const mapStateToProps = (state, ownProps) => ({
  initialValues: { name: `${ownProps.group.name} —  copy` },
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
)(GroupsCopyForm);
