import React from 'react';
import { FormattedMessage } from 'react-intl';
import { get as lodashGet } from 'lodash';
import {
  iconDistributeGenericAS,
  iconDistributeRegularAS,
  iconScanGenericAS,
  iconScanWrittenAS,
  iconAfterRelease,
} from 'components/Lotties/';
import {
  DISTRIBUTE_GENERIC_AS_TUTORIAL_KEY,
  DISTRIBUTE_REGULAR_AS_TUTRIAL_KEY,
  DOWNLOAD_APP_TO_SCAN_AS_TUTORIAL_KEY,
  SCAN_WRITTEN_AS_TUTORIAL_KEY,
  SCAN_WRITTEN_GENERIC_AS_TUTORIAL_KEY,
  SETTINGS_HELP_TUTORIAL_KEY,
} from 'components/Modals/TutorialModal/constants';
import IOSAppModal from 'components/Modals/IOSAppModal';
import messages from './messages';

const getLink = (link, text, color) => (
  <a href={link} style={{ color }} target="_blank">
    {text}
  </a>
);

const getScanASTopMessage = (downloadAppBodyMessage, propsData) => (
  <FormattedMessage
    {...downloadAppBodyMessage}
    values={{
      ios: (
        <span
          role="button"
          tabIndex={-1}
          style={{
            color: lodashGet(propsData, 'group.color', '#3367d6'),
            textDecoration: 'underline',
            cursor: 'pointer',
          }}
          onClick={() => {
            IOSAppModal({
              classes: propsData.parentClasses,
              showModal: propsData.showModal,
              hideModal: propsData.onClose,
              color: lodashGet(propsData, 'group.color', '#3367d6'),
            });
          }}
        >
          <FormattedMessage {...messages.iOS} />
        </span>
      ),
      android: getLink(
        'https://play.google.com/store/apps/details?id=com.goswiftgrade1',
        'Android',
        lodashGet(propsData, 'group.color', '#3367d6'),
      ),
    }}
  />
);

export const LOTTIE_AND_PLAYER_MODAL_DATA = (tutorialKey, propsData) =>
  ({
    [DISTRIBUTE_GENERIC_AS_TUTORIAL_KEY]: {
      lottieOptions: {
        loop: true,
        autoplay: true,
        animationData: iconDistributeGenericAS,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      },
      middleTitleContent: null,
      topTitleContent: (
        <>
          <FormattedMessage {...messages.distributeGenericASBodyFirst} />
          <br />
          <br />
          <br />
        </>
      ),
      videoUUID: null,
    },
    [DISTRIBUTE_REGULAR_AS_TUTRIAL_KEY]: {
      lottieOptions: {
        loop: true,
        autoplay: true,
        animationData: iconDistributeRegularAS,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      },
      middleTitleContent: null,
      topTitleContent: (
        <>
          <FormattedMessage {...messages.distributeRegularASBodyFirst} />
          <br />
          <br />
          <br />
        </>
      ),
      videoUUID: null,
    },
    [DOWNLOAD_APP_TO_SCAN_AS_TUTORIAL_KEY]: {
      lottieOptions: {
        loop: true,
        autoplay: true,
        animationData: iconScanGenericAS,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      },
      middleTitleContent: <FormattedMessage {...messages.downloadAppBodySeeVideo} />,
      topTitleContent: getScanASTopMessage(messages.downloadAppBody, propsData),
      videoUUID: '', // need to add
    },
    [SCAN_WRITTEN_AS_TUTORIAL_KEY]: {
      lottieOptions: {
        loop: true,
        autoplay: true,
        animationData: iconScanWrittenAS,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      },
      middleTitleContent: <FormattedMessage {...messages.downloadAppBodySeeVideo} />,
      topTitleContent: null,
      videoUUID: '5hUnb3NbwC8m2oyooHYcox',
    },
    [SCAN_WRITTEN_GENERIC_AS_TUTORIAL_KEY]: {
      lottieOptions: {
        loop: true,
        autoplay: true,
        animationData: iconScanGenericAS,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      },
      middleTitleContent: <FormattedMessage {...messages.scanWrittenGenericASBodySecond} />,
      topTitleContent: null,
      videoUUID: null, // need to add
    },
    [SETTINGS_HELP_TUTORIAL_KEY]: {
      lottieOptions: {
        loop: true,
        autoplay: true,
        animationData: iconAfterRelease,
        rendererSettings: {
          preserveAspectRatio: 'xMidYMid slice',
        },
      },
      middleTitleContent: <FormattedMessage {...messages.helpModalBodyFifth} />,
      topTitleContent: (
        <>
          <FormattedMessage {...messages.helpModalBodyFirst} />
          <br />
          <div className={lodashGet(propsData, 'parentClasses.settings_help_modal_points')}>
            <FormattedMessage
              {...messages.helpModalBodySecond}
              values={{ app_url: <a href={process.env.HOME_PAGE_URL}>{process.env.HOME_PAGE_URL}</a> }}
            />
            <br />
            <FormattedMessage {...messages.helpModalBodyThird} />
            <br />
            <FormattedMessage {...messages.helpModalBodyForth} />
          </div>
        </>
      ),
      videoUUID: '',
    },
  }[[tutorialKey]]);
