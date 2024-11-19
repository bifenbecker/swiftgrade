import React from 'react';
import PropTypes from 'prop-types';
import { Loading } from 'components/Controls';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import messages from './messages';
import { styles } from './styles';

function AnswerSheetDownload(props) {
  const { classes } = props;
  return (
    <div className={classes.loading}>
      <Loading />
      <div className={classes.title}>
        <FormattedMessage {...messages.downloadMsgTitle} />
      </div>
      <div className={classes.description}>
        <FormattedMessage {...messages.downloadMsgDescription} />
      </div>
    </div>
  );
}

AnswerSheetDownload.propTypes = {
  classes: PropTypes.object,
};

export default compose(withStyles(styles))(AnswerSheetDownload);
