import React from 'react';
import PropTypes from 'prop-types';
import { Field, change } from 'redux-form/immutable';
import { Grid, Tooltip } from '@material-ui/core';
import _ from 'lodash';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectDesmos } from 'containers/Assessments/config/selectors';
import { required } from 'utils/validations';
import { setAnswerAndMarksAfterSettingChanges } from 'utils/helpers/assessments';
import { setDesmos } from 'containers/Assessments/config/actions';
import { hideModal, showModal } from 'components/Modals/Modal/actions';
import { updateCurrentUserRequest } from 'containers/App/actions';
import { AutoCorrectModal } from 'components/Modals';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { SETTING_OPTIONS } from '../constants';

class Setting extends React.Component {
  componentWillReceiveProps(nextProps) {
    const { isAddRow, setting } = nextProps;

    if (!isAddRow && this.props.setting !== setting) {
      this.props.recomputeRowHeights();
    }
  }

  getKeyDifference = difference => {
    if (_.isEqual(difference, ['significant_figure'])) {
      return 'significant_figure';
    }
    if (_.isEqual(difference, ['scientific_notation'])) {
      return 'scientific_notation';
    }
    if (_.isEqual(difference, ['autocorrection'])) {
      return 'autocorrection';
    }
    return 'unit';
  };

  onChange = (v, props) => {
    let value = _.cloneDeep(props.input.value);

    if (value.includes(v)) {
      const index = value.indexOf(v);
      value = value.delete(index);
    } else {
      value = value.push(v);
    }

    const prevValue = props.input.value.toJS();
    const newValue = value.toJS();

    this.setAnswerAndMarks(prevValue, newValue);
    props.input.onChange(value);
  };

  setAnswerAndMarks = (prevValue, newValue) => {
    const { kind } = this.props;

    const oldValues = _.difference(prevValue, newValue);
    const newValues = _.difference(newValue, prevValue);

    const isNew = _.isEmpty(oldValues);

    const key = this.getKeyDifference(isNew ? newValues : oldValues);
    setAnswerAndMarksAfterSettingChanges(key, kind, isNew, this.props);
  };

  onDoNotShowACTutorial = user => {
    const enabledPopups = {
      ...user.enabled_popups,
      auto_correct: false,
    };

    this.props.updateCurrentUserRequest({
      data: { enabled_popups: enabledPopups },
      userId: user.id,
    });
  };

  renderSetting = props => {
    const { classes, disabled, kind, group } = this.props;
    const settingOptions = SETTING_OPTIONS(kind) || [];
    return (
      <div className={classNames(classes.settings_container, kind)}>
        {!_.isEmpty(settingOptions) &&
          settingOptions.map(option => (
            <Tooltip title={option.tooltip} arrow placement="top">
              <div
                key={option.key}
                role="button"
                tabIndex={-1}
                className={classNames(
                  classes.option,
                  {
                    [classes.active_option]: props.input.value.includes(option.value),
                    disabled: disabled && option.value === 'unit',
                  },
                  {
                    active: props.input.value.includes(option.value) && option.value === 'unit',
                  },
                )}
                onClick={() => {
                  this.onChange(option.value, props);
                  if (
                    option.value === 'autocorrection' &&
                    props.user &&
                    _.has(props.user, 'enabled_popups') &&
                    (!_.has(props.user.enabled_popups, 'auto_correct') || props.user.enabled_popups.auto_correct)
                  )
                    AutoCorrectModal({
                      classes,
                      color: group.color,
                      showModal: this.props.showModal,
                      hideModal: this.props.hideModal,
                      onDoNotShowACTutorial: this.onDoNotShowACTutorial,
                      user: props.user,
                    });
                }}
              >
                {option.label}
                <div
                  className={classNames({
                    unit: option.value === 'unit',
                    significant_figure: option.value === 'significant_figure',
                  })}
                />
              </div>
            </Tooltip>
          ))}
      </div>
    );
  };

  render() {
    const { classes, isAddRow, kind, name, multipleSubAnswers, multipleWithSettingOn, user } = this.props;

    return (
      <Grid
        item
        xs={2}
        sm={2}
        md={2}
        className={classNames(
          classes.assessment_item_setting,
          { [classes.add_row_content]: isAddRow },
          { [classes.assessment_item_content]: !isAddRow },
          { multiple: multipleSubAnswers, multiple_with_setting: multipleWithSettingOn },
        )}
      >
        {kind !== 'mc' && (
          <Field placeholder="" component={this.renderSetting} user={user} name={name} validate={[required]} />
        )}
      </Grid>
    );
  }
}

Setting.propTypes = {
  disabled: PropTypes.bool,
  kind: PropTypes.string,
  name: PropTypes.string,
  classes: PropTypes.object,
  setting: PropTypes.object,
  isAddRow: PropTypes.bool,
  recomputeRowHeights: PropTypes.func,
  multipleSubAnswers: PropTypes.bool,
  multipleWithSettingOn: PropTypes.bool,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
  user: PropTypes.object,
  updateCurrentUserRequest: PropTypes.func,
  group: PropTypes.object,
};

Setting.defaultProps = {
  setting: null,
  isAddRow: false,
};

const mapStateToProps = createStructuredSelector({
  desmos: makeSelectDesmos(),
  user: makeSelectCurrentUser(),
});

const mapDispatchToProps = dispatch => ({
  changeFormValue(name, value) {
    dispatch(change('AssessmentForm', name, value));
  },
  setDesmos(data) {
    dispatch(setDesmos(data));
  },
  hideModal() {
    dispatch(hideModal());
  },
  showModal(data) {
    dispatch(showModal(data));
  },
  updateCurrentUserRequest(data) {
    dispatch(updateCurrentUserRequest(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Setting);
