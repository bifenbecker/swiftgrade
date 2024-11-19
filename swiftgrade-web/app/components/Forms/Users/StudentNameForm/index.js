import React from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'components/Controls';
import { Field, reduxForm } from 'redux-form/immutable';
import { InputField } from 'components/Fields';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Typography, withStyles } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import messages from './messages';
import { NAME_FIELDS } from './constants';
import { styles } from './styles';

function StudentNameForm(props) {
  const { classes, intl, handleSubmit } = props;
  const { formatMessage } = intl;
  const customInputFieldClasses = { root: classes.input_root, focused: classes.input_focused, input: classes.input };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <Typography variant="h3" className={classes.form_title}>
        <FormattedMessage {...messages.pleaseTellUsYourName} />
      </Typography>
      {NAME_FIELDS.map(data => {
        const placeholder = formatMessage(data.message);
        return (
          <div className={classes.block_input}>
            <Field
              component={InputField}
              fullWidth
              placeholder={placeholder}
              name={data.name}
              max={30}
              customClasses={customInputFieldClasses}
            />
          </div>
        );
      })}
      <div>
        <DefaultButton
          borderRadius={4}
          type="submit"
          text={<FormattedMessage {...messages.finish} />}
          className={classes.btn_finish}
        />
      </div>
    </form>
  );
}

StudentNameForm.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  intl: intlShape.isRequired,
};

const withForm = reduxForm({
  form: 'StudentNameForm',
  touchOnChange: true,
});

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    first_name: ownProps.user.first_name,
    last_name: ownProps.user.last_name,
  },
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
)(StudentNameForm);
