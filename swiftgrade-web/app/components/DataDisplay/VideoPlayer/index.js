import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import './styles.scss';

const VideoPlayer = ({ uuid }) => {
  useEffect(() => {
    window.VidyardV4.api.renderPlayer({
      aspect: 'landscape',
      container: document.getElementById('player-container'),
      uuid,
      style: 'width: 100%; display: block;',
    });
  }, []);

  return <div id="player-container" />;
};

VideoPlayer.propTypes = {
  uuid: PropTypes.string,
};

export default withStyles(styles)(VideoPlayer);
