import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { PAGES } from 'components/Svgs/Pages';
import classNames from 'classnames';
import _ from 'lodash';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';

class Pages extends Component {
  renderPage = (Icon, page, scanItem) => {
    const { classes } = this.props;
    return (
      <Icon
        key={page}
        className={classNames(classes.page, {
          more_than_four_pages: scanItem.pages > 4 && scanItem.pages <= 7,
          more_than_seven_pages: scanItem.pages > 7,
        })}
        color={scanItem.scanned_pages.includes(page) ? '#c6c0e4' : 'white'}
      />
    );
  };

  render() {
    const { classes, scanItem } = this.props;

    return (
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
        className={classNames(classes.pages, {
          more_than_four_pages: scanItem.pages > 4 && scanItem.pages <= 7,
          more_than_seven_pages: scanItem.pages > 7,
        })}
      >
        {_.slice(PAGES, 0, scanItem.pages).map((icon, index) => this.renderPage(icon, index + 1, scanItem))}
      </Grid>
    );
  }
}

Pages.propTypes = {
  scanItem: PropTypes.object,
  classes: PropTypes.object,
};

export default compose(withStyles(styles))(Pages);
