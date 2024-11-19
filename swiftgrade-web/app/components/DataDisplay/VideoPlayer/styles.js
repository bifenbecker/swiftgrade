export const styles = () => ({
  video_player_container: {},
  video_count: {},
  video: {
    position: 'relative',
    paddingBottom: '56.25%',
    height: 0,

    '& iframe': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
  },
});
