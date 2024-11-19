import React, { useState } from 'react';
import PropTypes from 'prop-types';

// Material UI
import { List, ListItem, Tooltip, Grid } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/core/styles';

import { FormattedMessage } from 'react-intl';

// Constants
import { RESULTS_TYPE } from 'globalConstants';
import { HELP_MODAL_THEME, GET_MODAL_ITEMS, GET_VIDEO_TUTORIAL } from './config';

// Styles
import { useStyles } from './styles';

/**
 * Body of help modal window
 * @param {type, assessment, onCloseModal} props
 * @returns {React.ReactElement} The Body.
 */
const Body = props => {
  const { groupColor, type, onCloseModal } = props;
  const [isShowVideo, setIsShowVideo] = useState(false);
  const classes = useStyles({ color: groupColor });

  const updateStates = {
    setIsShowVideo,
  };

  return (
    <ThemeProvider theme={HELP_MODAL_THEME(groupColor)}>
      <List>
        {GET_MODAL_ITEMS(type, classes, updateStates).map((item, index) => {
          // All tool items for help modal window from config.js

          const Icon = item.icon;
          return (
            <ListItem className={classes.modal_option} onClick={item.onClick} key={index}>
              <Grid container>
                <Tooltip title={<FormattedMessage {...item.tooltipMessage} />} arrow placement="bottom">
                  <Grid container justify="space-between" alignItems="center">
                    <Grid item>
                      <FormattedMessage {...item.message} />
                    </Grid>
                    <Grid item className={classes.help_modal_body_icon_wrapper}>
                      <Icon className={item.className} color="primary" />
                    </Grid>
                  </Grid>
                </Tooltip>
              </Grid>
            </ListItem>
          );
        })}

        {/* All videos for tool item 'Tutorial video' from config.js */}
        {isShowVideo && GET_VIDEO_TUTORIAL(type, updateStates, onCloseModal)}
      </List>
    </ThemeProvider>
  );
};

Body.propTypes = {
  groupColor: PropTypes.string,
  type: PropTypes.string,
  onCloseModal: PropTypes.func,
};

Body.defaultProps = {
  type: RESULTS_TYPE,
};

export default Body;
