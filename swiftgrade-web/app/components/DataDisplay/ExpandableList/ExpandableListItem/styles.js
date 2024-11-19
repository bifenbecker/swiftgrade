import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles({
  modal_option: {
    width: '100%',
    fontSize: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
    margin: '0px 0px 4px 0px',
    cursor: 'pointer',
    color: '#fff',
  },
  drop_down_child: {
    width: '100%',
    color: '#fff',
    fontSize: '1rem',
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
    margin: '0px 0px 4px 0px',
    cursor: 'pointer',
    paddingBottom: 10,
    '&:last-child': {
      padding: 0,
    },
  },
  itemWrapper: {
    width: '70%',
    margin: '0 20px auto',
  },
});
