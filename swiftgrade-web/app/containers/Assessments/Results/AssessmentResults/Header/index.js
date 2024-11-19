import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import { Grid, withStyles, Tooltip } from '@material-ui/core';
import { createStructuredSelector } from 'reselect';

import { Filter, ResultsSavingStatus } from 'components/DataDisplay';
import { DownloadGradesView } from 'containers/Assessments/Results/Views';
import { IconArrowOpenTable, IconArrowCloseTable } from 'components/Svgs';
import {
  setFilters,
  getDownloadResultsRequest,
  getDownloadResultsSuccess,
} from 'containers/Assessments/config/actions';
import { makeSelectFilters, makeSelectLoading } from 'containers/Assessments/config/selectors';
import { onDownloadFile } from 'utils/helpers/results/resultsHelper';

import { makeSelectDownloadResults } from 'containers/Assessments/config/selectors/results';
import messages from '../messages';
import { styles } from './styles';

class Header extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isFiltered: false,
      isSaved: false,
    };
  }

  componentWillReceiveProps(nextProps) {
    const { loading } = this.props;

    if (loading !== nextProps.loading && !nextProps.loading) {
      this.setState({ isSaved: true });
      setTimeout(() => this.setState({ isSaved: false }), 3000);
    }
  }

  setFilters = (filters, isSave = true) => {
    const { orderBy } = this.props;
    this.props.getResults(filters, orderBy);

    if (isSave) {
      this.props.setFilters(filters);
    }
    this.setState({ isFiltered: true });
  };

  onDownloadGrades = () => {
    const { assessment, orderBy } = this.props;
    this.props.getDownloadResultsRequest({ assessmentId: assessment.id, ordering: orderBy });
  };

  renderDownloadGrades = () => {
    const { group, downloadResults, assessment } = this.props;
    if (downloadResults) {
      const fileName = `${group.name} – ${assessment.name} results.xlsx`;
      onDownloadFile(downloadResults, fileName);
      this.props.getDownloadResultsSuccess(null);
    }
    return <DownloadGradesView color={group.color} onClick={this.onDownloadGrades} />;
  };

  renderFilter = group => {
    const { assessment, filters } = this.props;
    return (
      <Filter
        assessment={assessment}
        color={group.color}
        filters={filters && filters.toJS ? filters.toJS() : filters}
        isFiltered={this.state.isFiltered}
        setFilters={this.setFilters}
      />
    );
  };

  render() {
    const { classes, collapseScans, group, loading, results, isMobile } = this.props;
    const { isSaved } = this.state;
    const Icon = collapseScans.length === results.length ? IconArrowCloseTable : IconArrowOpenTable;
    const title =
      collapseScans.length === results.length ? (
        <FormattedMessage {...messages.collapse} />
      ) : (
        <FormattedMessage {...messages.expand} />
      );

    return (
      <Grid container direction="row" justify="flex-end" alignItems="center" className={classes.results_header}>
        <Grid item className={classes.results_saving_status_wrapper}>
          <ResultsSavingStatus group={group} loading={loading} isSaved={isSaved} isMobile={isMobile} />
        </Grid>
        <Grid item xs={4} sm={3} md={2} className={classes.results_items_container}>
          {this.renderFilter(group)}
          <Tooltip title={title} arrow>
            <div
              className={classes.button_wrap_for_table}
              onClick={() => this.props.onChangeScans(collapseScans, null, 'collapseScans')}
              role="button"
              tabIndex={0}
              style={{ outline: '0' }}
            >
              <Icon width={28} fill={group.color} className={classes.icon_open_close_table} />
            </div>
          </Tooltip>
          {this.renderDownloadGrades()}
        </Grid>
      </Grid>
    );
  }
}

Header.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object,
  collapseScans: PropTypes.array,
  filters: PropTypes.any,
  getResults: PropTypes.func,
  group: PropTypes.object,
  loading: PropTypes.bool,
  onChangeScans: PropTypes.func,
  orderBy: PropTypes.string,
  results: PropTypes.array,
  setFilters: PropTypes.func,
  getDownloadResultsRequest: PropTypes.func,
  getDownloadResultsSuccess: PropTypes.func,
  downloadResults: PropTypes.any,
  isMobile: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  filters: makeSelectFilters(),
  loading: makeSelectLoading(),
  downloadResults: makeSelectDownloadResults(),
});

const mapDispatchToProps = {
  getDownloadResultsRequest,
  getDownloadResultsSuccess,
  setFilters,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(Header);
