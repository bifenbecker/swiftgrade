import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Field, FieldArray } from 'redux-form/immutable';
import { Grid, withStyles, Tooltip } from '@material-ui/core';
import { AutoSizer, CellMeasurer, CellMeasurerCache, List } from 'react-virtualized';
import classNames from 'classnames';
import _ from 'lodash';
import { checkIsShowProgressMarker } from 'utils/helpers/assessments';
import { AnswerField, FlagField } from '../Fields';
import { TITLES } from '../constants';
import { styles } from '../styles';
import messages from '../messages';

class AnswersView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      clicked: null,
      timer: null,
    };

    this.cache = new CellMeasurerCache({
      defaultHeight: 60,
      fixedWidth: true,
      keyMapper: index => index,
    });
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

  renderTitle = classes => (
    <Grid
      container
      direction="row"
      justify="space-between"
      alignItems="stretch"
      className={classes.assessment_items_title}
    >
      {TITLES(classes).map(title => (
        <Grid item xs={title.xs} md={title.md} className={title.className}>
          {title.message}
        </Grid>
      ))}
    </Grid>
  );

  curtainClick = (index, kind) => {
    const { timer } = this.state;
    const timing = {
      mc: 2000,
      fib: 5000,
      numeric: 5000,
    };
    clearTimeout(timer);
    this.setState({
      clicked: index,
      timer: setTimeout(() => this.setState({ clicked: null }), timing[kind] || 5000),
    });
  };

  getCalculator = item => {
    const { renderCalculatorComponent, calculator } = this.props;

    if (calculator && calculator.name === `${item}.body.unit`) {
      return renderCalculatorComponent;
    }
  };

  renderAnswer = (classes, heights, item, index, kind, setting) => {
    const { assessment, assessmentItems, isMobile, saveStudentAnswers } = this.props;
    const { clicked } = this.state;

    return (
      <Fragment>
        <Grid
          item
          xs={11}
          md={11}
          className={classNames(classes.assessment_item_content, classes.assessment_item_answer, 'answer', {
            lastItem: assessmentItems.size === index + 1,
          })}
          key={item}
          style={{ position: 'relative' }}
        >
          {this.getCalculator(item)}
          <AnswerField
            assessment={assessment}
            assessmentItems={assessmentItems}
            heights={heights}
            index={index}
            isMobile={isMobile}
            kind={kind}
            name={item}
            setting={setting}
            recomputeRowHeights={() => this.recomputeRowHeights(index)}
            saveStudentAnswers={saveStudentAnswers}
            clicked={clicked === index}
            curtainClick={this.curtainClick}
          />
        </Grid>
      </Fragment>
    );
  };

  renderAssessmentItem = props => {
    const { key, parent, index, style } = props;
    const { assessment, assessmentItems, classes, heights } = parent.props.fieldProps;

    const item = `assessment_items[${index}]`;
    const assessmentItem = assessmentItems.get(index);
    const kind = assessmentItem.get('kind');
    const setting = assessmentItem.get('setting');

    const isShowProgressMarker = checkIsShowProgressMarker(assessmentItem, kind, setting);

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
            className={classes.assessment_item}
          >
            <Tooltip title={<FormattedMessage {...messages.answered} />} arrow>
              <div
                className={classes.progress_component}
                style={{ background: isShowProgressMarker ? assessment.group.color : '#fff' }}
              />
            </Tooltip>
            <Grid
              item
              xs={1}
              md={1}
              className={classNames(classes.assessment_item_content, classes.assessment_item_index, {
                lastItem: assessmentItems.size === props.index + 1,
              })}
            >
              {this.renderFlag(assessmentItem, item)}
              <div className={classes.assessment_item_number}>{props.index + 1}</div>
            </Grid>
            {this.renderAnswer(classes, heights, item, props.index, kind, setting)}
          </Grid>
        )}
      </CellMeasurer>
    );
  };

  renderAssessmentItemsWithPDF = props => {
    const { fields } = props;
    return (
      <AutoSizer style={{ width: '100%', height: '80%' }}>
        {autoSizerStyle => (
          <List
            autoHeight
            data={fields}
            fieldProps={props}
            height={autoSizerStyle.height}
            overscanRowCount={20}
            ref={this.props.list}
            rowCount={fields.length}
            deferredMeasurementCache={this.cache}
            rowHeight={this.getRowHeight}
            rowRenderer={this.renderAssessmentItem}
            width={autoSizerStyle.width}
          />
        )}
      </AutoSizer>
    );
  };

  renderAssessmentItems = props => {
    const { fields, scrollStyle } = props;
    return (
      <AutoSizer disableHeight>
        {autoSizerStyle => (
          <List
            autoHeight
            data={fields}
            fieldProps={props}
            overscanRowCount={15}
            height={scrollStyle.height}
            isScrolling={scrollStyle.isScrolling}
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

  renderFlag = (assessmentItem, itemName) => {
    const { saveStudentAnswers } = this.props;
    const flagName = `${itemName}.is_flag_checked`;
    return <Field component={FlagField} key={flagName} name={flagName} onBlur={saveStudentAnswers} />;
  };

  render() {
    const { assessment, assessmentItems, classes, heights, isLayoutWithPDF, scrollStyle } = this.props;
    const { clicked } = this.state;
    return (
      <div id="answers" className={classes.assessment_items_container}>
        {this.renderTitle(classes)}
        <FieldArray
          component={isLayoutWithPDF ? this.renderAssessmentItemsWithPDF : this.renderAssessmentItems}
          classes={classes}
          name="assessment_items"
          assessment={assessment}
          assessmentItems={assessmentItems}
          heights={heights}
          scrollStyle={scrollStyle}
          clicked={clicked}
        />
      </div>
    );
  }
}

AnswersView.propTypes = {
  assessment: PropTypes.object,
  assessmentItems: PropTypes.object,
  classes: PropTypes.object,
  heights: PropTypes.object,
  isLayoutWithPDF: PropTypes.bool,
  isMobile: PropTypes.bool,
  list: PropTypes.object,
  scrollStyle: PropTypes.object,
  saveStudentAnswers: PropTypes.func,
  renderCalculatorComponent: PropTypes.func,
  calculator: PropTypes.object,
};

AnswersView.defaultProps = {
  isLayoutWithPDF: false,
  scrollStyle: null,
};

export default withStyles(styles)(AnswersView);
