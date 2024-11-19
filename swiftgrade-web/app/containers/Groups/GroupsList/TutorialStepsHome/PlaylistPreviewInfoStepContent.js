import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';

import { Link } from 'react-router-dom';
import ListItem from '@material-ui/core/ListItem';

import YouTube from '@material-ui/icons/YouTube';
import messages from '../messages';
import { styles } from './styles';

const DATA = [
  { message: messages.givingPaper },
  { message: messages.givingOnline },
  { message: messages.studentExperiance },
];

const PlaylistPreviewInfoStepContent = ({ classes }) => (
  <div>
    {DATA.map(item => (
      <ListItem className={classes.movies_list}>
        <div role="button" tabIndex={0} onClick={e => e.preventDefault()}>
          <FormattedMessage {...item.message} />
        </div>
        <Link>
          <YouTube className={classes.movies_icon} />
        </Link>
      </ListItem>
    ))}
  </div>
);

PlaylistPreviewInfoStepContent.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(PlaylistPreviewInfoStepContent);
