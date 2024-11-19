import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'components/Layouts';
import SignUpLayout from 'components/Layouts/SignUpLayout';
import { IconJoinClass } from 'components/Svgs';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { resetForm } from 'containers/App/actions';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

export class StudentSignUpPage extends React.PureComponent {
  componentWillUnmount() {
    this.props.resetForm('StudentSignUpForm');
  }

  render() {
    const { classes, history, location } = this.props;
    return (
      <Layout>
        <SignUpLayout
          history={history}
          location={location}
          icon={
            <div className={classes.icon_join}>
              <IconJoinClass style={{ maxWidth: 250, margin: '0 auto' }} />
            </div>
          }
          type="student"
        />
      </Layout>
    );
  }
}

StudentSignUpPage.propTypes = {
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
)(StudentSignUpPage);
