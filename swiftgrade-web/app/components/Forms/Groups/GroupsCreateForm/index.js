import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import { FieldArray, formValueSelector, reduxForm } from 'redux-form/immutable';
import { Map } from 'immutable';
import { injectIntl, intlShape } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

import { GroupsFormLayout } from '../Layouts';
import CustomInputField from '../Fields/CustomInputField';

import { FORM_NAME, ICON } from './constants';

class GroupsCreateForm extends React.Component {
  componentDidMount() {
    const { onFormDidMount } = this.props;

    if (onFormDidMount) {
      onFormDidMount();
    }
  }

  actionClassName = (action, index) => {
    const { groups, change } = this.props;

    let data = groups;
    if (action === 'add') {
      data = groups.push(Map({ name: null }));
    } else {
      data = data.delete(index);
    }
    change('groups', data);
  };

  getGroups = groups => {
    const data = { column1: [], column2: [] };

    groups.map((group, index) => {
      const key = index < 5 ? 'column1' : 'column2';
      data[key].push({ name: group, index });

      return group;
    });
    return data;
  };

  renderGroup = (group, width) => {
    const { classes, groups, intl } = this.props;
    const key = group.index === 0 ? 'add' : 'remove';
    const title = group.index === 0 ? intl.formatMessage(messages.addClass) : intl.formatMessage(messages.removeClass);
    const fieldProps = {
      customErrorClass: classes.error_input_create_class,
      disabled: key === 'add' && groups.size === 10,
      hoverStyle: ICON[key].hoverStyle,
      icon: ICON[key].icon,
      index: group.index,
      key,
      title,
      name: `${group.name}.name`,
      placeholder: intl.formatMessage(messages.className),
      actionClassName: this.actionClassName,
    };
    return <CustomInputField fieldProps={fieldProps} type="create" width={width} />;
  };

  renderGroups = props => {
    const { classes, fields, width } = props;
    if (width <= 450) {
      return (
        <Grid container direction="row" justify="center" alignItems="center" spacing={3} className={classes.groups}>
          {fields.map((group, index) => {
            const data = { name: group, index };
            return this.renderGroup(data, width);
          })}
        </Grid>
      );
    }

    const groups = this.getGroups(fields);
    return (
      <Grid container spacing={3} className={classes.groups}>
        <Grid item xs={6}>
          {groups.column1.map(group => this.renderGroup(group, width))}
        </Grid>
        <Grid item xs={6}>
          {groups.column2.map(group => this.renderGroup(group, width))}
        </Grid>
      </Grid>
    );
  };

  render() {
    const { classes, handleSubmit, onCancel } = this.props;
    return (
      <GroupsFormLayout
        onCancel={onCancel}
        handleSubmit={handleSubmit}
        secondaryButtonStyles={{ color: 'white', backgroundColor: '#7f7f7f' }}
      >
        <FieldArray name="groups" classes={classes} component={this.renderGroups} />
      </GroupsFormLayout>
    );
  }
}

GroupsCreateForm.propTypes = {
  intl: intlShape.isRequired,
  groups: PropTypes.array,
  classes: PropTypes.object,
  change: PropTypes.func,
  handleSubmit: PropTypes.func,
  onCancel: PropTypes.func,
  onFormDidMount: PropTypes.func,
};

const withForm = reduxForm({ form: FORM_NAME, touchOnChange: true });
const selector = formValueSelector(FORM_NAME);

const mapStateToProps = state => {
  const defaultValues = { groups: selector(state, 'groups') };
  defaultValues.initialValues = { groups: [Map({ name: null })] };

  return defaultValues;
};

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  withForm,
  injectIntl,
  withStyles(styles),
)(GroupsCreateForm);
