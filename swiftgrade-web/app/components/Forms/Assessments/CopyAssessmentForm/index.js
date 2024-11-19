import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { CustomSelectField, InputField } from 'components/Fields';
import { DefaultButton } from 'components/Controls';
import { Field, reduxForm } from 'redux-form/immutable';
import _ from 'lodash';
import { FormattedMessage, injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { required } from 'utils/validations';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from 'containers/Groups/reducer';
import saga from 'containers/Groups/saga';
import { styles } from './styles';
import messages from './messages';
import { ADMINISTERED_OPTIONS } from './const';

class CopyAssessmentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      groupsListOptions: [],
    };
  }

  componentWillMount() {
    const { groups } = this.props;
    if (_.isArray(groups)) {
      this.setGroupsListOptions(groups);
    }
  }

  setGroupsListOptions = groups => {
    const groupsListOptions = [];
    groups.forEach(group => {
      groupsListOptions.push({ key: group.name, value: group.id, label: group.name });
      return group;
    });
    this.setState({ groupsListOptions });
  };

  onSelectField = (classes, name, options) => (
    <div className={classes.cards_wrapper}>
      <Field
        customPoperClass={classes.cards_select}
        component={CustomSelectField}
        name={name}
        validate={[required]}
        options={options}
        tabIndex={-1}
        selectClasses={{ root: classes.input_root, input: classes.input }}
      />
    </div>
  );

  renderAdministeredField = () => {
    const { classes } = this.props;
    return (
      <div className={classes.block_label}>
        <span className={classes.label_item}>
          <FormattedMessage {...messages.administered} />:
        </span>
        {this.onSelectField(classes, 'type', ADMINISTERED_OPTIONS)}
      </div>
    );
  };

  renderButtons = () => {
    const { classes, group, invalid, onCancel } = this.props;
    return (
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
            text={<FormattedMessage {...messages.copy} />}
          />
        </div>
      </div>
    );
  };

  renderCopyToField = () => {
    const { classes } = this.props;
    const { groupsListOptions } = this.state;
    return (
      <div className={classes.block_label}>
        <span className={classes.label_item}>
          <FormattedMessage {...messages.copyTo} />:
        </span>
        {this.onSelectField(classes, 'group_id', groupsListOptions)}
      </div>
    );
  };

  renderNameField = () => {
    const { classes, intl } = this.props;
    return (
      <div className={classes.block_label}>
        <span className={classes.label_item}>
          <FormattedMessage {...messages.name} />:
        </span>
        <div className={classes.input_wrap}>
          <Field
            component={InputField}
            fullWidth
            max={50}
            name="name"
            placeholder={intl.formatMessage(messages.name)}
            customClasses={{ root: classes.input_root, input: classes.input }}
          />
        </div>
      </div>
    );
  };

  render() {
    const { classes, handleSubmit } = this.props;
    return (
      <form className={classes.form} onSubmit={handleSubmit}>
        {this.renderNameField()}
        {this.renderAdministeredField()}
        {this.renderCopyToField()}
        {this.renderButtons()}
      </form>
    );
  }
}

CopyAssessmentForm.propTypes = {
  classes: PropTypes.object,
  intl: intlShape.isRequired,
  invalid: PropTypes.bool,
  group: PropTypes.object,
  groups: PropTypes.any,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
};

const withForm = reduxForm({
  form: 'CopyAssessmentForm',
  touchOnChange: true,
});

const mapStateToProps = (state, ownProps) => ({
  initialValues: {
    assessment_id: ownProps.assessment.id,
    group_id: ownProps.group.id,
    name: `${ownProps.assessment.name} — Copy`,
    type: 'paper',
  },
  groups: state.get('groups').get('groups'),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

const withReducer = injectReducer({ key: 'groups', reducer });
const withSaga = injectSaga({ key: 'groups', saga });

export default compose(
  withReducer,
  withSaga,
  injectIntl,
  withConnect,
  withForm,
  withStyles(styles),
)(CopyAssessmentForm);
