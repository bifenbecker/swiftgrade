import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Lottie from 'react-lottie';
// import { VideoPlayer } from 'components/DataDisplay';
import _ from 'lodash';
import { LOTTIE_AND_PLAYER_MODAL_DATA } from './constants';
import { styles } from './styles';

function LottieAndPlayerModalBody(props) {
  const {
    classes,
    group,
    lottieHeight,
    lottieWidth,
    parentClasses,
    tutorialKey,
    onInternalModalClose,
    showModal,
  } = props;
  const propsData = { group, parentClasses, onInternalModalClose, showModal };
  const data = LOTTIE_AND_PLAYER_MODAL_DATA(tutorialKey, propsData);

  if (_.isNil(tutorialKey)) {
    return null;
  }

  return (
    <div className={classes.lottie_and_player_modal_body}>
      {data.topTitleContent && <div className={classes.top_title_wrapper}>{data.topTitleContent}</div>}
      {_.isObject(data.lottieOptions) && (
        <div className={classes.lottie_wrapper}>
          <Lottie options={data.lottieOptions} height={lottieHeight} width={lottieWidth} />
        </div>
      )}
      {/* Temporary hide video part from such modals. Uncomment it, when the customer will be ready to return this logic */}
      {/* <div className={classes.middle_title_wrapper}>{data.middleTitleContent}</div>
      {_.isString(data.videoUUID) && (
        <div className={classes.video_player_wrapper}>
          <VideoPlayer uuid={data.videoUUID} />
        </div>
      )} */}
    </div>
  );
}

LottieAndPlayerModalBody.propTypes = {
  classes: PropTypes.object,
  group: PropTypes.object,
  lottieHeight: PropTypes.number,
  lottieWidth: PropTypes.number,
  parentClasses: PropTypes.object,
  showModal: PropTypes.func,
  tutorialKey: PropTypes.string,
  onInternalModalClose: PropTypes.func,
};

LottieAndPlayerModalBody.defaultValues = {
  lottieHeight: 250,
  lottieWidth: 475,
};

export default withStyles(styles)(LottieAndPlayerModalBody);
