import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';
import { CheckboxGroupField, CustomSelectField, InputField, PhoneInputField } from 'components/Fields';
import { DefaultButton } from 'components/Controls';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { Field, reduxForm, getFormValues } from 'redux-form/immutable';
import { List } from 'immutable';
import _ from 'lodash';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { getGroupsRequest, setGroups } from 'containers/Groups/actions';
import { required } from 'utils/validations';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

import { TYPES, TYPES_SCHOOL, SUBJECTS } from './constants';

class NeedMoreInfoForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      phoneValid: true,
    };
  }

  renderLabel = (classes, key) => (
    <Typography className={classes.label}>
      <FormattedMessage {...messages[key]} />
    </Typography>
  );

  onFocus = e => {
    const { autoSelect } = this.props;
    if (autoSelect) {
      e.currentTarget.select();
    }
  };

  render() {
    const { classes, handleSubmit, intl, formValues, initialValues } = this.props;
    const disabled =
      formValues &&
      initialValues &&
      !formValues.every(value => !_.isEmpty(value) && value !== 'empty' && !(List.isList(value) && value.isEmpty()));

    const handleFormPhone = value =>
      value.length > 7 ? this.setState({ phoneValid: false }) : this.setState({ phoneValid: true });

    return (
      <form className={classes.from_containers} onSubmit={handleSubmit}>
        <div className={classes.form_groups}>
          <span>{this.renderLabel(classes, 'title')}</span>
          <Field
            name="gender"
            component={CustomSelectField}
            placeholder={intl.formatMessage(messages.title)}
            validate={[required]}
            tabIndex={0}
            options={TYPES}
            selectClasses={{ root: classes.select_field, focused: classes.select_focused, input: classes.input_select }}
          />
        </div>
        <div className={classes.form_groups_input}>
          {this.renderLabel(classes, 'firstName')}
          <Field
            component={InputField}
            placeholder={intl.formatMessage(messages.firstName)}
            name="first_name"
            max={30}
            customErrorClass={classes.error}
            customClasses={{ root: classes.input_root, input: classes.input, focused: classes.input_focused }}
          />
        </div>
        <div className={classes.form_groups_input}>
          {this.renderLabel(classes, 'lastName')}
          <Field
            component={InputField}
            placeholder={intl.formatMessage(messages.lastName)}
            name="last_name"
            max={30}
            customErrorClass={classes.error}
            customClasses={{ root: classes.input_root, input: classes.input, focused: classes.input_focused }}
          />
        </div>
        <div className={classes.form_groups_input}>
          {this.renderLabel(classes, 'mobileNumber')}
          <Field
            component={PhoneInputField}
            placeholder={intl.formatMessage(messages.mobileNumber)}
            name="phone"
            onChange={handleFormPhone}
            max={30}
            customErrorClass={classes.error}
            customClasses={{ root: classes.input_root, input: classes.input, focused: classes.input_focused }}
          />
        </div>
        <div className={classes.form_groups}>
          {this.renderLabel(classes, 'schoolType')}
          <Field
            name="school_type"
            component={CustomSelectField}
            validate={[required]}
            options={TYPES_SCHOOL}
            onFocus={e => this.onFocus(e)}
            tabIndex={0}
            selectClasses={{ root: classes.select_field, focused: classes.select_focused, input: classes.input_select }}
          />
        </div>
        <div className={classes.form_groups}>
          {this.renderLabel(classes, 'subjectsTaught')}
          <div className={classes.checks_boxes}>
            <Field
              component={CheckboxGroupField}
              name="subjects"
              optionsList={SUBJECTS}
              checkboxClasses={{
                checkbox: {
                  root: classes.checkbox_root,
                  checked: classes.checked_checkbox_root,
                },
                label: { root: classes.checkbox_item, label: classes.checkbox_label },
              }}
            />
          </div>
        </div>
        <div>
          <DefaultButton
            borderRadius={4}
            disabled={disabled || this.state.phoneValid}
            type="submit"
            text={<FormattedMessage {...messages.completeRegistration} />}
            className={classNames(classes.done)}
          />
        </div>
      </form>
    );
  }
}

NeedMoreInfoForm.propTypes = {
  intl: intlShape.isRequired,
  classes: PropTypes.object,
  handleSubmit: PropTypes.func,
  initialValues: PropTypes.object,
  formValues: PropTypes.object,
  autoSelect: PropTypes.bool,
};

const withForm = reduxForm({
  form: 'NeedMoreInfoForm',
  touchOnChange: true,
});

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    gender: ownProps.user.gender,
    first_name: ownProps.user.first_name,
    last_name: ownProps.user.last_name,
    phone: ownProps.user.phone,
    school_type: 'empty',
    subjects: [],
  },
  formValues: getFormValues('NeedMoreInfoForm')(state),
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
)(NeedMoreInfoForm);
