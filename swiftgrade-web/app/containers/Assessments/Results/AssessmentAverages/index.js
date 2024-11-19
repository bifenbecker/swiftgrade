import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'components/DataDisplay';
import { Loading } from 'components/Controls';
import _ from 'lodash';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { getAveragesRequest, getAveragesSuccess } from 'containers/Assessments/config/actions';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

import { COLUMNS, TABLE_STYLE } from './config';

class AssessmentAverages extends React.Component {
  componentWillMount() {
    const { assessment } = this.props;
    this.props.getAveragesRequest({ assessmentId: assessment.id });
  }

  componentWillUnmount() {
    this.props.getAveragesSuccess(null);
  }

  render() {
    const { classes, data } = this.props;
    if (_.isNull(data)) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }

    return (
      <div className={classes.table_main_wrap}>
        <Table columns={COLUMNS(classes)} data={data} stickyHeader={false} style={TABLE_STYLE} />
      </div>
    );
  }
}

AssessmentAverages.propTypes = {
  data: PropTypes.array,
  assessment: PropTypes.object,
  classes: PropTypes.object,
  getAveragesRequest: PropTypes.func,
  getAveragesSuccess: PropTypes.func,
};

const mapDispatchToProps = {
  getAveragesRequest,
  getAveragesSuccess,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(AssessmentAverages);
