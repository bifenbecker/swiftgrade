import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { IconCongratulations, IconInfo } from 'components/Svgs';
import { UserHeaderLayout, UserFooterLayout } from 'components/Layouts';
import _ from 'lodash';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import injectSaga from 'utils/injectSaga';
import saga from '../saga';
import { styles } from './styles';
import { checkVerificationCodeRequest } from '../actions';
import messages from './messages';

class CongratulationsStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      group: null,
    };
  }

  componentWillMount() {
    const { code } = this.props;
    this.checkVerificationCode(code);
  }

  checkVerificationCode = code =>
    new Promise(() => {
      const handleErrors = () => {
        const { history } = this.props;
        history.push('/novalidlink/');
      };

      const handleSuccess = group => {
        this.setState({ group });
      };
      this.props.checkVerificationCodeRequest({
        data: { code, kind: 'email_confirmation_for_student' },
        handleSuccess,
        handleErrors,
      });
    });

  render() {
    const { classes, history } = this.props;
    const { group } = this.state;

    if (_.isNull(group) || (group && group.isLoading)) {
      return null;
    }
    return (
      <div className={classes.wrapper_component}>
        <div className={classes.component}>
          <UserHeaderLayout history={history} />
          <div className={classes.component_inner}>
            <div className={classes.congratulations_icon}>
              <IconCongratulations style={{ maxWidth: 250, margin: '0 auto' }} />
            </div>

            <h2>
              <FormattedMessage {...messages.congratulations} />
            </h2>
            <div className={classes.congratulations_col}>
              <h4>
                <FormattedMessage {...messages.successfulJoined} values={{ group: group.name }} />
                <br />
              </h4>
              <p>
                <IconInfo style={{ margin: '0 0 1px' }} />
                &nbsp;
                <FormattedMessage {...messages.studentPortal} /> <br />
                <FormattedMessage {...messages.studentCongratulationsInfo} />
              </p>
            </div>
          </div>
        </div>
        <UserFooterLayout />
      </div>
    );
  }
}

CongratulationsStudent.propTypes = {
  code: PropTypes.string,
  classes: PropTypes.object,
  group: PropTypes.object,
  history: PropTypes.object,
  checkVerificationCodeRequest: PropTypes.func,
};

const mapDispatchToProps = {
  checkVerificationCodeRequest,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

const withSaga = injectSaga({ key: 'students', saga });

export default compose(
  withRouter,
  withConnect,
  withSaga,
  withStyles(styles),
)(CongratulationsStudent);
