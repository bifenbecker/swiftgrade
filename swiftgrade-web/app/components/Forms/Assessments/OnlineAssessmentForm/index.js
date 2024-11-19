import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { WindowScroller } from 'react-virtualized';
import _ from 'lodash';
import { change, formValueSelector, isDirty } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getDesmos } from 'utils/helpers/assessments';
import { getInitValueOnlineAssessmentForm } from 'utils/helpers/assessments/initialization';
import { makeSelectDesmos } from 'containers/Assessments/config/selectors';
import { reduxForm } from 'redux-form/lib/immutable';
import { setDesmos, setDesmosExpressionAnalysis } from 'containers/Assessments/config/actions';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';
import messages from './messages';
import { DefaultButton } from '../../../Controls';
import AnswersView from './AnswersView';

class OnlineAssessmentForm extends React.Component {
  constructor(props) {
    super(props);
    this.items = React.createRef();
  }

  componentDidMount() {
    const desmos = getDesmos();
    desmos.setExpression({ id: 'answer', latex: '' });
    desmos.observe('expressionAnalysis', (e, data) => this.getExpressionAnalysis(e, data));
    this.props.setDesmos(desmos);

    window.addEventListener('beforeunload', this.onBeforeUnload);
    window.history.pushState(null, null, window.location.href);
  }

  componentDidUpdate(prevProps) {
    const { assessmentItems } = this.props;
    const { assessmentItems: prevAssessmentItems } = prevProps;

    if (prevAssessmentItems !== assessmentItems && _.isNil(assessmentItems) && prevAssessmentItems) {
      this.props.setFormValue('assessment_items', prevAssessmentItems);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('beforeunload', this.onBeforeUnload);
  }

  onBeforeUnload = e => {
    if (this.props.isDirty) {
      e.preventDefault();
      e.returnValue = '';
    }
  };

  getExpressionAnalysis = (e, desmos) => {
    const { controller } = this.props.desmos;

    Object.keys(desmos.expressionAnalysis).map(key => {
      _.set(desmos.expressionAnalysis[key], 'fraction_mode', controller.canDisplayEvaluationForItemAsFraction(key));
      return key;
    });
    this.props.setDesmosExpressionAnalysis(desmos.expressionAnalysis);
  };

  render() {
    const {
      assessment,
      assessmentItems,
      classes,
      heights,
      isLayoutWithPDF,
      isMobile,
      handleSubmit,
      onSubmitButtonClick,
      saveStudentAnswers,
    } = this.props;

    if (_.isNull(assessment) || !assessmentItems) {
      return null;
    }
    const layout = scrollStyle => (
      <Fragment>
        <div className={classes.content}>
          <AnswersView
            assessment={assessment}
            assessmentItems={assessmentItems}
            heights={heights}
            list={this.items}
            isLayoutWithPDF={isLayoutWithPDF}
            isMobile={isMobile}
            scrollStyle={scrollStyle}
            saveStudentAnswers={saveStudentAnswers}
            calculator={this.props.calculator}
            renderCalculatorComponent={this.props.renderCalculatorComponent}
          />
        </div>
        <div className={classes.submit_btn}>
          <DefaultButton
            backgroundColor={assessment.group.color}
            text={<FormattedMessage {...messages.submit} />}
            onClick={onSubmitButtonClick}
          />
        </div>
      </Fragment>
    );

    return (
      <form
        className={classes.form}
        onSubmit={handleSubmit}
        role="button" // eslint-disable-line jsx-a11y/no-noninteractive-element-to-interactive-role
        onKeyPress={e => {
          if (e.key === 'Enter') {
            e.preventDefault();
          }
        }}
      >
        {isLayoutWithPDF ? layout(null) : <WindowScroller>{scrollStyle => layout(scrollStyle)}</WindowScroller>}
      </form>
    );
  }
}

OnlineAssessmentForm.propTypes = {
  assessment: PropTypes.object,
  assessmentItems: PropTypes.object,
  classes: PropTypes.object,
  formValues: PropTypes.object,
  handleSubmit: PropTypes.func,
  heights: PropTypes.object,
  isDirty: PropTypes.bool,
  isMobile: PropTypes.bool,
  isLayoutWithPDF: PropTypes.bool,
  calculator: PropTypes.any,
  desmos: PropTypes.any,
  history: PropTypes.object,
  size: PropTypes.object,
  change: PropTypes.func,
  onSubmitButtonClick: PropTypes.func,
  saveStudentAnswers: PropTypes.func,
  setDesmos: PropTypes.func,
  setDesmosExpressionAnalysis: PropTypes.func,
  setFormValue: PropTypes.func,
  renderCalculatorComponent: PropTypes.func,
};

const withForm = reduxForm({
  form: 'OnlineAssessmentForm',
  touchOnChange: true,
});

const selector = formValueSelector('OnlineAssessmentForm');
const mapStateToProps = createStructuredSelector({
  initialValues: (state, ownProps) => getInitValueOnlineAssessmentForm(ownProps),
  assessmentItems: state => selector(state, 'assessment_items'),
  heights: state => selector(state, 'heights'),
  desmos: makeSelectDesmos(),
  isDirty: state => isDirty('OnlineAssessmentForm')(state),
});

const mapDispatchToProps = dispatch => ({
  setDesmos(data) {
    dispatch(setDesmos(data));
  },
  setDesmosExpressionAnalysis(data) {
    dispatch(setDesmosExpressionAnalysis(data));
  },
  setFormValue(name, value) {
    dispatch(change('OnlineAssessmentForm', name, value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withForm,
  withStyles(styles),
)(OnlineAssessmentForm);
