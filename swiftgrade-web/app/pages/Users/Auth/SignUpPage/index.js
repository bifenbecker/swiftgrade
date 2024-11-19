import React from 'react';
import PropTypes from 'prop-types';
import SignUpLayout from 'components/Layouts/SignUpLayout';
import { IconRegistrationPage } from 'components/Svgs';
import { Layout } from 'components/Layouts';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { resetForm } from 'containers/App/actions';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

export class SignUpPage extends React.PureComponent {
  componentWillUnmount() {
    this.props.resetForm('AuthForm');
  }

  render() {
    const { classes, history, location } = this.props;
    return (
      <Layout>
        <SignUpLayout
          history={history}
          location={location}
          icon={<IconRegistrationPage style={{ maxWidth: 300 }} className={classes.main_icon} />}
        />
      </Layout>
    );
  }
}

SignUpPage.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  resetForm: PropTypes.func,
};

const mapDispatchToProps = {
  resetForm,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(SignUpPage);
