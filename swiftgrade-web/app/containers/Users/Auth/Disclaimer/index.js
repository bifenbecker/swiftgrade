import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import Lottie from 'react-lottie';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import { UserHeaderLayout, UserFooterLayout } from 'components/Layouts';
import { DefaultButton } from 'components/Controls';

import injectSaga from 'utils/injectSaga';
import saga from 'containers/Users/saga';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { DISCLAIMER_OPTIONS } from './constants';
import { styles } from './styles';
import messages from './messages';

class Disclaimer extends React.Component {
  goToNextPage = () => {
    const { history } = this.props;
    history.push(`/teacher/new/`);
  };

  render() {
    const { classes, history } = this.props;

    return (
      <div className={classes.wrapper_component}>
        <UserHeaderLayout history={history} />
        <div className={classes.disclaimer}>
          <div className={classes.disclaimer_inner}>
            <h3>
              <FormattedMessage {...messages.disclaimerTitle} />
            </h3>
            <div className={classes.lottie}>
              <Lottie options={DISCLAIMER_OPTIONS} height={250} width={300} />
            </div>
            <p>
              <FormattedMessage {...messages.disclaimerBodyTextFirst} />
            </p>
            <p>
              <FormattedMessage {...messages.disclaimerBodyTextSecond} />
            </p>
            <DefaultButton
              text={<FormattedMessage {...messages.disclaimerButtonText} />}
              onClick={this.goToNextPage}
              className={classes.btn_main}
              endIcon={<SentimentSatisfiedIcon />}
            />
          </div>
        </div>
        <UserFooterLayout />
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

const withSaga = injectSaga({ key: 'users', saga });
export default compose(
  withConnect,
  withSaga,
  withStyles(styles),
)(Disclaimer);

Disclaimer.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  user: PropTypes.object,
};
