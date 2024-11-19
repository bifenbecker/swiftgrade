import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { AssessmentNoContentArrow } from 'images';
import { AutoSizer, CellMeasurer, List, CellMeasurerCache } from 'react-virtualized';
import { FieldArray, formValueSelector } from 'redux-form/immutable';
import { FormattedMessage } from 'react-intl';
import { Grid, withWidth, Tooltip } from '@material-ui/core';
import { IconPlus, IconMinus } from 'components/Svgs';
import { makeSelectCalculator } from 'containers/Assessments/config/selectors';
import _ from 'lodash';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import InfoIcon from '@material-ui/icons/Info';
import { Answers, Setting, Kind } from '../../Fields';
import IconButton from '../IconButton';

import { TITLES } from '../../constants';
import { styles } from '../styles';

import 'react-virtualized/styles.css';
import messages from '../../messages';
import '../font/style.scss';

class AnswersView extends React.Component {
  constructor(props) {
    super(props);

    this.cache = new CellMeasurerCache({
      defaultHeight: 60,
      fixedWidth: true,
      keyMapper: index => index,
    });
  }

  componentWillReceiveProps(nextProps) {
    const { width } = nextProps;

    if (this.props.width !== width && this.props.list && this.props.list.current) {
      this.cache.clearAll();
      this.props.list.current.measureAllRows();
    }
  }

  getRowHeight = ({ index }) => {
    const { _cellHeightCache: cellHeightCache } = this.cache;

    if (_.has(cellHeightCache, index)) {
      return cellHeightCache[index];
    }
    return this.cache.rowHeight(index);
  };

  recomputeRowHeights = index => {
    this.cache.clear(index);
    this.props.list.current.recomputeRowHeights(index);
  };

  renderAssessmentItemsTitle = (classes, width) => (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="stretch"
      className={classes.assessment_items_title}
    >
      {TITLES(classes, width).map(title => (
        <Grid item xs={title.xs} md={title.md} className={title.className}>
          {title.key === 'answer' ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                alignItems: 'center',
              }}
            >
              <div className={classes.assessment_item_answer_title}>{title.messages.answers}</div>
              <div className={classes.assessment_item_marks_title}>{title.messages.marks}</div>
            </div>
          ) : (
            <Fragment>{title.message}</Fragment>
          )}
        </Grid>
      ))}
    </Grid>
  );

  renderActions = (actionsDisabled, classes, fields, index, multipleSubAnswers, multipleWithSettingOn) => {
    const tooltipPlus = <FormattedMessage {...messages.addRowTooltip} />;
    const tooltipMinus = <FormattedMessage {...messages.removeRowTooltip} />;

    return (
      <Grid
        item
        xs={1}
        md={1}
        className={classNames(classes.assessment_item_content, classes.assessment_item_action, {
          multiple: multipleSubAnswers,
          multiple_with_setting: multipleWithSettingOn,
        })}
      >
        <div className={classes.active_row_buttons}>
          <div />
          <Tooltip title={tooltipPlus} arrow placement="bottom">
            <div className={classNames(classes.assessment_item_action_button, { disabled: actionsDisabled })}>
              <IconButton
                disabled={actionsDisabled}
                icon={<IconPlus className={classes.action_icon} />}
                onClick={() => this.props.addRow(index)}
              />
              <div />
            </div>
          </Tooltip>
          <Tooltip title={tooltipMinus} arrow plasment="bottom">
            <div className={classNames(classes.assessment_item_action_button, 'right', { disabled: actionsDisabled })}>
              <IconButton
                hoverStyle={{ color: 'red', margin: 0, padding: 0 }}
                disabled={actionsDisabled}
                icon={
                  <IconMinus className={classNames(classes.assessment_item_action_minus_btn, classes.action_icon)} />
                }
                onClick={() => {
                  fields.remove(index);
                  this.recomputeRowHeights(index);
                }}
              />
              <div />
            </div>
          </Tooltip>
          <div />
        </div>
      </Grid>
    );
  };

  renderAnswers = (assessmentItems, answers, classes, heights, item, index, kind, setting) => {
    const { addRowKind, change, disabled, isMobile, renderCalculatorComponent, calculator } = this.props;

    return (
      <Grid
        item
        xs={6}
        sm={7}
        md={5}
        className={classNames(classes.assessment_item_content, classes.assessment_item_answer, 'answer')}
        key={`${item}.answers.${kind}`}
      >
        <Answers
          renderCalculatorComponent={renderCalculatorComponent}
          calculator={calculator}
          addRowKind={addRowKind}
          answers={answers}
          assessmentItems={assessmentItems}
          disabled={disabled}
          group={this.props.group}
          heights={heights}
          index={index}
          isAddRow={false}
          isMobile={isMobile}
          kind={kind}
          name={`${item}.answers.${kind}`}
          setting={setting.get(kind)}
          size={assessmentItems && assessmentItems.size ? assessmentItems.size : 0}
          addRow={this.props.addRow}
          changeField={change}
          recomputeRowHeights={() => this.recomputeRowHeights(index)}
          setStateData={this.props.setStateData}
        />
      </Grid>
    );
  };

  renderAssessmentItem = props => {
    const { key, parent, index, style } = props;
    const { assessmentItems, classes, disabled, isGenericAssessment, heights, fields } = parent.props.fieldProps;

    const item = `assessment_items[${index}]`;
    const assessmentItem = assessmentItems.get(index);
    const kind = assessmentItem.get('kind');
    const answers = assessmentItem.get('answers').get(kind);
    const setting = assessmentItem.get('setting');

    const subAnswersLen = answers && answers.toJS ? answers.size : 0;
    const activeSettingLen = setting ? setting.get(kind).size : 0;
    const multipleWithSettingOn =
      subAnswersLen > 1 &&
      activeSettingLen > 0 &&
      kind === 'numeric' &&
      !(activeSettingLen === 1 && setting.get(kind).includes('scientific_notation'));
    const multipleSubAnswers = subAnswersLen > 1 && !multipleWithSettingOn;

    const actionsDisabled = isGenericAssessment ? !isGenericAssessment && disabled : disabled;

    return (
      <CellMeasurer cache={this.cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        {({ registerChild }) => (
          <Grid
            id={item}
            alignItems="stretch"
            container
            direction="row"
            justify="space-between"
            key={item}
            ref={registerChild}
            style={style}
            className={classNames(classes.assessment_item, {
              lastItem: assessmentItems.size === props.index + 1,
            })}
            onKeyPress={e => {
              if (e.key === 'Enter' && kind === 'mc' && (!disabled || (disabled && isGenericAssessment))) {
                this.props.addRow(props.index);
              }
            }}
          >
            <Grid
              item
              xs={1}
              md={1}
              className={classNames(classes.assessment_item_content, classes.assessment_item_index, {
                multiple: multipleSubAnswers,
                multiple_with_setting: multipleWithSettingOn,
              })}
            >
              <div>{props.index + 1}</div>
            </Grid>
            <Kind
              assessmentItems={assessmentItems}
              classes={classes}
              disabled={disabled}
              index={props.index}
              name={`${item}.kind`}
              value={kind}
              recomputeRowHeights={() => this.recomputeRowHeights(index)}
              multipleSubAnswers={multipleSubAnswers}
              multipleWithSettingOn={multipleWithSettingOn}
            />
            {this.renderAnswers(assessmentItems, answers, classes, heights, item, props.index, kind, setting)}
            <Setting
              assessmentItems={assessmentItems}
              classes={classes}
              group={this.props.group}
              disabled={disabled}
              index={props.index}
              kind={kind}
              name={`${item}.setting.${kind}`}
              setting={setting}
              recomputeRowHeights={() => this.recomputeRowHeights(index)}
              multipleSubAnswers={multipleSubAnswers}
              multipleWithSettingOn={multipleWithSettingOn}
            />
            {this.renderActions(
              actionsDisabled,
              classes,
              fields,
              props.index,
              multipleSubAnswers,
              multipleWithSettingOn,
            )}
          </Grid>
        )}
      </CellMeasurer>
    );
  };

  renderAssessmentItemsField = props => {
    const { fields, scrollStyle } = props;
    return (
      <AutoSizer disableHeight>
        {autoSizerStyle => (
          <List
            autoHeight
            data={fields}
            fieldProps={props}
            height={scrollStyle.height}
            isScrolling={scrollStyle.isScrolling}
            overscanRowCount={15}
            ref={this.props.list}
            rowCount={fields.length}
            deferredMeasurementCache={this.cache}
            rowHeight={this.getRowHeight}
            rowRenderer={this.renderAssessmentItem}
            scrollTop={scrollStyle.scrollTop}
            width={autoSizerStyle.width}
            onScroll={scrollStyle.onChildScroll}
          />
        )}
      </AutoSizer>
    );
  };

  renderNoContent = classes => {
    const answers = <span className={classes.answers}>answers</span>;

    const titles = (
      <div>
        <FormattedMessage {...messages.answerAssessmentText} values={{ answers }} />
        <br />
        <br />
        <FormattedMessage {...messages.questionAssessmentText} />
      </div>
    );

    return (
      <Grid
        container
        direction="column"
        className={classes.no_content}
        // Because of this logic user can not click on setting button when calculator is opened
        // className={classNames(classes.no_content, { isVirtualKeyboardOpened: !_.isEmpty(this.props.calculator) })}
      >
        <Grid item style={{ fontSize: 26, padding: '4px 0px 30px', textDecoration: 'underline' }}>
          <span className={classes.info_icon_wrapper}>
            <FormattedMessage {...messages.answerAssessment} />

            <Tooltip title={titles} arrow>
              <div className={classes.info_icon_container}>
                <InfoIcon style={{ fontSize: 30, paddingLeft: '10px' }} />
              </div>
            </Tooltip>
          </span>
        </Grid>
        <Grid item style={{ fontSize: 21.5, padding: '4px 0px' }}>
          <FormattedMessage {...messages.noContentMessageFirst} />
        </Grid>
        <Grid item style={{ fontSize: 17, padding: '4px 0px' }}>
          <FormattedMessage {...messages.noContentMessageSecond} />
        </Grid>
        <Grid item>
          <img className={classes.no_content_image} src={AssessmentNoContentArrow} alt="" />
        </Grid>
      </Grid>
    );
  };

  render() {
    const {
      activeRow,
      assessmentItems,
      classes,
      disabled,
      heights,
      scrollStyle,
      width,
      isGenericAssessment,
      addRowKind,
    } = this.props;

    if (_.isEmpty(assessmentItems) || assessmentItems.size === 0) {
      return this.renderNoContent(classes);
    }

    return (
      <div id="answers" className={classNames(classes.rows_content, { isMC: addRowKind === 'mc' })}>
        {this.renderAssessmentItemsTitle(classes, width)}
        <FieldArray
          activeRow={activeRow}
          assessmentItems={assessmentItems}
          name="assessment_items"
          disabled={disabled}
          classes={classes}
          heights={heights}
          component={this.renderAssessmentItemsField}
          scrollStyle={scrollStyle}
          isGenericAssessment={isGenericAssessment}
        />
      </div>
    );
  }
}

AnswersView.propTypes = {
  addRowKind: PropTypes.string,
  activeRow: PropTypes.any,
  width: PropTypes.string,
  calculator: PropTypes.object,
  disabled: PropTypes.bool,
  isMobile: PropTypes.bool,
  assessmentItems: PropTypes.object,
  classes: PropTypes.object,
  desmos: PropTypes.object,
  heights: PropTypes.object,
  list: PropTypes.object,
  scrollStyle: PropTypes.object,
  group: PropTypes.object,
  change: PropTypes.func,
  addRow: PropTypes.func,
  setDesmos: PropTypes.func,
  setStateData: PropTypes.func,
  isGenericAssessment: PropTypes.bool,
  renderCalculatorComponent: PropTypes.func,
};

const selector = formValueSelector('AssessmentForm');
const mapStateToProps = createStructuredSelector({
  assessmentItems: state => selector(state, 'assessment_items'),
  heights: state => selector(state, 'heights'),
  calculator: makeSelectCalculator(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  withWidth(),
  withStyles(styles),
)(AnswersView);
