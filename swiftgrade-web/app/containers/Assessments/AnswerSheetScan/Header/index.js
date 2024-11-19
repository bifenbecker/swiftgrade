import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { FormattedMessage } from 'react-intl';
import { Button, Grid } from '@material-ui/core';
import classNames from 'classnames';
import { cardStyle } from 'utils/helpers/groupsHelper';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import messages from '../messages';
import { styles } from './styles';

class Header extends Component {
  renderCountScansText = (classes, scans) =>
    scans === 1 ? (
      <FormattedMessage {...messages.oneScan} />
    ) : (
      <FormattedMessage {...messages.countScan} values={{ count: scans }} />
    );

  renderSubmit = (classes, assessment, scans) => (
    <Button
      className={classNames(classes.button, {
        oneScan: scans === 1,
        moreThanNineScans: scans > 9,
        moreThanNinetyNineScans: scans > 99,
      })}
      startIcon={
        <ArrowBackIosIcon
          className={classNames(classes.back_icon, {
            moreThanNineScans: scans > 9 && scans < 100,
          })}
          viewBox="0 0 8 24"
        />
      }
      classes={{ startIcon: scans === 0 ? classes.back_icon_wrapper : classes.back_icon_wrapper_with_scans }}
      onClick={() => {
        if (scans === 0) {
          this.props.history.push(`/groups/${assessment.group.id}/assessments/`);
        } else {
          this.props.onSubmit();
        }
      }}
    >
      <Grid container direction="row" justify="flex-start" alignItems="center">
        {scans === 0 ? (
          <Grid item xs={8}>
            <FormattedMessage {...messages.back} />
          </Grid>
        ) : (
          <Fragment>
            <Grid item xs={12}>
              <FormattedMessage {...messages.submit} />
            </Grid>
            <Grid item xs={12}>
              {this.renderCountScansText(classes, scans)}
            </Grid>
          </Fragment>
        )}
      </Grid>
    </Button>
  );

  renderTitleHeader = (classes, assessment) => (
    <Grid container direction="column" justify="center" alignItems="center" className={classes.title_item}>
      <Grid item className={classes.name_wrapper}>
        <div className={classes.name}>{assessment.group.name}</div>
      </Grid>
      <Grid item className={classes.name_wrapper}>
        <div className={classNames(classes.name, 'assessment')}>{assessment.name}</div>
      </Grid>
    </Grid>
  );

  render() {
    const { classes, assessment, loading, scans } = this.props;
    return (
      <Grid
        container
        alignItems="center"
        className={classNames(classes.header, { loading })}
        direction="row"
        justify="space-between"
        style={cardStyle(assessment.group.color, false)}
      >
        <Grid item xs={3} className={classes.grid3} style={{ height: '100%' }}>
          {this.renderSubmit(classes, assessment, scans)}
        </Grid>
        <Grid item xs={6} className={classes.grid6} tyle={{ height: '100%' }}>
          {this.renderTitleHeader(classes, assessment)}
        </Grid>
        <Grid item xs={3} className={classes.grid3} />
      </Grid>
    );
  }
}

Header.propTypes = {
  loading: PropTypes.bool,
  scans: PropTypes.number,
  classes: PropTypes.object,
  assessment: PropTypes.object,
  history: PropTypes.object,
  onSubmit: PropTypes.func,
  onDeleteScanSession: PropTypes.func,
};

export default compose(withStyles(styles))(Header);
