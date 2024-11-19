import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { FormattedMessage } from 'react-intl';
import { Typography } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { TABS_ALL_ID, TABS_HELPER_ICON_ID, RESULTS_TYPE } from 'globalConstants';
import HelpIcon from 'components/DataDisplay/HelpIcon';
import { hideModal, showModal } from 'components/Modals/Modal/actions';
import { updateCurrentUserRequest } from 'containers/App/actions';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { getLightColor } from 'utils/helpers/colorHelpers';
import HelpModal from 'components/Modals/HelpModal';
import { TABS } from './constants';
import messages from './messages';
import { styles } from './styles';

class Tabs extends Component {
  constructor(props) {
    super(props);
    this.state = { isShowResultVideoModal: false, isShowHelpModal: false };
  }

  getTabStyle = (active, assessment, color) => {
    if (active) {
      return { color: 'white', background: color };
    }
    return { color, background: getLightColor(assessment.group.color) };
  };

  updateSetState = updatedValues => {
    this.setState(prevState => ({ ...prevState, ...updatedValues }));
  };

  render() {
    const { assessment, classes, color, iOS, tab, isMobile } = this.props;
    const { group } = assessment;

    return (
      <>
        <div className={classes.tabs_container}>
          <div id={TABS_ALL_ID} className={classNames(classes.tabs, { iOS, isMobile })}>
            {TABS.map(item => (
              <Typography
                id={`${TABS_ALL_ID}-${item.key}`}
                key={item.key}
                tabIndex={0}
                role="button"
                className={classNames(classes.tab, {
                  first: item.key === 'results',
                })}
                style={this.getTabStyle(item.value === tab, assessment, color)}
                onClick={() => this.props.onChangeTab(item.value)}
              >
                {item.label}
              </Typography>
            ))}
          </div>
          <div id={TABS_HELPER_ICON_ID} className={classNames(classes.helper_icon, { isMobile })}>
            <a role="button" tabIndex={0} onClick={() => this.setState({ isShowHelpModal: true })}>
              <HelpIcon
                color={getLightColor(group.color)}
                tooltipTitle={<FormattedMessage {...messages.helpResults} />}
              />
            </a>
          </div>
        </div>
        {this.state.isShowHelpModal && (
          <HelpModal
            top={isMobile ? '5rem' : ''}
            type={RESULTS_TYPE}
            title={messages.helpModalTitle}
            onClose={() => this.setState({ isShowHelpModal: false })}
          />
        )}
      </>
    );
  }
}

Tabs.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object,
  color: PropTypes.string,
  iOS: PropTypes.bool,
  onChangeTab: PropTypes.func,
  tab: PropTypes.string,
  hideModal: PropTypes.func,
  showModal: PropTypes.func,
  updateCurrentUser: PropTypes.func,
  user: PropTypes.object,
  isMobile: PropTypes.bool,
};

const mapDispatchToProps = {
  updateCurrentUser: updateCurrentUserRequest,
  hideModal,
  showModal,
  // setResultsHelpVideo,
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(Tabs);
