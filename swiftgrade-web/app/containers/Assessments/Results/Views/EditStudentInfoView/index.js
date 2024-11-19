import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { InfoStudentsForm } from 'components/Forms';
import { FormattedMessage, injectIntl } from 'react-intl';
import classNames from 'classnames';
import { getFormattedDateTimeResults } from 'utils/helpers/dateHelpers';
import { withStyles } from '@material-ui/core';
import { compose } from 'redux';
import _ from 'lodash';
import messages from './messages';
import { styles } from './styles';

class EditStudentInfoView extends React.Component {
  cleanEmptyValues = result => {
    const cleanedResult = { ...result };
    Object.entries(result).forEach((key, value) => {
      if (['first_name', 'last_name', 'email'].includes(key) && _.isString(value)) {
        cleanedResult[key] = value.replace(/^\s$/g, '');
      }
    });
    return cleanedResult;
  };

  renderDateScanned = (classes, result, type) => (
    <div className={classes.date_container}>
      <div className={classes.date_title}>
        {type === 'online' ? (
          <FormattedMessage {...messages.dateSubmitted} />
        ) : (
          <FormattedMessage {...messages.dateScanned} />
        )}
      </div>
      {getFormattedDateTimeResults(result.created_at)}
    </div>
  );

  renderPersonalDataImage = (classes, result) => {
    const studentData = result.personal_data_image;
    const isNoData = Object.values(studentData).every(value => _.isNull(value));
    if (isNoData) {
      return null;
    }
    return (
      <div className={classes.scan_image_container}>
        <div className={classes.full_name_images}>
          <img className={classNames(classes.scan_image)} alt="first_name" src={studentData.first_name_url} />
          <img className={classNames(classes.scan_image)} alt="last_name" src={studentData.last_name_url} />
        </div>
        <img className={classNames(classes.scan_image, 'email')} alt="email" src={studentData.email_url} />
      </div>
    );
  };

  render() {
    const { classes, group, results, scans, onCancel, onSubmit, type } = this.props;
    const result = this.cleanEmptyValues(results.find(item => item.id === scans[0]));
    const isOnlineOrPreFilled = result.type === 'online' || result.named;

    return (
      <Fragment>
        {!isOnlineOrPreFilled && this.renderPersonalDataImage(classes, result)}
        {this.renderDateScanned(classes, result, type)}
        <InfoStudentsForm
          disabled={isOnlineOrPreFilled}
          group={group}
          type={isOnlineOrPreFilled ? 'results_named' : 'results_unnamed'}
          student={result}
          onCancel={onCancel}
          onSubmit={onSubmit}
        />
      </Fragment>
    );
  }
}

EditStudentInfoView.propTypes = {
  intl: PropTypes.any,
  classes: PropTypes.object,
  group: PropTypes.object,
  results: PropTypes.object,
  scans: PropTypes.array,
  onCancel: PropTypes.func,
  onSubmit: PropTypes.func,
  type: PropTypes.string,
};

export default compose(
  injectIntl,
  withStyles(styles),
)(EditStudentInfoView);
