import React from 'react';
import PropTypes from 'prop-types';
import { IconYourName } from 'components/Svgs';
import { Loading } from 'components/Controls';
import { StudentNameForm } from 'components/Forms';
import { UserHeaderLayout } from 'components/Layouts';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { resetForm } from 'containers/App/actions';
import { withStyles } from '@material-ui/core';

import { styles } from './styles';

class StudentName extends React.Component {
  componentWillUnmount() {
    this.props.resetForm('StudentNameForm');
  }

  render() {
    const { classes, history, user, updateUser } = this.props;

    if (!_.isObject(user)) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }
    return (
      <div className={classes.wrapper_component}>
        <UserHeaderLayout history={history} />
        <div className={classes.your_name}>
          <div className={classes.your_name_inner}>
            <IconYourName />
            <div>
              <StudentNameForm user={user} onSubmit={updateUser} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

StudentName.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  user: PropTypes.object,
  resetForm: PropTypes.func,
  updateUser: PropTypes.func,
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
)(StudentName);
