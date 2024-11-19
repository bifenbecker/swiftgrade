import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import injectSaga from 'utils/injectSaga';
import saga from './saga';
import { updateAssessmentsRequest } from './actions';

const MAPPING = {
  assessments: {
    url: '^/groups/(\\d+)/assessments/$',
    actions: ['update_assessments'],
  },
  assigned_assessments: {
    url: '^/groups/(\\d+)/assigned_assessments/$',
    actions: ['update_assigned_assessments'],
  },
};

class RealtimeUpdate extends React.Component {
  constructor(props) {
    super(props);
    const data = this.getActions(props.location.pathname);

    this.actions = data.actions;
    this.ids = data.ids;

    this.initialization = {
      update_assessments: this.updateAssessments,
      update_assigned_assessments: this.updateAssignedAssessments,
    };

    this.intervalId = null;
  }

  componentDidMount() {
    this.intervalId = setInterval(() => {
      this.actions.map(action => {
        this.initialization[action]();
        return action;
      });
    }, 5000);
  }

  componentWillReceiveProps(nextProps) {
    const { orderBy, location } = this.props;
    if (nextProps.orderBy !== orderBy) {
      this.updateAssessments(nextProps.orderBy);
    }

    if (location && location.pathname !== nextProps.location.pathname) {
      const data = this.getActions(nextProps.location.pathname);
      this.actions = data.actions;
      this.ids = data.ids;
    }
  }

  componentWillUnmount() {
    if (this.intervalId !== null) {
      this.clearIntervalId();
    }
  }

  clearIntervalId = () => {
    clearInterval(this.intervalId);
    this.intervalId = null;
  };

  getActions = pathname => {
    let actions = [];
    let ids = {};

    Object.keys(MAPPING).forEach(key => {
      const { actions: itemActions, url } = MAPPING[key];
      const matchUrl = pathname.match(url);

      if (matchUrl && matchUrl[1]) {
        actions = itemActions;
        ids = { group_id: matchUrl && matchUrl[1] ? matchUrl[1] : null };
      }
      return key;
    });

    return { actions, ids };
  };

  updateAssessments = (orderBy = null) => {
    const ordering = _.isNull(orderBy) ? this.props.orderBy : orderBy;
    this.props.updateAssessmentsRequest({ data: { group_id: this.ids.group_id, ordering }, kind: 'default' });
  };

  updateAssignedAssessments = (orderBy = null) => {
    const ordering = _.isNull(orderBy) ? this.props.orderBy : orderBy;
    this.props.updateAssessmentsRequest({ data: { group_id: this.ids.group_id, ordering }, kind: 'assigned' });
  };

  render() {
    const { children } = this.props;
    return children;
  }
}

RealtimeUpdate.propTypes = {
  children: PropTypes.object,
  location: PropTypes.object,
  orderBy: PropTypes.string,
  updateAssessmentsRequest: PropTypes.func,
};

RealtimeUpdate.defaultProps = {
  orderBy: null,
};

const mapDispatchToProps = {
  updateAssessmentsRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'realtimeUpdate', saga });

export default compose(
  withConnect,
  withSaga,
)(RealtimeUpdate);
