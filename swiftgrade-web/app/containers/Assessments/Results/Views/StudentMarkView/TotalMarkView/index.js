import React from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { reduxForm } from 'redux-form/immutable';
import { injectIntl, intlShape } from 'react-intl';
import { getFilters } from 'utils/helpers/results/resultsHelper';
import { updateStudentMarkRequest } from 'containers/Assessments/config/actions';
import messages from '../messages';

const onClick = ({ assessment, orderBy, tabKey, update, filters, change, kind, total, types, marks, value }) => {
  const isFull = value === total;
  const handleSuccess = data => {
    change('mark', data.value);
  };
  const commonParams = {
    assessment,
    filters: getFilters(filters),
    ordering: orderBy,
    tabKey,
    handleSuccess,
  };

  return types
    ? Promise.all(
      types.map(
        item =>
          new Promise(() => {
            update({
              ...commonParams,
              data: { kind: item.key, value: isFull ? 0 : item.data.total },
              markId: marks[item.key].id,
            });
          }),
      ),
    )
    : new Promise(() => {
      update({
        ...commonParams,
        data: { kind, value: isFull ? 0 : total },
        markId: marks[kind].id,
      });
    });
};

const TotalMarkView = props => {
  const { value, total, intl, classes } = props;
  const isFull = value === total;
  const tooltipValue = isFull ? intl.formatMessage(messages.markIncorrect) : intl.formatMessage(messages.markCorrect);

  return (
    <Tooltip title={tooltipValue}>
      <span className={classes.total_mark_view} onClick={() => onClick(props)}>
        {total}
      </span>
    </Tooltip>
  );
};

TotalMarkView.propTypes = {
  value: PropTypes.number,
  total: PropTypes.number,
  intl: intlShape.isRequired,
  classes: PropTypes.object,
};

const withForm = reduxForm({
  form: 'TotalMarkView',
});

const mapDispatchToProps = {
  update: updateStudentMarkRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withForm,
  withConnect,
  injectIntl,
)(TotalMarkView);
