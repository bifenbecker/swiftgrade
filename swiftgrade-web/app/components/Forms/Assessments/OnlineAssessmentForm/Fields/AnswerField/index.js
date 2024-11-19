import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { change, Field, formValueSelector } from 'redux-form/immutable';
import { Grid, withStyles } from '@material-ui/core';
import { FormattedMessage, injectIntl } from 'react-intl';
import { compose } from 'redux';
import _ from 'lodash';
import classNames from 'classnames';
import { FIBAnswerField, MCAnswerField, MathOnlineAnswerField, OnlineAssessmentUnitField } from 'components/Fields';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getOnlineNextInputName } from 'utils/helpers/assessments/getter';
import { styles } from '../../styles';
import messages from '../../messages';

class AnswerField extends React.Component {
  onClickCurtain = () => {
    const { kind, index, curtainClick } = this.props;
    curtainClick(index, kind);
    const field =
      document.querySelector(`#fib_textfield\\[${index}\\]\\[undefined\\]`) ||
      document.querySelector(`#editable_assessment_items\\[${index}\\]\\.body\\.answer textarea`);
    if (field && field.focus) {
      field.focus();
    }
  };

  componentWillMount() {
    const { index } = this.props;

    if (!_.isNull(index)) {
      this.props.recomputeRowHeights();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { heights, index } = nextProps;

    if (this.props.heights && heights && !_.isNull(index)) {
      const prevHeight = this.props.heights.get(index);
      const height = heights.get(index);

      if (prevHeight !== height) {
        this.props.recomputeRowHeights();
      }
    }
  }

  getComponent = () => {
    const { kind } = this.props;

    if (kind === 'mc') {
      return MCAnswerField;
    }
    if (kind === 'fib') {
      return FIBAnswerField;
    }
    return MathOnlineAnswerField;
  };

  getName = name => {
    const { kind } = this.props;

    if (['numeric', 'mf'].includes(kind)) {
      return `${name}.answer`;
    }
    return name;
  };

  renderUnits = (item, saveStudentAnswers) => (
    <Grid item md={2} sm={4} xs={4} className={this.props.classes.unit_field}>
      <Field
        component={OnlineAssessmentUnitField}
        key={`${item}.unit`}
        name={`${item}.unit`}
        onBlur={saveStudentAnswers()}
      />
    </Grid>
  );

  render() {
    const { assessment, intl, kind, name, index, classes, isMobile, saveStudentAnswers, clicked, setting } = this.props;
    const placeholder = kind === 'fib' ? intl.formatMessage(messages.fillInTheBlankAnswer) : null;
    const itemName = `${name}.body`;
    const answerName = this.getName(itemName);
    const isAntiCheatingMode = assessment && assessment.is_anti_cheating_mode;
    return (
      <Fragment>
        <div className={classNames(classes.answer_wrapper, classes.answer)}>
          <div className={classNames(classes.answer_field, { mc_answer: kind === 'mc' })}>
            <Field
              component={this.getComponent()}
              name={answerName}
              index={index}
              isMobile={isMobile}
              key={answerName}
              placeholder={placeholder}
              formName="OnlineAssessmentForm"
              onBlur={saveStudentAnswers}
              kind={kind}
              getNextInputName={() => getOnlineNextInputName(this.props.assessmentItems, index, kind, setting)}
            />
          </div>
          {setting.includes('unit') && this.renderUnits(itemName, saveStudentAnswers)}
        </div>
        {isAntiCheatingMode && (
          <div
            className={classNames(classes.curtain, { clicked })}
            onClick={this.onClickCurtain}
            role="button"
            tabIndex={-1}
          >
            <span style={{ overflow: 'hidden', whiteSpace: 'nowrap' }}>
              <FormattedMessage {...messages.clickToAnswer} />
            </span>
          </div>
        )}
      </Fragment>
    );
  }
}

AnswerField.propTypes = {
  assessment: PropTypes.object,
  assessmentItems: PropTypes.object,
  classes: PropTypes.object,
  heights: PropTypes.object,
  intl: PropTypes.object,
  index: PropTypes.number,
  isMobile: PropTypes.bool,
  kind: PropTypes.string,
  name: PropTypes.string,
  setting: PropTypes.any,
  recomputeRowHeights: PropTypes.func,
  saveStudentAnswers: PropTypes.func,
  curtainClick: PropTypes.func,
  clicked: PropTypes.bool,
};

AnswerField.defaultProps = {
  heights: null,
  index: null,
  recomputeRowHeights: null,
};

const selector = formValueSelector('OnlineAssessmentForm');
const mapStateToProps = createStructuredSelector({
  fieldForFocus: state => selector(state, 'field_for_focus'),
});

const mapDispatchToProps = dispatch => ({
  setFormValue(name, value) {
    dispatch(change('AssessmentForm', name, value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
  withStyles(styles),
)(AnswerField);
