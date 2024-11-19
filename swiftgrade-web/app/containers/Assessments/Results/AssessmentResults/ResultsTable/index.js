import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'components/DataDisplay';
import { compose } from 'redux';
import { withStyles, withWidth } from '@material-ui/core';
import { styles } from './styles';

import { GROUP_COLOR_RANGE, TABLE_STYLE } from '../constants';
import { COLUMNS, ONLINE_ASSESSMENT_RESULTS_COLUMNS, STUDENT_RESULTS_COLUMNS } from '../config';

class ResultsTable extends React.Component {
  getCollapseColumns = (classes, orderBy) => {
    const { assessment, expandedStudentMarks } = this.props;
    const COLLAPSE_COLUMNS =
      assessment && assessment.type === 'online' ? ONLINE_ASSESSMENT_RESULTS_COLUMNS : STUDENT_RESULTS_COLUMNS;
    return COLLAPSE_COLUMNS(classes, this.props.onDisplayStudentMarks, expandedStudentMarks, orderBy);
  };

  getColumns = classes => {
    const { color, data, group, scans, width } = this.props;
    const isAllResultsSelected = data.length === scans.length;
    return COLUMNS(
      classes,
      color,
      group,
      isAllResultsSelected,
      scans,
      width,
      this.props.onChangeScans,
      this.props.onRemoveNeedGradingClick,
    );
  };

  getContainerStyle = () => {
    const { size } = this.props;
    return {
      maxHeight: size.height - 115,
      minHeight: '90vh',
      minWidth: '500px',
      paddingBottom: 115,
    };
  };

  render() {
    const { classes, collapseScans, data, group, orderBy, assessment } = this.props;
    const openedRowColor = GROUP_COLOR_RANGE.find(obj => obj.color === group.color).lighterColor;
    return (
      <Table
        collapseColumns={this.getCollapseColumns(classes, orderBy)}
        collapseRows={collapseScans}
        columns={this.getColumns(classes)}
        containerStyle={this.getContainerStyle()}
        data={data}
        orderBy={orderBy}
        selectedRowColor={openedRowColor}
        stickyHeader={false}
        style={TABLE_STYLE}
        tableRootClass={classes.table_root}
        tableRowClass={classes.table_row_class}
        onChangeCollapseRows={scan => this.props.onChangeScans(collapseScans, scan.id, 'collapseScans')}
        onOrderByChange={this.props.onChangeOrdering}
        assessment={assessment}
      />
    );
  }
}

ResultsTable.propTypes = {
  assessment: PropTypes.object,
  width: PropTypes.string,
  color: PropTypes.string,
  orderBy: PropTypes.string,
  collapseScans: PropTypes.array,
  data: PropTypes.array,
  expandedStudentMarks: PropTypes.array,
  scans: PropTypes.array,
  classes: PropTypes.object,
  group: PropTypes.object,
  size: PropTypes.object,
  onChangeOrdering: PropTypes.func,
  onChangeScans: PropTypes.func,
  onDisplayStudentMarks: PropTypes.func,
  onRemoveNeedGradingClick: PropTypes.func,
};

export default compose(
  withWidth(),
  withStyles(styles),
)(ResultsTable);
