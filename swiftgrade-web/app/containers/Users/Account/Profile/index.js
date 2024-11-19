import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import SubmissionError from 'redux-form/lib/SubmissionError';
import { connect } from 'react-redux';
import { ProfileForm } from 'components/Forms';
import { resetForm } from 'containers/App/actions';
import { updateUserRequest } from 'containers/Users/actions';
import { FormattedMessage } from 'react-intl';
import classNames from 'classnames';
import { compose } from 'redux';
import { withStyles, Typography } from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import PasswordChangeForm from 'components/Forms/Users/PasswordChangeForm';
import RemoteSubmitButton from 'components/Controls/Buttons/RemoteSubmitButton';
import { styles } from './styles';
import messages from './messages';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
    };
  }

  componentWillUnmount() {
    this.props.resetForm('ProfileForm');
  }

  changePassword = formData => {
    const { user } = this.props;
    const data = formData && formData.toJS ? formData.toJS() : null;
    return new Promise((resolve, reject) => {
      const handleErrors = response => {
        reject(new SubmissionError(response.errors));
      };
      const handleSuccess = () => {
        this.setState({ isOpen: false });
      };
      const userId = user && user.id ? user.id : null;
      this.props.updateUserRequest({ data, userId, handleErrors, handleSuccess });
    });
  };

  onChangeIsOpen = () => {
    this.setState(prevState => ({ isOpen: !prevState.isOpen }));
  };

  updateProfile = formData => {
    const { history, user } = this.props;
    const data = formData && formData.toJS ? formData.toJS() : null;
    if (data) {
      return new Promise((resolve, reject) => {
        const handleErrors = response => {
          reject(new SubmissionError(response.errors));
        };
        const handleSuccess = () => {
          history.goBack();
        };
        const userId = user && user.id ? user.id : null;
        delete data.email;
        this.props.updateUserRequest({ data, userId, handleErrors, handleSuccess });
      });
    }
  };

  render() {
    const { classes, user } = this.props;
    const { isOpen } = this.state;
    return (
      <Fragment>
        <ProfileForm onSubmit={this.updateProfile} user={user} />
        <div className={classNames(classes.block_input, classes.change_password)}>
          <Typography
            role="button"
            tabIndex="0"
            className={classNames(classes.change_password_btn)}
            onClick={this.onChangeIsOpen}
          >
            <FormattedMessage {...messages.changePassword} />
            <ArrowDropDownIcon style={{ color: 'rgb(0, 162, 232)', transform: isOpen && 'rotate(180deg)' }} />
          </Typography>
        </div>
        {isOpen && <PasswordChangeForm onChangeIsOpen={this.onChangeIsOpen} onSubmit={this.changePassword} />}
        {!isOpen && (
          <RemoteSubmitButton
            buttonWrapperClassName={classes.save}
            className={classes.save_btn}
            formName="ProfileForm"
            text={<FormattedMessage {...messages.save} />}
          />
        )}
      </Fragment>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  resetForm: PropTypes.func,
  updateUserRequest: PropTypes.func,
  user: PropTypes.object,
};

const mapDispatchToProps = {
  resetForm,
  updateUserRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(Profile);
