import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Loading } from 'components/Controls';
import { Table } from 'components/DataDisplay';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import { getAnalysisRequest, getAnalysisSuccess } from '../../config/actions';

import { COLUMNS, TABLE_STYLE } from './config';

class AssessmentAnalysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderBy: 'number',
    };
  }

  componentWillMount() {
    const { activeResultsData: activeData, assessment } = this.props;

    let { orderBy } = this.state;
    if (activeData && activeData.analysis && activeData.analysis.orderBy) {
      orderBy = activeData.analysis.orderBy;
      this.setState({ orderBy });
    }
    this.props.getAnalysisRequest({ assessmentId: assessment.id, orderBy });
  }

  componentWillUnmount() {
    this.props.getAnalysisSuccess(null);
  }

  onOrderByChange = (columnId, orderField) => {
    const { assessment } = this.props;
    const orderBy = columnId === orderField ? `-${columnId}` : columnId;
    this.props.getAnalysisRequest({ assessmentId: assessment.id, orderBy });
    this.props.setActiveResultsData('analysis', 'orderBy', orderBy);
    this.setState({ orderBy });
  };

  render() {
    const { orderBy } = this.state;
    const { classes, data } = this.props;

    if (_.isEmpty(data) || _.isNull(data) || !_.isArray(data)) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }

    return (
      <Table
        columns={COLUMNS(classes)}
        data={data}
        stickyHeader={false}
        style={TABLE_STYLE}
        onOrderByChange={this.onOrderByChange}
        customClassTable={classes.table_height}
        orderBy={orderBy}
      />
    );
  }
}

AssessmentAnalysis.propTypes = {
  data: PropTypes.array,
  activeResultsData: PropTypes.object,
  assessment: PropTypes.object,
  classes: PropTypes.object,
  getAnalysisRequest: PropTypes.func,
  getAnalysisSuccess: PropTypes.func,
  setActiveResultsData: PropTypes.func,
};

const mapDispatchToProps = {
  getAnalysisRequest,
  getAnalysisSuccess,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(AssessmentAnalysis);
