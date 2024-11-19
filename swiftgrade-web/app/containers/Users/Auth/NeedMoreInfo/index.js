import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'components/Controls';
import { FormattedMessage } from 'react-intl';
import { NeedMoreInfoForm } from 'components/Forms';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core';
import { resetForm } from 'containers/App/actions';
import { styles } from './styles';
import messages from './messages';

class NeedMoreInfo extends React.Component {
  componentWillUnmount() {
    this.props.resetForm('NeedMoreInfoForm');
  }

  render() {
    const { classes, user, updateUser } = this.props;

    if (!_.isObject(user)) {
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }

    return (
      <div className={classes.containers}>
        <div className={classes.main_contsinrs}>
          <div className={classes.left_content}>
            <div className={classes.left_main}>
              <div className={classes.h2div}>
                <h2 className={classes.welcome_title}>
                  <FormattedMessage {...messages.welcomeTitle} />
                </h2>
                <div className={classes.div_descrip}>
                  <p>
                    <FormattedMessage {...messages.welcomeSubtitle} />
                  </p>
                </div>
                <div className={classes.lines} />
              </div>
              <NeedMoreInfoForm user={user} onSubmit={updateUser} />
            </div>
          </div>
          <div className={classes.right_banners} />
        </div>
      </div>
    );
  }
}

NeedMoreInfo.propTypes = {
  classes: PropTypes.object,
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
)(NeedMoreInfo);
