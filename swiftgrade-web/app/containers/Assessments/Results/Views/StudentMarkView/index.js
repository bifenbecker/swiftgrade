import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { Grid, IconButton, Tooltip } from '@material-ui/core';
import { IconArrowDown, IconNeedsGrading } from 'components/Svgs';
import { MarkForm } from 'components/Forms';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import { updateResultItemNeedGradingRequest } from 'containers/Assessments/config/actions';
import { makeSelectAssessment, makeSelectFilters } from 'containers/Assessments/config/selectors';
import { getFilters, isBlankGenericAnswer, isNeedGrading } from 'utils/helpers/results/resultsHelper';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { isTeacher } from 'utils/helpers/usersHelper';
import TotalMarkView from './TotalMarkView';
import { styles } from './styles';
import messages from './messages';

const ANSWER_TYPE = data => ({ key: 'answer', name: 'A', data });
const UNIT_TYPE = data => ({ key: 'unit', name: 'U', data });
const SF_TYPE = data => ({ key: 'significant_figure', name: 'SF', data });

const TYPES = ({ marks: { answer, unit, significant_figure: significantFigure }, setting }) => {
  if (setting.includes('unit') && setting.includes('significant_figure')) {
    return [ANSWER_TYPE(answer), UNIT_TYPE(unit), SF_TYPE(significantFigure)];
  }
  if (setting.includes('unit')) {
    return [ANSWER_TYPE(answer), UNIT_TYPE(unit)];
  }
  if (setting.includes('significant_figure')) {
    return [ANSWER_TYPE(answer), SF_TYPE(significantFigure)];
  }
  return [ANSWER_TYPE(answer)];
};

class StudentMarkView extends Component {
  getMarkContent(item, i) {
    const { assessment, classes, orderBy, tabKey, user, filters } = this.props;
    const defaultMark = (i.data && i.data.value) || 0;

    return !isTeacher(user) ? (
      defaultMark
    ) : (
      <MarkForm
        assessment={assessment}
        classes={classes}
        defaultMark={defaultMark}
        filters={filters}
        formId={`MarkForm${i.key}${item.marks.answer.id}`}
        kind={i.key}
        markId={item.marks[i.key].id}
        orderBy={orderBy}
        tabKey={tabKey}
        totalMark={i.data.total}
      />
    );
  }

  getTotalMarkContent(item, i) {
    const { assessment, classes, orderBy, tabKey, user, filters } = this.props;
    return !isTeacher(user) ? (
      i.data.total
    ) : (
      <TotalMarkView
        assessment={assessment}
        filters={filters}
        orderBy={orderBy}
        tabKey={tabKey}
        kind={i.key}
        value={i.data.value}
        total={i.data.total}
        marks={item.marks}
        classes={classes}
      />
    );
  }

  renderExpandedStudentMark = item => {
    const { classes } = this.props;

    let isShowMarks = true;
    if (item.multiple_answer) {
      Object.keys(item.marks).map(key => {
        if (item.marks[key].total < item.marks[key].value) {
          isShowMarks = false;
        }
        return key;
      });
    }
    return (
      <Grid container direction="column" alignItems="center" className={classes.mark_textfield_column}>
        {TYPES(item).map(
          i =>
            i.data && (
              <Grid item className={classes.mark_item}>
                <span className={classes.mark_item_name}>{`${i.name}: `}</span>
                {this.getMarkContent(item, i)}
                {isShowMarks && (
                  <span className={classes.mark_item_total}>
                    {`/ `}
                    {this.getTotalMarkContent(item, i)}
                  </span>
                )}
              </Grid>
            ),
        )}
      </Grid>
    );
  };

  renderNeedsGradingButton = (assessment, classes, item, user) => {
    const { filters, orderBy, tabKey } = this.props;
    const isShowButton = isTeacher(user) && assessment.type === 'paper' && isNeedGrading(item);

    const needsGradingTooltipText = (
      <div>
        <FormattedMessage {...messages.lowConfidence} />
        <br />
        <FormattedMessage {...messages.needsGrading} />
      </div>
    );

    return (
      isShowButton && (
        <Grid item className={classNames(classes.needs_grading_wrap, { answers: tabKey === 'answers' })}>
          <Tooltip title={needsGradingTooltipText} placement="bottom-end">
            <div
              onClick={() => {
                this.props.updateResultItemNeedGradingRequest({
                  data: { result_item_id: item.id },
                  assessment,
                  filters: getFilters(filters),
                  ordering: orderBy,
                  tabKey,
                });
              }}
              role="button"
              tabIndex={-1}
            >
              <IconNeedsGrading className={classes.needs_grading_icon} />
            </div>
          </Tooltip>
        </Grid>
      )
    );
  };

  getSimpleTotalMarkContent(item, isExpandedListExists) {
    const { assessment, user, filters, orderBy, tabKey, classes } = this.props;
    return !isTeacher(user) ? (
      item.mark.total
    ) : (
      <TotalMarkView
        assessment={assessment}
        filters={filters}
        orderBy={orderBy}
        tabKey={tabKey}
        kind="answer"
        total={item.mark.total}
        value={item.mark.student_mark}
        marks={item.marks}
        types={isExpandedListExists && TYPES(item)}
        classes={classes}
      />
    );
  }

  render() {
    const { assessment, classes, expandedStudentMarks, orderBy, resultId, tabKey, item, value, user } = this.props;
    const id = tabKey === 'results' ? `${item.assessment_item_id}_${item.id}` : item.id;
    const isExpandedListExists = 'unit' in item.marks || 'significant_figure' in item.marks;
    if (isBlankGenericAnswer(item)) {
      return null;
    }
    return (
      <Fragment>
        <Grid container direction="row" alignItems="center" justify="center">
          {!isExpandedListExists && isTeacher(user) && (
            <Grid item style={{ paddingTop: 1 }}>
              <MarkForm
                assessment={assessment}
                classes={classes}
                defaultMark={item.marks.answer.value}
                filters={this.props.filters}
                formId={`MarkForm${item.marks.answer.id}`}
                kind="answer"
                markId={item.marks.answer.id}
                orderBy={orderBy}
                resultId={resultId}
                resultItemId={item.id}
                tabKey={tabKey}
                totalMark={item.marks.answer.total}
              />
            </Grid>
          )}
          {(isExpandedListExists || !isTeacher(user)) && <Grid item>{value.student_mark}</Grid>}
          <Grid item>
            {`/`}
            {this.getSimpleTotalMarkContent(item, isExpandedListExists)}
          </Grid>
          {this.renderNeedsGradingButton(assessment, classes, item, user)}
        </Grid>
        {expandedStudentMarks.includes(id) && this.renderExpandedStudentMark(item)}
        {isExpandedListExists && (
          <Tooltip
            title={
              expandedStudentMarks.includes(id) ? (
                <FormattedMessage {...messages.hideMark} />
              ) : (
                <FormattedMessage {...messages.showMark} />
              )
            }
            arrow
          >
            <div>
              <IconButton
                style={{ padding: '6px 3px' }}
                onClick={() => this.props.onDisplayStudentMarks(item)}
                size="small"
                tabIndex={-1}
              >
                <IconArrowDown
                  style={{ transform: expandedStudentMarks.includes(id) && 'rotate(180deg)', width: 14, height: 8 }}
                />
              </IconButton>
            </div>
          </Tooltip>
        )}
      </Fragment>
    );
  }
}

StudentMarkView.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object,
  expandedStudentMarks: PropTypes.array,
  filters: PropTypes.array,
  item: PropTypes.object,
  orderBy: PropTypes.string,
  resultId: PropTypes.number,
  tabKey: PropTypes.string,
  value: PropTypes.object,
  user: PropTypes.object,
  onDisplayStudentMarks: PropTypes.func,
  updateResultItemNeedGradingRequest: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  assessment: makeSelectAssessment(),
  filters: makeSelectFilters(),
  user: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  updateResultItemNeedGradingRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(StudentMarkView);
