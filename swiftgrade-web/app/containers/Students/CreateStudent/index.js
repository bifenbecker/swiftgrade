import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SubmissionError from 'redux-form/lib/SubmissionError';
import { CreateStudentForm } from 'components/Forms';
import { FormattedMessage } from 'react-intl';
import { IconJoinClass } from 'components/Svgs';
import { UserHeaderLayout, UserFooterLayout } from 'components/Layouts';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import reducer from '../reducer';
import saga from '../saga';
import { createStudentRequest } from '../actions';
import { styles } from './styles';
import messages from './messages';

class CreateStudent extends Component {
  createStudent = formData => {
    const data = formData && formData.toJS ? formData.toJS() : null;
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };

      const handleSuccess = () => {
        const { history } = this.props;
        history.push('/thankyou/');
      };
      this.props.createStudentRequest({
        data,
        handleErrors,
        handleSuccess,
      });
    });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.wrapper_component}>
        <div className={classes.component}>
          <UserHeaderLayout />
          <div className={classes.component_inner}>
            <IconJoinClass style={{ maxWidth: 250, margin: '0 auto' }} />
            <h2>
              <FormattedMessage {...messages.joinClass} />
            </h2>
            <CreateStudentForm onSubmit={this.createStudent} />
            <p className={classes.terms_text}>
              <FormattedMessage {...messages.joinClassDescStart} />
              <a href="#">
                <FormattedMessage {...messages.privacyPolicy} />
              </a>
              <FormattedMessage {...messages.and} />
              <a href="#">
                <FormattedMessage {...messages.termsService} />
              </a>
              .
              <br /> <FormattedMessage {...messages.joinClassDescEnd} />.
            </p>
          </div>
        </div>
        <UserFooterLayout />
      </div>
    );
  }
}

CreateStudent.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  resetForm: PropTypes.func,
  createStudentRequest: PropTypes.func,
};

const mapDispatchToProps = {
  createStudentRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'students', reducer });
const withSaga = injectSaga({ key: 'students', saga });

export default compose(
  withSaga,
  withReducer,
  withConnect,
  withStyles(styles),
)(CreateStudent);
