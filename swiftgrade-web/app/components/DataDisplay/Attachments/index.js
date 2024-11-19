import React from 'react';
import PropTypes from 'prop-types';
import { Grid, withStyles, Tooltip } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { IconAttachedFile } from 'components/Svgs';
import { styles } from './styles';
import messages from './messages';

function AttachmentsView(props) {
  const { classes, onAttachmentsClick } = props;
  return (
    <Grid
      container
      direction="column"
      justify="center"
      alignContent="center"
      className={classes.attachments_block}
      onClick={onAttachmentsClick}
    >
      <Grid item justify="center" className={classes.attachments_icon_wrap}>
        <Tooltip title={<FormattedMessage {...messages.assesmentFiles} />} arrow>
          <div>
            <IconAttachedFile className={classes.attachments_icon} />
          </div>
        </Tooltip>
      </Grid>
      <Grid item className={classes.attachments_text}>
        <FormattedMessage {...messages.attachments} />
      </Grid>
    </Grid>
  );
}

AttachmentsView.propTypes = {
  classes: PropTypes.object,
  onAttachmentsClick: PropTypes.func,
};

export default withStyles(styles)(AttachmentsView);
