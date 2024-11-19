import React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'components/Controls';
import { Field, reduxForm, formValueSelector } from 'redux-form/immutable';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { getGroupsRequest, setGroups } from 'containers/Groups/actions';
import { InputField } from 'components/Fields';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { styles } from './styles';
import messages from './messages';

function VerifyEmailForm(props) {
  const { classes, handleSubmit, intl, onSkipVerifyEmail } = props;
  const customInputFieldClasses = { root: classes.input_root, focused: classes.input_focused, input: classes.input };

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <span className={classes.bodyText}>
        <FormattedMessage {...messages.verifyEmailBody} />
      </span>
      <br />
      <br />
      <div className={classes.block_input}>
        <Field
          component={InputField}
          fullWidth
          placeholder={intl.formatMessage(messages.email)}
          name="email"
          max={30}
          customClasses={customInputFieldClasses}
        />
      </div>
      <br />
      <div className={classes.btn_wrapper}>
        <div role="button" className={classes.skip_button} tabIndex={0} onClick={() => onSkipVerifyEmail()}>
          <FormattedMessage {...messages.skip} />
        </div>
        <DefaultButton
          borderRadius={4}
          type="submit"
          text={<FormattedMessage {...messages.verify} />}
          className={classes.verify_btn}
        />
      </div>
    </form>
  );
}

VerifyEmailForm.propTypes = {
  intl: intlShape.isRequired,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSkipVerifyEmail: PropTypes.func,
};

const withForm = reduxForm({
  form: 'VerifyEmailForm',
  touchOnChange: true,
  initialValues: {
    email: null,
  },
});

const selector = formValueSelector('VerifyEmailForm');

const mapStateToProps = createStructuredSelector({
  password: state => selector(state, 'password'),
});

const mapDispatchToProps = {
  getGroupsRequest,
  setGroups,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
  withForm,
  withStyles(styles),
)(VerifyEmailForm);
