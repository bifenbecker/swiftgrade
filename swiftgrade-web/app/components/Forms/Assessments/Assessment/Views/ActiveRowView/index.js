import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid, Tooltip } from '@material-ui/core';
import { IconDoublePlus, IconPlus } from 'components/Svgs';
import classNames from 'classnames';
import { formValueSelector } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import { Answers, Setting, Kind } from '../../Fields';
import IconButton from '../IconButton';
import MultipleSelectView from '../MultipleSelectView';

import messages from '../../messages';
import { styles } from '../styles';

class ActiveRowView extends React.Component {
  renderMultipleSelect = (assessmentItems, disabled) => (
    <MultipleSelectView
      assessmentItems={assessmentItems}
      disabled={disabled}
      addRows={this.props.addRows}
      setStateData={this.props.setStateData}
    />
  );

  renderActions = (multipleSubAnswers, multipleWithSettingOn) => {
    const { addRow, assessmentItems, classes, disabled, isMultipleRows, setStateData } = this.props;
    const addRowTooltip = <FormattedMessage {...messages.addRowTooltip} />;
    const addMiltipleRowTooltip = <FormattedMessage {...messages.addMultiRowTooltip} />;

    return (
      <Grid
        item
        xs={1}
        md={1}
        id="add-row-actions"
        className={classNames(classes.assessment_item_content, classes.assessment_item_action, {
          multiple: multipleSubAnswers,
          multiple_with_setting: multipleWithSettingOn,
        })}
      >
        <div className={classes.active_row_buttons}>
          <div />
          <Tooltip title={addRowTooltip} arrow placement="top">
            <div className={classes.assessment_item_action_button} id="plus_button">
              <IconButton
                disabled={disabled}
                className={classes.action_buttons}
                icon={<IconPlus className={classes.action_icon} />}
                onClick={() => addRow(null)}
              />
              <div />
            </div>
          </Tooltip>

          {isMultipleRows ? (
            <div className={classes.assessment_item_action_select}>
              {this.renderMultipleSelect(assessmentItems, disabled)}
            </div>
          ) : (
            <Tooltip title={addMiltipleRowTooltip} arrow placement="top">
              <div className={classes.assessment_item_action_button}>
                <IconButton
                  className={classes.action_buttons}
                  icon={<IconDoublePlus className={classes.action_icon} color={disabled ? '#A6A6A6' : '#000000'} />}
                  // disabled={disabled}
                  onClick={() => setStateData({ isMultipleRows: true })}
                />
                <div />
              </div>
            </Tooltip>
          )}
          <div />
        </div>
      </Grid>
    );
  };

  renderAnswers = (kind, setting) => {
    const {
      answers,
      marks,
      classes,
      isMobile,
      addRow,
      change,
      group,
      renderCalculatorComponent,
      calculator,
    } = this.props;
    return (
      <Grid
        item
        xs={6}
        sm={7}
        md={5}
        className={classNames(classes.add_row_content, classes.assessment_item_answer, 'answer')}
      >
        <Answers
          answers={answers && answers.get(kind)}
          disabled={false}
          group={group}
          isAddRow
          isMobile={isMobile}
          kind={kind}
          marks={marks}
          name={`answers.${kind}`}
          setting={setting ? setting.get(kind) : []}
          addRow={addRow}
          changeField={change}
          setStateData={this.props.setStateData}
          calculator={calculator}
          renderCalculatorComponent={renderCalculatorComponent}
        />
      </Grid>
    );
  };

  renderSetting = (answers, kind, multipleSubAnswers, multipleWithSettingOn) => {
    const { classes, marks, group } = this.props;
    return (
      <Setting
        answers={answers}
        classes={classes}
        group={group}
        isAddRow
        kind={kind}
        marks={marks}
        name={`setting.${kind}`}
        multipleSubAnswers={multipleSubAnswers}
        multipleWithSettingOn={multipleWithSettingOn}
      />
    );
  };

  render() {
    const {
      addRow,
      addRowRef,
      answers,
      assessmentItems,
      classes,
      disabled,
      isMobile,
      kind,
      marks,
      setting,
    } = this.props;

    const len = answers && answers.toJS ? answers.get(kind).size : 0;
    const activeSettingLen = setting ? setting.get(kind).size : 0;

    const multipleWithSettingOn =
      len > 1 &&
      activeSettingLen > 0 &&
      kind === 'numeric' &&
      !(activeSettingLen === 1 && setting.get(kind).includes('scientific_notation'));
    const multipleSubAnswers = len > 1 && !multipleWithSettingOn;
    return (
      <div
        id="add-row"
        ref={addRowRef}
        className={classNames(classes.add_row_wrapper, {
          isMobileWithoutItems: isMobile && (!assessmentItems || assessmentItems.size === 0),
          itemsExist: assessmentItems && assessmentItems.size > 0,
        })}
      >
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="stretch"
          className={classes.add_row}
          onKeyPress={e => {
            if (e.key === 'Enter' && kind === 'mc') {
              addRow(null);
            }
          }}
        >
          <Grid
            item
            xs={1}
            md={1}
            className={classNames(classes.add_row_content, classes.assessment_item_add, {
              multiple: multipleSubAnswers,
              multiple_with_setting: multipleWithSettingOn,
            })}
          />
          <Kind
            answers={answers}
            disabled={disabled}
            isAddRow
            name="kind"
            classes={classes}
            marks={marks}
            setting={setting}
            value={kind}
            multipleSubAnswers={multipleSubAnswers}
            multipleWithSettingOn={multipleWithSettingOn}
          />
          {this.renderAnswers(kind, setting)}
          {this.renderSetting(answers, kind, multipleSubAnswers, multipleWithSettingOn)}
          {this.renderActions(multipleSubAnswers, multipleWithSettingOn)}
        </Grid>
      </div>
    );
  }
}

ActiveRowView.propTypes = {
  addRowRef: PropTypes.any,
  disabled: PropTypes.bool,
  isMultipleRows: PropTypes.bool,
  isMobile: PropTypes.bool,
  kind: PropTypes.string,
  answers: PropTypes.object,
  assessmentItems: PropTypes.object,
  classes: PropTypes.object,
  marks: PropTypes.object,
  setting: PropTypes.object,
  addRow: PropTypes.func,
  addRows: PropTypes.func,
  change: PropTypes.func,
  setStateData: PropTypes.func,
  group: PropTypes.object,
  renderCalculatorComponent: PropTypes.func,
  calculator: PropTypes.object,
};

const selector = formValueSelector('AssessmentForm');
const mapStateToProps = createStructuredSelector({
  answers: state => selector(state, 'answers'),
  assessmentItems: state => selector(state, 'assessment_items'),
  kind: state => selector(state, 'kind'),
  marks: state => selector(state, 'marks'),
  setting: state => selector(state, 'setting'),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  withStyles(styles),
)(ActiveRowView);
