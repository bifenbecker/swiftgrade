export const styles = () => ({
  error: {
    margin: '-2px 0px',
    fontSize: 14,
    color: 'red',
    position: 'absolute',
  },
  input_assessment_name: {
    marginTop: -4,
    '& [disabled]': {
      cursor: 'url(/block.png) 18 18, auto',
    },
  },
  input: {
    '&.isMobilePortrait': {
      textOverflow: 'ellipsis',
      fontSize: 14,
    },
  },
});
