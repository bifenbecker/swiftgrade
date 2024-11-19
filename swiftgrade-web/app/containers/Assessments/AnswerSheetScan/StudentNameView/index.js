import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { Grid } from '@material-ui/core';
import _ from 'lodash';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from '../messages';

import { UNNAMED_STUDENT_DATA } from './constants';

class StudentNameView extends Component {
  renderNamedStudent = scanItem => {
    const { classes } = this.props;
    const { first_name: firstName, last_name: lastName, email } = scanItem.student;
    return (
      <Grid container direction="column" justify="center" alignItems="center">
        <Grid item className={classes.student_names}>{`${firstName} ${lastName}`}</Grid>
        <Grid item>
          {_.isEmpty(email) ? (
            <div className={classes.email_text}>
              <FormattedMessage {...messages.noEmailDetected} />
            </div>
          ) : (
            email
          )}
        </Grid>
      </Grid>
    );
  };

  renderUnnamedStudentItem = (item, scanItem) => (
    <Fragment>
      {scanItem[item.key] ? (
        <div className={item.wrapperClassName}>
          <img alt="" className={item.className} src={scanItem[item.key]} />
        </div>
      ) : (
        <div className={item.errorClassName}>{item.message}</div>
      )}
    </Fragment>
  );

  renderUnnamedStudent = (classes, scanItem) => {
    const data = UNNAMED_STUDENT_DATA(classes);
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid item xs={12} className={classes.names}>
          {data.names.map(item => this.renderUnnamedStudentItem(item, scanItem))}
        </Grid>
        <Grid item xs={12}>
          {this.renderUnnamedStudentItem(data.email, scanItem)}
        </Grid>
      </Grid>
    );
  };

  render() {
    const { classes, scanItem } = this.props;

    if (scanItem.named) {
      return this.renderNamedStudent(scanItem);
    }
    return this.renderUnnamedStudent(classes, scanItem);
  }
}

StudentNameView.propTypes = {
  scanItem: PropTypes.object,
  classes: PropTypes.object,
};

export default compose(withStyles(styles))(StudentNameView);
