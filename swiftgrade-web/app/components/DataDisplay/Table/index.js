import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import {
  Box,
  Collapse,
  Paper,
  Table as MaterialTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Tooltip,
} from '@material-ui/core';
import _ from 'lodash';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import { IconButton } from 'components/Controls';
import { IconArrowUp } from 'components/Svgs';
import { styles } from './styles';

import { ICON_STYLE, COLLAPSE_TABLE_ROW_STYLE } from './constants';

class Table extends React.Component {
  renderIcon = (item, selectedRowColor) => (
    <IconButton
      icon={<IconArrowUp style={{ height: 20 }} />}
      style={ICON_STYLE(selectedRowColor)}
      onClick={() => {
        if (_.isFunction(this.props.onChangeCollapseRows)) {
          this.props.onChangeCollapseRows(item);
        }
      }}
    />
  );

  renderTableHead = columns => {
    const { orderBy, onOrderByChange } = this.props;
    return (
      <TableHead id="table-header">
        <TableRow>
          {columns.map(column => {
            let classes = {};
            if (_.has(column, 'classNames')) {
              classes = _.isFunction(column.classNames) ? column.classNames(null, false) : column.classNames;
            }
            return (
              <TableCell
                key={column.id}
                align={column.align}
                classes={{ root: this.props.tableRootClass, ...classes }}
                style={{ width: column.width, background: column.headerBackground || '#fafafa' }}
              >
                {orderBy && column.enableSort ? (
                  <TableSortLabel
                    active={orderBy === column.id}
                    direction={orderBy === column.id ? 'asc' : 'desc'}
                    onClick={() => onOrderByChange(column.id, orderBy)}
                    className={this.props.classes.table_sort}
                  >
                    {column.label}
                  </TableSortLabel>
                ) : (
                  column.label
                )}
              </TableCell>
            );
          })}
        </TableRow>
      </TableHead>
    );
  };

  renderCollapseTableHead = columns => (
    <TableHead>
      <TableRow>
        {columns.map(column => (
          <TableCell
            key={column.id}
            align={column.align}
            classes={{ root: this.props.tableRootClass, ...column.classNames }}
            style={{ width: column.width, background: column.headerBackground || '#fafafa', padding: '12px 0px' }}
          >
            {column.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );

  renderCollapseTableBody = (collapseColumns, collapseData, index, assessment) => (
    <TableBody>
      {collapseData.map(collapseItem => (
        <TableRow>
          {collapseColumns.map(column => {
            const value = collapseItem[column.id];

            let classes = {};
            if (_.has(column, 'classNames')) {
              classes = _.isFunction(column.classNames) ? column.classNames(collapseItem) : column.classNames;
            }

            const cellContent = (
              <TableCell
                align={column.align}
                classes={classes}
                key={column.id}
                style={{
                  width: column.width,
                  verticalAlign: _.isFunction(column.verticalAlign) ? column.verticalAlign(collapseItem) : 'center',
                }}
              >
                {column.render ? column.render(value, collapseItem, assessment, index) : value.toString()}
              </TableCell>
            );

            if (column.tooltip) {
              const tooltipMessage = _.isFunction(column.tooltip) ? column.tooltip(collapseItem) : column.tooltip;
              return tooltipMessage ? (
                <Tooltip title={tooltipMessage} placement="right">
                  {cellContent}
                </Tooltip>
              ) : (
                cellContent
              );
            }
            return cellContent;
          })}
        </TableRow>
      ))}
    </TableBody>
  );

  renderCollapseTable = (item, index, collapseColumns, collapse) => {
    const { selectedRowColor, assessment } = this.props;
    return (
      item.data && (
        <TableRow style={COLLAPSE_TABLE_ROW_STYLE(collapse)}>
          <TableCell style={{ padding: 0 }} colSpan={5}>
            <Collapse
              in={collapse}
              timeout="auto"
              unmountOnExit
              style={{ boxShadow: '2px 1px 2px rgb(0, 0, 0, 0.15), -2px 1px 2px rgb(0, 0, 0, 0.15)' }}
            >
              <Box margin={0}>
                <MaterialTable>
                  {this.renderCollapseTableHead(collapseColumns)}
                  {this.renderCollapseTableBody(collapseColumns, item.data, index, assessment)}
                </MaterialTable>
              </Box>
            </Collapse>
            {collapse && this.renderIcon(item, selectedRowColor)}
          </TableCell>
        </TableRow>
      )
    );
  };

  renderTableBody = (columns, data, collapseColumns) => {
    const { collapseRows, tableRowClass, selectedRowColor } = this.props;
    return (
      <TableBody>
        {data.map((item, index) => {
          const collapse = collapseRows.includes(item.id);
          return (
            <Fragment>
              {collapse && collapseColumns && <TableRow style={{ height: 15 }} />}
              <TableRow
                id={`row_${item.id}`}
                classes={{ root: classNames(tableRowClass, { collapse, not_collapse: !collapse }) }}
                hover
                key={item.id}
                selected={collapseColumns && collapse}
                tabIndex={-1}
                style={{ width: 50 }}
                onClick={() => {
                  if (_.isFunction(this.props.onChangeCollapseRows)) {
                    this.props.onChangeCollapseRows(item);
                  }
                }}
              >
                {columns.map(column => {
                  const value = item[column.id];

                  let classes = {};
                  if (_.has(column, 'classNames')) {
                    classes = _.isFunction(column.classNames) ? column.classNames(item, collapse) : column.classNames;
                  }

                  const cellContent = (
                    <TableCell
                      key={column.id}
                      align={column.align}
                      style={{ width: column.width, backgroundColor: collapse ? selectedRowColor : 'transparent' }}
                      classes={{ ...classes }}
                    >
                      {column.render ? column.render(value, item, index) : value}
                    </TableCell>
                  );

                  if (column.tooltip) {
                    const tooltipMessage = _.isFunction(column.tooltip) ? column.tooltip(item) : column.tooltip;
                    return tooltipMessage ? (
                      <Tooltip title={tooltipMessage} placement="right" classes={{ tooltip: column.tooltipClass }}>
                        {cellContent}
                      </Tooltip>
                    ) : (
                      cellContent
                    );
                  }
                  return cellContent;
                })}
              </TableRow>
              {collapse && collapseColumns && this.renderCollapseTable(item, index, collapseColumns, collapse)}
              {collapse && collapseColumns && <TableRow style={{ height: 15 }} />}
            </Fragment>
          );
        })}
      </TableBody>
    );
  };

  render() {
    const {
      classes,
      columns,
      containerStyle,
      data,
      title,
      collapseColumns,
      customClassTable,
      style,
      stickyHeader,
    } = this.props;
    return (
      <Paper className={classes.root}>
        <TableContainer style={containerStyle} className={customClassTable || null}>
          {title}
          <MaterialTable style={style} stickyHeader={stickyHeader}>
            {this.renderTableHead(columns)}
            {this.renderTableBody(columns, data, collapseColumns)}
          </MaterialTable>
        </TableContainer>
      </Paper>
    );
  }
}

Table.propTypes = {
  tableRootClass: PropTypes.any,
  tableRowClass: PropTypes.any,
  title: PropTypes.any,
  style: PropTypes.any,
  onChangeCollapseRows: PropTypes.any,
  stickyHeader: PropTypes.bool,
  orderBy: PropTypes.string,
  selectedRowColor: PropTypes.string,
  collapseColumns: PropTypes.array,
  collapseRows: PropTypes.array,
  columns: PropTypes.array,
  data: PropTypes.array,
  classes: PropTypes.object,
  containerStyle: PropTypes.object,
  onOrderByChange: PropTypes.func,
  customClassTable: PropTypes.any,
  assessment: PropTypes.object,
};

Table.defaultProps = {
  collapseRows: [],
  columns: [],
  containerStyle: { maxHeight: 500 },
  data: [],
  stickyHeader: true,
  title: null,
};

export default withStyles(styles)(Table);
