import React from 'react';
import PropTypes from 'prop-types';
import { Field, getFormValues, formValueSelector, reduxForm } from 'redux-form/immutable';
import { AssessmentNameField } from 'components/Fields';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

function AssessmentNameForm(props) {
  const { classes, disabled, isMobilePortrait, name, checkAssessmentName } = props;
  return (
    <div id="assessment-name" className={classes.assessment_name}>
      <Field
        component={AssessmentNameField}
        disabled={disabled}
        isMobilePortrait={isMobilePortrait}
        name="name"
        style={{ color: 'white' }}
        max={50}
        onBlur={() => {
          if (_.isFunction(checkAssessmentName) && !_.isEmpty(name)) {
            checkAssessmentName(name);
          }
        }}
      />
    </div>
  );
}

AssessmentNameForm.propTypes = {
  disabled: PropTypes.bool,
  isMobilePortrait: PropTypes.bool,
  name: PropTypes.string,
  classes: PropTypes.object,
  checkAssessmentName: PropTypes.func,
};

const withForm = reduxForm({
  form: 'AssessmentForm',
  touchOnChange: true,
  enableReinitialize: true,
});

const selector = formValueSelector('AssessmentForm');
const mapStateToProps = createStructuredSelector({
  initialValues: state => getFormValues('AssessmentForm')(state),
  name: state => selector(state, 'name'),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withForm,
  withConnect,
  withStyles(styles),
)(AssessmentNameForm);
