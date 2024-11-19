import { compose } from 'redux';
import { connect } from 'react-redux';
import { getInitValuesAssessmentForm } from 'utils/helpers/assessments';
import { reduxForm } from 'redux-form/immutable';

function AssessmentFormInit() {
  return null;
}

const withForm = reduxForm({
  form: 'AssessmentForm',
  touchOnChange: true,
  enableReinitialize: true,
});

const mapStateToProps = (state, ownProps) => ({
  initialValues: getInitValuesAssessmentForm(ownProps),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

export default compose(
  withConnect,
  withForm,
)(AssessmentFormInit);
