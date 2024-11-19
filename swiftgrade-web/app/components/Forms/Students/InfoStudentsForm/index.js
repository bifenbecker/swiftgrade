import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { InputField } from 'components/Fields';
import { DefaultButton } from 'components/Controls';
import { Field, reduxForm } from 'redux-form/immutable';
import { getGroupsRequest, setGroups } from 'containers/Groups/actions';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import classNames from 'classnames';
import { styles } from './styles';
import messages from './messages';
import { RESULTS_TAB_STUDENT_FIELDS, STUDENT_FIELDS } from './constants';

class InfoStudentsForm extends React.Component {
  renderCancelSaveButtons = (classes, group, invalid) => (
    <Fragment>
      <div className={classes.button}>
        <DefaultButton
          borderRadius={4}
          text={<FormattedMessage {...messages.cancel} />}
          onClick={this.props.onCancel}
        />
      </div>
      <div>
        <DefaultButton
          backgroundColor={group.color}
          borderRadius={4}
          disabled={invalid}
          type="submit"
          text={<FormattedMessage {...messages.save} />}
        />
      </div>
    </Fragment>
  );

  renderOkayButton = (classes, group, invalid) => (
    <DefaultButton
      backgroundColor={group.color}
      borderRadius={4}
      disabled={invalid}
      onClick={this.props.onCancel}
      text={<FormattedMessage {...messages.okay} />}
    />
  );

  render() {
    const { classes, disabled, group, type, invalid, handleSubmit, intl } = this.props;
    const { formatMessage } = intl;

    const fieldsList = type === 'students' ? STUDENT_FIELDS : RESULTS_TAB_STUDENT_FIELDS(disabled);
    const renderButtons = type === 'results_named' ? this.renderOkayButton : this.renderCancelSaveButtons;

    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        {fieldsList.map(data => {
          const placeholder = formatMessage(data.message);
          const title = data.title ? formatMessage(data.title) : null;
          return (
            <div className={classes.block_input}>
              {!_.isNull(title) && <div className={classes.title}>{title}</div>}
              <Field
                component={InputField}
                name={data.name}
                fullWidth
                placeholder={placeholder}
                disabled={data.disabled}
                max={_.has(data, 'maxLength') ? data.maxLength : null}
                customErrorClass={classNames(classes.error, {
                  results: ['results_named', 'results_unnamed'].includes(type),
                })}
              />
            </div>
          );
        })}
        <div className={classes.buttons}>{renderButtons(classes, group, invalid)}</div>
      </form>
    );
  }
}

InfoStudentsForm.propTypes = {
  disabled: PropTypes.bool,
  intl: intlShape.isRequired,
  invalid: PropTypes.bool,
  classes: PropTypes.object,
  group: PropTypes.object,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  getGroupsRequest: PropTypes.func,
  setGroups: PropTypes.func,
  groups: PropTypes.any,
  type: PropTypes.string,
  student: PropTypes.object,
};

InfoStudentsForm.defaultProps = {
  disabled: false,
  type: 'students',
};

const withForm = reduxForm({
  form: 'InfoStudentsForm',
  touchOnChange: true,
});

const mapDispatchToProps = {
  getGroupsRequest,
  setGroups,
};

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    first_name: ownProps.student.first_name,
    last_name: ownProps.student.last_name,
    username: ownProps.student.username,
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
  withForm,
  withStyles(styles),
)(InfoStudentsForm);
