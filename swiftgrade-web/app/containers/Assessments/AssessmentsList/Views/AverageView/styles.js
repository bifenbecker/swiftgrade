import { COLORS } from 'globalConstants';

export const styles = () => ({
  average: {
    display: 'grid',
    alignItems: 'center',
    justifyContent: 'center',
  },
  average_results: {
    fontSize: 12,
    color: COLORS.grey[700],
  },
  processing: {
    fontSize: 14,
  },
  processing_time_msg: {
    fontSize: 11,
  },
  errors: {
    color: '#FF0000',
    borderBottom: '1px solid #FF0000',
    cursor: 'pointer',
  },
});
