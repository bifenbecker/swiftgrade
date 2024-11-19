import React from 'react';
import PropTypes from 'prop-types';
import { get as lodashGet } from 'lodash';
import { FormattedMessage } from 'react-intl';
import { VideoPlayerModal } from 'components/Modals';
import { POPUP_WELCOME_DASHBOARD_VIDEO } from 'globalConstants';
import { VIDYARD_UUID_DASHBOARD } from '../../constants';
import messages from '../../messages';

function WelcomeVideoPlayerModalView(props) {
  const { classes, isMobile, isShowWelcomeVideo, user } = props;
  const popupKeyEnabled =
    user && user.role === 'teacher' && lodashGet(user, 'enabled_popups.welcome_dashboard_video', false);
  const isShowPlayer = isMobile ? isShowWelcomeVideo && popupKeyEnabled : popupKeyEnabled;
  return (
    isShowPlayer && (
      <VideoPlayerModal
        name={POPUP_WELCOME_DASHBOARD_VIDEO}
        titleContent={
          user.sign_up_device === 'website' ? (
            <div className={classes.video_player_title_container}>
              <div className={classes.video_player_title_top}>
                <FormattedMessage {...messages.welcomeToSwiftGrade} />
              </div>
              <div className={classes.video_player_title_bottom}>
                <FormattedMessage {...messages.welcomeDashboardVideoModalTitle} />
              </div>
            </div>
          ) : (
            <div className={classes.video_player_title}>
              <FormattedMessage {...messages.swiftGradeWebsiteWalkThrough} />
            </div>
          )
        }
        user={user}
        uuid={VIDYARD_UUID_DASHBOARD}
        showModal={this.props.showModal}
        hideModal={() => {
          if (isShowWelcomeVideo) {
            this.setState({ isShowWelcomeVideo: false });
          }
          this.props.hideModal();
        }}
        updateCurrentUserRequest={this.props.updateCurrentUserRequest}
      />
    )
  );
}

WelcomeVideoPlayerModalView.propTypes = {
  classes: PropTypes.object,
  isMobile: PropTypes.bool,
  isShowWelcomeVideo: PropTypes.bool,
  user: PropTypes.object,
  hideModal: PropTypes.func,
  showModal: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
};

export default WelcomeVideoPlayerModalView;
