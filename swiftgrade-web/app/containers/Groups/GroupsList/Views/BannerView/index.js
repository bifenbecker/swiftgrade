import React from 'react';
import { POPUP_BANNER } from 'globalConstants';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import { IconClosePopup } from 'components/Svgs';
import { IOSAppModal } from 'components/Modals';
import messages from 'containers/Groups/GroupsList/messages';

function BannerView(props) {
  const { classes, user } = props;
  const isShowBanner = user && _.has(user, 'enabled_popups') && user.enabled_popups[POPUP_BANNER];

  const getLearnMoreContent = () => (
    <span
      role="button"
      tabIndex={-1}
      className={classes.banner_link}
      onClick={() => IOSAppModal({ classes, showModal: props.showModal, hideModal: props.hideModal })}
    >
      <FormattedMessage {...messages.learnMore} />
    </span>
  );

  const getLinkContent = () => (
    <a
      href="https://play.google.com/store/apps/details?id=com.goswiftgrade1"
      className={classes.banner_link_without_underline}
      target="_blank"
    >
      Android
    </a>
  );

  return isShowBanner ? (
    <div className={classes.banner}>
      <span>
        <FormattedMessage
          {...messages.title}
          values={{
            learnMore: getLearnMoreContent(),
            link: getLinkContent(),
          }}
        />
      </span>
      <span className={classes.banner_close}>
        <IconClosePopup onClick={() => props.updateEnabledPopups(POPUP_BANNER)} />
      </span>
    </div>
  ) : null;
}

BannerView.propTypes = {
  classes: PropTypes.object,
  user: PropTypes.object,
  hideModal: PropTypes.func,
  showModal: PropTypes.func,
  updateEnabledPopups: PropTypes.func,
};

export default BannerView;
