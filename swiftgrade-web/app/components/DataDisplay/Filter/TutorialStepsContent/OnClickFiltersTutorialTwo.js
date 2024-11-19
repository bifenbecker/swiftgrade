import React from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';

import { FiltersOptions } from 'images';

import messages from '../messages';
import { styles } from '../styles';

const OnClickFiltersTutorialTwo = ({ classes }) => (
  <div className={classes.tutorial_help}>
    <FormattedMessage {...messages.onClickFiltersTwo} />
    <br />
    <img className={classes.filters_options_img} src={FiltersOptions} alt="" />
    <br />
    <FormattedMessage {...messages.onClickFiltersThree} />
  </div>
);

OnClickFiltersTutorialTwo.propTypes = {
  classes: PropTypes.object,
};

export default withStyles(styles)(OnClickFiltersTutorialTwo);
