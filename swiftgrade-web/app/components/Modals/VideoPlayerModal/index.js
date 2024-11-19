import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles, styled } from '@material-ui/core/styles';
import { Tooltip, Box } from '@material-ui/core';
import _ from 'lodash';
import { FormattedMessage } from 'react-intl';
import { MUButton } from 'components/Controls';
import { VideoPlayer } from 'components/DataDisplay';
import { IconArrowRight } from 'components/Svgs';
import messages from './messages';
import { styles } from './styles';

const BtnContainer = styled(Box)({
  float: 'right',
  paddingTop: 16,
  textAlign: 'end',
});

const VideoPlayerModal = props => {
  const { classes, disabled, name, titleContent, user, uuid, onFinishClick } = props;

  useEffect(() => {
    props.showModal({
      title: titleContent,
      body: (
        <div className={classes.video_player_modal_body}>
          <VideoPlayer uuid={uuid} />
          {renderFinishButton()}
        </div>
      ),
    });
  }, []);

  const onFinishButtonClick = () => {
    if (_.isFunction(onFinishClick)) {
      onFinishClick();
    } else {
      const updatedEnabledPopups = { ...user.enabled_popups, [name]: false };
      props.updateCurrentUserRequest({
        data: { enabled_popups: updatedEnabledPopups },
        userId: user.id,
      });
      props.hideModal();
    }
  };

  const renderFinishButton = () => {
    const content = (
      <MUButton
        className={classes.finish_btn}
        disabled={disabled}
        endIcon={<IconArrowRight />}
        text={<FormattedMessage {...messages.finishedWatching} />}
        onClick={onFinishButtonClick}
        variant="text"
      />
    );

    return (
      // style={{ float: 'right' }}
      <BtnContainer>
        {/* <div className={classes.finish_btn}> */}
        {disabled ? (
          <Tooltip
            title={
              <div>
                <FormattedMessage {...messages.finishedWatchingTooltip} />
              </div>
            }
            placement="bottom-end"
          >
            <div>{content}</div>
          </Tooltip>
        ) : (
          content
        )}
      </BtnContainer>
    );
  };

  return <></>;
};

VideoPlayerModal.propTypes = {
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  titleContent: PropTypes.any,
  user: PropTypes.object,
  uuid: PropTypes.string,
  hideModal: PropTypes.func,
  onFinishClick: PropTypes.func,
  showModal: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
};

VideoPlayerModal.defaultProps = {
  disabled: false,
};

export default withStyles(styles)(VideoPlayerModal);
