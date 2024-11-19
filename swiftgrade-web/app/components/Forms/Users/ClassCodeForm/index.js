import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import { reduxForm } from 'redux-form/immutable';
import { DefaultButton } from 'components/Controls';
import messages from './messages';
import ClassCodeField from '../Fields/ClassCodeField';
import { styles } from './styles';

function ClassCodeForm(props) {
  const { classes, handleSubmit } = props;
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.block_input}>
        <ClassCodeField />
      </div>
      <DefaultButton
        borderRadius={4}
        type="submit"
        text={<FormattedMessage {...messages.join} />}
        className={classes.joinclass_btn}
      />
    </form>
  );
}

ClassCodeForm.propTypes = {
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  onSuccess: PropTypes.func,
  onFailure: PropTypes.func,
};

const withForm = reduxForm({
  form: 'ClassCodeForm',
  touchOnChange: true,
  initialValues: {
    code: null,
  },
});

export default compose(
  withForm,
  withStyles(styles),
)(ClassCodeForm);
