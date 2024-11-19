import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { hideModal, showModal } from 'components/Modals/Modal/actions';
import { updateResultsStatusesRequest } from 'containers/Assessments/config/actions';
import { styles } from './styles';
import messages from './messages';

import ErrorsModalBody from './ErrorsModalBody';

function AverageView(props) {
  const { assessmentId, average, classes, isMobilePortrait } = props;

  if (average.result === 'N/A') {
    return average.result;
  }

  function getMessage(data) {
    if (data.count_incorrect_results > 0) {
      return data.count === 1 ? messages.countResultWithErrors : messages.countResultsWithErrors;
    }
    return data.count === 1 ? messages.oneResult : messages.countResults;
  }

  function onShowErrorsModal(data) {
    props.showModal({
      title: <FormattedMessage {...messages.processingErrors} />,
      body: (
        <ErrorsModalBody
          color={props.color}
          data={data}
          onClick={() => {
            updateResultsStatuses();
            props.hideModal();
          }}
        />
      ),
    });
  }

  function getErrorMessage() {
    const errorMessage = average.count_incorrect_results === 1 ? messages.error : messages.errors;
    return (
      <span
        className={classes.errors}
        role="button"
        tabIndex={-1}
        onClick={() => onShowErrorsModal(average.incorrect_scans)}
      >
        <FormattedMessage {...errorMessage} />
      </span>
    );
  }

  function updateResultsStatuses() {
    const resultsIds = average.incorrect_scans.map(scan => scan.result_id);
    props.updateResultsStatusesRequest({
      assessmentId,
      data: { results_ids: resultsIds, status: 'viewed_recognition_error' },
    });
  }

  const getResultContentForMobile = () => {
    const result = average.result.split(' ');
    return (
      <div style={{ display: 'block' }}>
        {result.map(element => (
          <div>{element}</div>
        ))}
      </div>
    );
  };

  const resultContent = isMobilePortrait ? getResultContentForMobile() : <div>{average.result}</div>;

  return (
    <div className={classes.average}>
      {resultContent}
      <div className={classes.average_results}>
        <FormattedMessage
          {...getMessage(average)}
          values={{
            count: average.count,
            count_incorrect_results: average.count_incorrect_results,
            errors: getErrorMessage(),
          }}
        />
      </div>
    </div>
  );
}

AverageView.propTypes = {
  assessmentId: PropTypes.any,
  average: PropTypes.object,
  classes: PropTypes.object,
  color: PropTypes.string,
  isMobilePortrait: PropTypes.bool,
  hideModal: PropTypes.func,
  showModal: PropTypes.func,
  updateResultsStatusesRequest: PropTypes.func,
};

const mapDispatchToProps = {
  hideModal,
  showModal,
  updateResultsStatusesRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(AverageView);
