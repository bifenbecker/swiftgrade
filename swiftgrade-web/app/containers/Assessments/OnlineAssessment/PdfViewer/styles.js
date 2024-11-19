import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  toolbar: {
    padding: '4px 10px',
    display: 'flex',
    width: '100%',
    backgroundColor: '#eee',
    justifyContent: 'space-between',
    '& > div': {
      display: 'flex',
    },
    '& svg': {
      fill: 'none',
    },
    '& .rpv-current-page-input': {
      textAlign: 'center',
    },
  },
  viewer: {
    '& > div:last-child > div > div': {
      backgroundColor: 'white',
    },
    height: '90%',
  },
  full_viewer: {
    '& > div:last-child > div > div': {
      backgroundColor: 'white',
    },
    height: '80%',
    width: '100%',
    position: 'fixed',
  },
  select_root: {
    textAlign: 'center',
    maxWidth: '250px',
    textOverflow: 'ellipsis',
    paddingLeft: '16px',
  },
  select_icon: {
    height: '100%',
    width: '20px',
    top: 'calc(50% - 15px)',
    right: '7px',
    position: 'relative',
  },
}));
