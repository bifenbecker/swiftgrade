import { InputBase } from '@material-ui/core';
import { createStyles, withStyles } from '@material-ui/core/styles';

export const MenuProps = styleDetails => {
  const props = {
    anchorOrigin: styleDetails.anchorOrigin,
    style: { maxHeight: styleDetails.maxHeight, zIndex: 10000 },
    getContentAnchorEl: null,
    transformOrigin: styleDetails.transformOrigin,
  };
  return props;
};

export const SelectInput = withStyles(() =>
  createStyles({
    root: {
      position: 'relative',
      width: '100%',
    },
    input: {
      borderRadius: 4,
      position: 'relative',
      backgroundColor: 'white',
      fontSize: 14,
      padding: '8px 12px',
      borderColor: 1,

      '&:focus': {
        borderRadius: 4,
        boxShadow: 'none',
        backgroundColor: 'white',
      },
    },
  }),
)(InputBase);
