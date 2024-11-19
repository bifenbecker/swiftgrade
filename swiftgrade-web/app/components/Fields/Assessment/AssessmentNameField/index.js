import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Input } from '@material-ui/core';
import _ from 'lodash';
import classNames from 'classnames';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectAssessmentDetails } from 'containers/Assessments/config/selectors';
import { setAssessmentDetails } from 'containers/Assessments/config/actions';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from './messages';

class AssessmentNameField extends React.Component {
  onChange = e => {
    const { assessmentDetails: details, input, max } = this.props;
    const { value } = e.target;

    if (!(!_.isNull(max) && value.length > max)) {
      input.onChange(e.target.value);
    }

    const errors = details.get('errors', null);
    if (!_.isNull(errors)) {
      this.clearErrors(details);
    }
  };

  clearErrors = details => {
    const assessmentDetails = details.set('errors', null);
    this.props.setAssessmentDetails(assessmentDetails);
  };

  renderError = value => {
    const { assessmentDetails: details, classes } = this.props;
    const errors = details.get('errors');

    if (_.has(errors, 'name') || _.isEmpty(value)) {
      return (
        <div className={classes.error}>
          {_.isEmpty(value) ? <FormattedMessage {...messages.requiredAssessmentName} /> : errors.name}
        </div>
      );
    }

    return null;
  };

  render() {
    const { classes, input, isMobilePortrait, ...other } = this.props;
    return (
      <div>
        <Input
          classes={{ input: classNames(classes.input, { isMobilePortrait }) }}
          disableUnderline
          fullWidth
          value={input.value}
          onChange={e => this.onChange(e)}
          onBlur={() => input.onBlur()}
          className={classes.input_assessment_name}
          {...other}
        />
        {this.renderError(input.value)}
      </div>
    );
  }
}

AssessmentNameField.propTypes = {
  assessmentDetails: PropTypes.any,
  max: PropTypes.any,
  classes: PropTypes.object,
  input: PropTypes.object,
  isMobilePortrait: PropTypes.bool,
  meta: PropTypes.object,
  setAssessmentDetails: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  assessmentDetails: makeSelectAssessmentDetails(),
});

const mapDispatchToProps = { setAssessmentDetails };

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(AssessmentNameField);
