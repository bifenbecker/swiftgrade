import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { DefaultButton } from 'components/Controls';
import { FormattedMessage } from 'react-intl';
import { Grid, Typography } from '@material-ui/core';
import { WindowScroller } from 'react-virtualized';
import { ANSWERS } from 'utils/helpers/assessments/constants';
import _ from 'lodash';
import classNames from 'classnames';
import { compose } from 'redux';
import { isDirty, getFormValues, formValueSelector, reduxForm, change } from 'redux-form/immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getDataForAddingRow, getDataForAddingRows, getDesmos, getMarksCount } from 'utils/helpers/assessments';
import { makeSelectCalculator, makeSelectDesmos } from 'containers/Assessments/config/selectors';
import { setDesmos, setDesmosExpressionAnalysis } from 'containers/Assessments/config/actions';
import { showModal, hideModal } from 'components/Modals/Modal/actions';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import messages from '../messages';

import { ActiveRowView, AnswersView } from '../Views';

import 'react-virtualized/styles.css';
import './styles.scss';

class AssessmentAnswerForm extends React.Component {
  constructor(props) {
    super(props);

    this.addRowRef = React.createRef();
    this.items = React.createRef();

    this.state = {
      answersHeight: null,
      currentRowStyle: null,
      isMultipleRows: false,
      scrollId: null,
    };
  }

  componentDidMount() {
    const { assessment } = this.props;
    const desmos = getDesmos();
    desmos.setExpression({ id: 'answer', latex: '' });
    desmos.observe('expressionAnalysis', (e, data) => this.getExpressionAnalysis(e, data));
    this.props.setDesmos(desmos);

    window.addEventListener('beforeunload', this.onBeforeUnload);
    window.history.pushState(null, null, window.location.href);

    if (
      assessment &&
      assessment.kind === 'generic' &&
      (assessment.status === 'scanned' || (assessment.status === 'ready_for_assignment' && assessment.results_exist))
    ) {
      this.props.change('kind', 'mc');
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { assessmentItems, assessment } = this.props;
    const { assessmentItems: prevAssessmentItems } = prevProps;
    const { currentRowStyle, scrollId, answersHeight } = this.state;
    const answersItem = document.getElementById('answers');
    if (assessment && answersItem) {
      const newAnswersHeight =
        window.innerHeight - answersItem.scrollHeight - answersItem.getBoundingClientRect().top - 120;

      if (answersHeight !== newAnswersHeight) {
        this.setStateData({ answersHeight: newAnswersHeight });
      }
    }
    if (
      !_.isEmpty(scrollId) &&
      (!_.isEqual(scrollId, prevState.scrollId) ||
        (scrollId === 'add-row' && !_.isEqual(assessmentItems, prevAssessmentItems)))
    ) {
      const item = document.getElementById(scrollId);
      const isScroll = currentRowStyle && window.innerHeight - currentRowStyle.top - currentRowStyle.height < 90;
      if (item && (scrollId === 'add-row' || isScroll)) {
        item.scrollIntoView(scrollId === 'add-row' && !isScroll);
      }
      this.setStateData({ currentRowStyle: null, scrollId: null });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { assessment, assessmentItems, isAssessmentChanged, onAssessmentChange } = this.props;
    const { assessmentItems: nextAssessmentItems } = nextProps;

    if (assessment) {
      if (assessmentItems && assessmentItems !== nextAssessmentItems && isAssessmentChanged === false) {
        onAssessmentChange();
      }
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onBeforeUnload);
  }

  onBeforeUnload = e => {
    const { isAssessmentChanged } = this.props;
    const isDirtyForm = _.isBoolean(isAssessmentChanged) ? isAssessmentChanged : this.props.isDirty;
    if (isDirtyForm) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  addRows = multipleRows => {
    const { assessmentItems } = this.props;

    if (assessmentItems && assessmentItems.size >= 100) {
      this.showError();
    } else {
      const data = getDataForAddingRows(assessmentItems, multipleRows, this.props);

      this.setStateData({ isMultipleRows: false });
      this.setFormData(data);
    }
  };

  addRow = index => {
    const { assessmentItems } = this.props;

    if (assessmentItems && assessmentItems.size >= 100) {
      this.showError();
    } else {
      const data = getDataForAddingRow(assessmentItems, index, this.props);
      this.setFormData(data, index);

      if (!_.isNull(index)) {
        const assessmentItem = assessmentItems.get(index);
        const kind = assessmentItem && assessmentItem.toJS ? assessmentItem.toJS().kind : null;
        if (kind) {
          this.props.change('field_for_focus', `assessment_items[${index + 1}].answers.${kind}[0].body`);
        }
        this.setScrollId(index, kind, assessmentItems.size);
      } else {
        const { kind } = this.props;
        if (kind) {
          // This logic keeps focus on math or numeric field after click on "Plus" button
          this.props.change('field_for_focus', `answers.${kind}[0].body`);
        }
        this.setScrollId(index, kind, assessmentItems.size);
      }
    }
  };

  getButtonText = resultsExist => {
    const { assessment } = this.props;
    if (resultsExist) {
      return <FormattedMessage {...messages.saveAndRemark} />;
    }
    return assessment ? <FormattedMessage {...messages.saveChanges} /> : <FormattedMessage {...messages.create} />;
  };

  getExpressionAnalysis = (e, desmos) => {
    const { controller } = this.props.desmos;

    Object.keys(desmos.expressionAnalysis).map(key => {
      _.set(desmos.expressionAnalysis[key], 'fraction_mode', controller.canDisplayEvaluationForItemAsFraction(key));
      return key;
    });
    this.props.setDesmosExpressionAnalysis(desmos.expressionAnalysis);
  };

  getValueByKey = (data, key, kind) =>
    data
      .get(kind)
      .get(0)
      .get(key);

  setScrollId = (index, kind, size) => {
    // check it needs to add changes for MF type
    const i = kind === 'numeric' ? index + 2 : index + 1;
    const scrollId = _.isNull(index) || i >= size ? 'add-row' : `assessment_items[${i}].answers[0].body`;
    const currentRow =
      _.isNull(index) || i >= size
        ? document.getElementById('add-row')
        : document.getElementById(`assessment_items[${index}].answers[0].body`);
    this.setStateData({ currentRowStyle: currentRow ? currentRow.getBoundingClientRect() : null, scrollId });
  };

  setStateData = data => this.setState(data);

  setFormData = (data, index = null) => {
    const { answers, kind } = this.props;

    if (_.isNull(index)) {
      let answersItems = ANSWERS;

      if (['mf', 'numeric'].includes(kind)) {
        let mathAnswers = kind === 'numeric' ? answersItems.get('numeric') : answersItems.get('mf');
        if (kind === 'numeric') {
          const sn = this.getValueByKey(answers, 'scientific_notation', 'numeric');
          const tolerance = this.getValueByKey(answers, 'tolerance', 'numeric');
          if (_.isNumber(sn)) {
            mathAnswers = mathAnswers.update(0, i => i.set('scientific_notation', sn));
          } else {
            mathAnswers = mathAnswers.update(0, i => i.set('scientific_notation', null));
          }
          mathAnswers = mathAnswers.update(0, i => i.set('tolerance', tolerance));
        }
        const unit = this.getValueByKey(answers, 'unit', kind);
        if (unit) {
          mathAnswers = mathAnswers.update(0, i => i.set('unit', unit));
        }
        answersItems = answersItems.set(kind, mathAnswers);
      }
      const answerMarks = this.getValueByKey(answers, 'marks', kind);
      const answersWithUpdatedMarks = answersItems.get(kind).update(0, i => i.set('marks', answerMarks));
      answersItems = answersItems.set(kind, answersWithUpdatedMarks);

      this.props.change('answers', answersItems);
    }
    this.props.change('assessment_items', data);
  };

  showError = () => {
    const { classes, group, hideModal: onClose } = this.props;
    this.props.showModal({
      type: 'error',
      overflow: '',
      body: (
        <div className={classes.answer_limit_view}>
          <FormattedMessage {...messages.limitAssessmentItemsError} />
          <div className={classes.answer_limit_view_button}>
            <DefaultButton
              text={<FormattedMessage {...messages.ok} />}
              onClick={onClose}
              backgroundColor={group.color}
            />
          </div>
        </div>
      ),
    });
  };

  renderActiveRow = (isMultipleRows, disabled) => {
    const { isMobile, renderCalculatorComponent, calculator } = this.props;
    return (
      <Fragment>
        <ActiveRowView
          addRowRef={this.addRowRef}
          disabled={disabled}
          group={this.props.group}
          isMobile={isMobile}
          isMultipleRows={isMultipleRows}
          addRow={this.addRow}
          addRows={this.addRows}
          change={this.props.change}
          setStateData={this.setStateData}
          calculator={calculator}
          renderCalculatorComponent={renderCalculatorComponent}
        />
      </Fragment>
    );
  };

  renderAssessmentItems = (disabled, isGenericAssessment, scrollStyle) => (
    <AnswersView
      desmos={this.props.desmos}
      disabled={disabled}
      group={this.props.group}
      isGenericAssessment={isGenericAssessment}
      isMobile={this.props.isMobile}
      list={this.items}
      addRowKind={this.props.kind}
      scrollStyle={scrollStyle}
      addRow={this.addRow}
      change={this.props.change}
      setDesmos={this.props.setDesmos}
      setStateData={this.setStateData}
      renderCalculatorComponent={this.props.renderCalculatorComponent}
      calculator={this.props.calculator}
    />
  );

  renderButtons = (disabled, isGenericAssessment) => {
    const { assessment, assessmentItems, classes, group, isAssessmentChanged, isMobile, kind } = this.props;
    const len = assessmentItems && assessmentItems.size ? assessmentItems.size : 0;
    const createOrSaveButtonText = this.getButtonText(disabled);

    if (len === 0) {
      return null;
    }
    return (
      <Grid
        id="assessment-form-buttons"
        alignItems="flex-start"
        container
        direction="row"
        justify="space-between"
        className={classNames(classes.footer, {
          edit_assessment_with_results: disabled && !isGenericAssessment,
          isMobile,
          isMC: kind === 'mc',
        })}
      >
        <Grid item>
          <DefaultButton
            className={classes.action_assessment_btn}
            tabIndex={-1}
            backgroundColor={group.color}
            disabled={!_.isNull(assessment) && !isAssessmentChanged}
            text={createOrSaveButtonText}
            type="submit"
          />
        </Grid>
        <Grid item className={classes.total_marks}>
          <Typography>
            <FormattedMessage {...messages.totalMarks} values={{ count: getMarksCount(assessmentItems) }} />
          </Typography>
        </Grid>
      </Grid>
    );
  };

  render() {
    const { assessment, assessmentItems, classes, handleSubmit } = this.props;
    const { isMultipleRows, answersHeight } = this.state;
    const disabled = !_.isNull(assessment) && assessment.results_exist;
    const isGenericAssessment = !_.isNull(assessment) && _.has(assessment, 'kind') && assessment.kind === 'generic';
    const isScrollExist = answersHeight ? answersHeight < 70 : false;

    return (
      <form
        className={classes.form}
        role="button"
        tabIndex="0"
        onKeyPress={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
        onSubmit={handleSubmit}
      >
        <WindowScroller>
          {scrollStyle => (
            <Fragment>
              {this.renderAssessmentItems(disabled, isGenericAssessment, scrollStyle)}
              <div
                className={classNames(classes.add_row_wrapper, {
                  itemsExist: assessmentItems && assessmentItems.size > 0,
                  edit_assessment_with_results: disabled && !isGenericAssessment && !isScrollExist,
                })}
              >
                <hr className={classes.line} />
              </div>
              {(!disabled || (disabled && isGenericAssessment)) && this.renderActiveRow(isMultipleRows, disabled)}
              {this.renderButtons(disabled, isGenericAssessment)}
              <div className="desmos" id="desmos" />
            </Fragment>
          )}
        </WindowScroller>
      </form>
    );
  }
}

AssessmentAnswerForm.propTypes = {
  isDirty: PropTypes.bool,
  isMobile: PropTypes.bool,
  calculator: PropTypes.any,
  desmos: PropTypes.any,
  kind: PropTypes.string,
  name: PropTypes.string,
  answers: PropTypes.object,
  assessment: PropTypes.object,
  assessmentItems: PropTypes.object,
  classes: PropTypes.object,
  group: PropTypes.object,
  heights: PropTypes.object,
  history: PropTypes.object,
  setting: PropTypes.object,
  size: PropTypes.object,
  change: PropTypes.func,
  handleSubmit: PropTypes.func,
  hideModal: PropTypes.func,
  setDesmos: PropTypes.func,
  setDesmosExpressionAnalysis: PropTypes.func,
  setFormValue: PropTypes.func,
  showModal: PropTypes.func,
  isAssessmentChanged: PropTypes.bool,
  onAssessmentChange: PropTypes.func,
  renderCalculatorComponent: PropTypes.func,
};

AssessmentAnswerForm.defaultProps = {
  assessment: null,
};

const withForm = reduxForm({
  form: 'AssessmentForm',
  touchOnChange: false,
});

const selector = formValueSelector('AssessmentForm');
const mapStateToProps = createStructuredSelector({
  answers: state => selector(state, 'answers'),
  assessmentItems: state => selector(state, 'assessment_items'),
  calculator: makeSelectCalculator(),
  desmos: makeSelectDesmos(),
  fieldForFocus: state => selector(state, 'field_for_focus'),
  heights: state => selector(state, 'heights'),
  initialValues: state => getFormValues('AssessmentForm')(state),
  isDirty: state => isDirty('AssessmentForm')(state),
  kind: state => selector(state, 'kind'),
  name: state => selector(state, 'name'),
  setting: state => selector(state, 'setting'),
});

const mapDispatchToProps = dispatch => ({
  hideModal(data) {
    dispatch(hideModal(data));
  },
  setDesmos(data) {
    dispatch(setDesmos(data));
  },
  setDesmosExpressionAnalysis(data) {
    dispatch(setDesmosExpressionAnalysis(data));
  },
  setFormValue(name, value) {
    dispatch(change('AssessmentForm', name, value));
  },
  showModal(data) {
    dispatch(showModal(data));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withForm,
  withConnect,
  withStyles(styles),
)(AssessmentAnswerForm);
