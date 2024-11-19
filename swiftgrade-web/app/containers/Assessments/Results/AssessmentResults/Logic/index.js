import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { getFilters } from 'utils/helpers/results/resultsHelper';
import {
  deleteResultsRequest,
  getResultsRequest,
  getResultsSuccess,
  sendResultsRequest,
  updateResultNeedGradingRequest,
  updateResultStudentInfoRequest,
} from 'containers/Assessments/config/actions';
import { makeSelectFilters } from 'containers/Assessments/config/selectors';
import SubmissionError from 'redux-form/lib/SubmissionError';

class Logic extends Component {
  constructor(props) {
    super(props);

    this.state = {
      orderBy: 'last_name',
    };
  }

  componentWillMount() {
    const { activeResultsData: activeData } = this.props;

    let { orderBy } = this.state;
    if (activeData && activeData.results && activeData.results.orderBy) {
      orderBy = activeData.results.orderBy;
      this.setState({ orderBy });
    }
    this.getResults(this.getFilters(), orderBy);
  }

  componentWillUnmount() {
    this.props.getResultsSuccess(null);
  }

  getFilters = () => {
    const { filters } = this.props;
    return getFilters(filters);
  };

  getResults = (filters, ordering, handleSuccess = null) => {
    const { assessment } = this.props;
    this.props.getResultsRequest({ assessmentId: assessment.id, filters, ordering, handleSuccess });
  };

  onChangeOrdering = (columnId, orderField) => {
    const orderBy = columnId === orderField ? `-${columnId}` : columnId;
    const filters = this.getFilters();
    this.props.setActiveResultsData('results', 'orderBy', orderBy);
    this.setState({ orderBy }, () => this.getResults(filters, orderBy));
  };

  onDeleteStudents = (ids, handleSuccess) => {
    const { assessment } = this.props;
    const { orderBy: ordering } = this.state;
    const data = { results_ids: ids };
    const filters = this.getFilters();
    return new Promise(() => {
      this.props.deleteResultsRequest({ assessment, data, filters, ordering, handleSuccess });
    });
  };

  onRemoveNeedGradingClick = item => {
    const { assessment, filters } = this.props;
    const { orderBy: ordering } = this.state;
    this.props.updateResultNeedGradingRequest({
      assessment,
      filters: getFilters(filters),
      ordering,
      resultId: item.id,
    });
  };

  onSendEmail = (data, handleSuccess) => {
    const { assessment } = this.props;
    return new Promise(() => {
      this.props.sendResultsRequest({ assessmentId: assessment.id, data, handleSuccess });
    });
  };

  onUpdateResultStudentInfo = (formData, resultId, handleSuccess) => {
    const { assessment } = this.props;
    const data = formData && formData.toJS ? formData.toJS() : null;
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };

      this.props.updateResultStudentInfoRequest({
        assessmentId: assessment.id,
        data,
        resultId,
        handleErrors,
        handleSuccess,
      });
    });
  };

  render() {
    const { activeResultsData, assessment, children, data, filters } = this.props;
    const { orderBy } = this.state;
    return React.cloneElement(children, {
      activeResultsData,
      assessment,
      data,
      filters,
      orderBy,
      getResults: this.getResults,
      onChangeOrdering: this.onChangeOrdering,
      onDeleteStudents: this.onDeleteStudents,
      onRemoveNeedGradingClick: this.onRemoveNeedGradingClick,
      onSendEmail: this.onSendEmail,
      onUpdateResultStudentInfo: this.onUpdateResultStudentInfo,
      setActiveResultsData: this.props.setActiveResultsData,
    });
  }
}

Logic.propTypes = {
  filters: PropTypes.any,
  data: PropTypes.array,
  activeResultsData: PropTypes.object,
  assessment: PropTypes.object,
  children: PropTypes.object,
  deleteResultsRequest: PropTypes.func,
  getResultsRequest: PropTypes.func,
  getResultsSuccess: PropTypes.func,
  sendResultsRequest: PropTypes.func,
  setActiveResultsData: PropTypes.func,
  updateResultNeedGradingRequest: PropTypes.func,
  updateResultStudentInfoRequest: PropTypes.func,
};

const mapDispatchToProps = {
  deleteResultsRequest,
  getResultsRequest,
  getResultsSuccess,
  sendResultsRequest,
  updateResultNeedGradingRequest,
  updateResultStudentInfoRequest,
};

const mapStateToProps = createStructuredSelector({
  filters: makeSelectFilters(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(withConnect)(Logic);
