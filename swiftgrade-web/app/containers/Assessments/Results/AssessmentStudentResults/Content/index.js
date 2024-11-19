import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import _ from 'lodash';
import { Table } from 'components/DataDisplay';
import classNames from 'classnames';
import { checkOnlyStudentAnswersInResults } from 'utils/helpers/results';
import { PAPER_SHEET } from 'globalConstants';

import { styles } from './styles';
import { TotalMarkView } from '../Views';

import {
  STUDENT_RESULTS_COLUMNS,
  STUDENT_RESULTS_WITH_CORRECT_ANSWERS_COLUMNS,
  STUDENT_PAPER_RESULTS_COLUMNS,
  STUDENT_PAPER_RESULTS_WITH_CORRECT_ANSWERS_COLUMNS,
} from './config';
import { TABLE_STYLE } from './constants';

class Content extends React.Component {
  getColumns = () => {
    const getState = () => {
      const isPaperResult = assessment.type === PAPER_SHEET;
      const isAnswer = checkOnlyStudentAnswersInResults(results);

      if (isPaperResult) {
        return isAnswer ? STUDENT_PAPER_RESULTS_COLUMNS : STUDENT_PAPER_RESULTS_WITH_CORRECT_ANSWERS_COLUMNS;
      }
      return isAnswer ? STUDENT_RESULTS_COLUMNS : STUDENT_RESULTS_WITH_CORRECT_ANSWERS_COLUMNS;
    };
    const { classes, expandedStudentMarks, results, assessment } = this.props;

    const COLUMNS = getState();
    return COLUMNS(classes, expandedStudentMarks, this.onDisplayStudentMarks);
  };

  onDisplayStudentMarks = item => {
    const { expandedStudentMarks: currentExpandedStudentMarksState, onChangeState } = this.props;
    const expandedStudentMarks = _.cloneDeep(currentExpandedStudentMarksState);
    const id = `${item.assessment_item_id}_${item.id}`;
    if (expandedStudentMarks.includes(id)) {
      expandedStudentMarks.splice(expandedStudentMarks.indexOf(id), 1);
    } else {
      expandedStudentMarks.push(id);
    }
    onChangeState('expandedStudentMarks', expandedStudentMarks);
  };

  render() {
    const { assessment, classes, results } = this.props;
    const onlyStudentAnswers = checkOnlyStudentAnswersInResults(results);

    if (_.isEmpty(results.data)) {
      return <TotalMarkView assessment={assessment} />;
    }

    return (
      <div>
        <Table
          columns={this.getColumns()}
          containerStyle={{ maxHeight: '100%' }}
          customClassTable={classNames(classes.table_container)}
          data={results.data}
          stickyHeader={false}
          style={TABLE_STYLE(onlyStudentAnswers, assessment.type)}
          tableRowClass={classes.table_row_class}
        />
      </div>
    );
  }
}

Content.propTypes = {
  expandedStudentMarks: PropTypes.array,
  assessment: PropTypes.object,
  classes: PropTypes.object,
  results: PropTypes.object,
  onChangeState: PropTypes.func,
};

export default compose(withStyles(styles))(Content);
