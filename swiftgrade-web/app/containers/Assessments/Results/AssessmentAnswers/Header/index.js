import React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { Grid, withWidth, withStyles, Tooltip } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import { CustomSelect, IconButton } from 'components/Controls';
import { Filter, ResultsSavingStatus } from 'components/DataDisplay';
import { setFilters } from 'containers/Assessments/config/actions';
import { makeSelectFilters, makeSelectLoading } from 'containers/Assessments/config/selectors';
import { isNeedGrading } from 'utils/helpers/results/resultsHelper';
import { required } from 'utils/validations';

import { TABS_ANSWER_KEY_ID, TABS_ANSWER_SELECT_ID } from 'globalConstants';
import messages from '../messages';
import { styles } from '../styles';
import { TeacherAnswerView } from '../../Views';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFiltered: false,
      isSaved: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.loading) {
      this.setState({ isSaved: true });
      setTimeout(() => this.setState({ isSaved: false }), 3000);
    }
  }

  getOptions = () => {
    const { numbers } = this.props;
    return numbers.map(number => ({
      key: number,
      label: number,
      value: number,
    }));
  };

  getDataForTeacherAnswer = () => {
    const { assessment, number } = this.props;
    const assessmentItem = assessment.assessment_items.find(a => a.number === number);

    const answer = assessmentItem.answers[0];
    const item = answer;
    item.answer = _.has(answer.body, 'answer') ? answer.body.answer : null;
    item.answers = assessmentItem.answers;
    item.kind = assessmentItem.kind;
    item.multiple_answer = assessmentItem.multiple_answer;
    item.value = _.has(answer.body, 'value') ? answer.body.value : null;
    item.setting = assessmentItem.setting;
    item.header_answer = true;

    return { item, value: assessmentItem.answers };
  };

  setFilters = (filters, isSave = true) => {
    const { assessment, number, orderBy } = this.props;
    this.props.getAnswers(assessment.id, number, filters, orderBy);

    if (isSave) {
      this.props.setFilters(filters);
    }
    this.setState({ isFiltered: true });
  };

  renderAnswerDropdown = options => {
    const { classes, number, onChangeAnswer } = this.props;
    return (
      <Grid item className={classes.answers_select}>
        <CustomSelect
          iconStyle={{ color: '#585858', width: 14, height: 14, marginRight: 6 }}
          options={options}
          placeholder=""
          validate={[required]}
          value={number}
          selectClasses={{ input: classes.answers_select_root }}
          tabIndex={-1}
          onChange={value => onChangeAnswer(value)}
          customPoperClass={classes.answers_select_dropdown}
        />
      </Grid>
    );
  };

  renderAnswersSwitch = () => {
    const { answersData, assessment, classes } = this.props;
    const options = this.getOptions();

    const answersSwitch = (
      <Grid
        container
        className={classes.answers_switch_container}
        id={TABS_ANSWER_SELECT_ID}
        direction="row"
        justify="center"
        alignItems="center"
      >
        <Tooltip title="Previous answer" arrow>
          {this.renderChevronLeft()}
        </Tooltip>
        {this.renderAnswerDropdown(options)}
        <Tooltip title="Next answer" arrow>
          {this.renderChevronRight()}
        </Tooltip>
      </Grid>
    );
    const isShowNeedsGrading =
      assessment.type === 'paper' && !_.isEmpty(answersData) && answersData.some(answer => isNeedGrading(answer));

    return (
      <Grid item>
        {isShowNeedsGrading ? (
          <Grid container direction="column" justify="center" alignItems="center">
            <Grid item>{answersSwitch}</Grid>
            {this.renderNeedGradingButton(assessment, classes)}
          </Grid>
        ) : (
          answersSwitch
        )}
      </Grid>
    );
  };

  renderChevronLeft = () => {
    const { assessment, onSwitchAnswer } = this.props;
    return (
      <Grid item>
        <IconButton
          borderRadius="50%"
          color={assessment.group.color}
          style={{ margin: 0 }}
          icon={<ChevronLeft />}
          onClick={() => onSwitchAnswer('prev')}
        />
      </Grid>
    );
  };

  renderChevronRight = () => {
    const { assessment, onSwitchAnswer } = this.props;
    return (
      <Grid item>
        <IconButton
          borderRadius="50%"
          color={assessment.group.color}
          style={{ margin: 0 }}
          icon={<ChevronRight />}
          onClick={() => onSwitchAnswer('next')}
        />
      </Grid>
    );
  };

  renderFilter = () => {
    const { assessment, filters, classes } = this.props;
    const { isFiltered } = this.state;
    return (
      <Grid item xs={1} className={classes.filter_button}>
        <Filter
          assessment={assessment}
          color={assessment.group.color}
          filters={filters && filters.toJS ? filters.toJS() : filters}
          isFiltered={isFiltered}
          setFilters={this.setFilters}
        />
      </Grid>
    );
  };

  renderNeedGradingButton = (assessment, classes) => (
    <Tooltip title={<FormattedMessage {...messages.removeNeedGrading} />} placement="bottom">
      <Grid
        item
        style={{ color: assessment.group.color }}
        className={classes.need_grading_button}
        onClick={this.props.onRemoveNeedGradingClick}
      >
        <FormattedMessage {...messages.needsGrading} />
      </Grid>
    </Tooltip>
  );

  render() {
    const { answersData, assessment, classes, loading, size, isMobile } = this.props;
    const { isSaved } = this.state;
    const data = !_.isEmpty(answersData) ? this.getDataForTeacherAnswer() : null;

    return (
      <Grid
        container
        direction="row"
        justify="flex-end"
        alignItems="flex-start"
        spacing={2}
        className={classes.answers_header}
      >
        {!_.isEmpty(answersData) && (
          <>
            <ResultsSavingStatus group={assessment.group} loading={loading} isSaved={isSaved} isMobile={isMobile} />
            <Grid id={TABS_ANSWER_KEY_ID} className={classes.answer_item_container}>
              <TeacherAnswerView
                customClasses={classes}
                item={data.item}
                value={data.value}
                size={size}
                isAnswers
                isMobile={isMobile}
              />
            </Grid>
            {this.renderAnswersSwitch()}
          </>
        )}
        {this.renderFilter()}
      </Grid>
    );
  }
}

Header.propTypes = {
  answersData: PropTypes.array,
  assessment: PropTypes.object,
  classes: PropTypes.object,
  filters: PropTypes.array,
  getAnswers: PropTypes.func,
  loading: PropTypes.bool,
  number: PropTypes.number,
  numbers: PropTypes.array,
  onChangeAnswer: PropTypes.func,
  onRemoveNeedGradingClick: PropTypes.func,
  onSwitchAnswer: PropTypes.func,
  orderBy: PropTypes.string,
  setFilters: PropTypes.func,
  size: PropTypes.object,
  isMobile: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  filters: makeSelectFilters(),
  loading: makeSelectLoading(),
});

const mapDispatchToProps = {
  setFilters,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withWidth(),
  withStyles(styles),
)(Header);
