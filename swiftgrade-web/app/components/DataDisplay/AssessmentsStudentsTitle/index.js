import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Grid } from '@material-ui/core';
import { FormattedMessage } from 'react-intl';
import { LightenDarkenColor } from 'lighten-darken-color';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { getCardIcon, cardStyle } from 'utils/helpers/groupsHelper';
import { makeSelectGroup } from 'containers/Groups/selectors';
import { makeSelectAssessments } from 'containers/Assessments/config/selectors';
import { withStyles } from '@material-ui/core/styles';
import injectReducer from 'utils/injectReducer';
import reducer from 'containers/Groups/reducer';
import { makeSelectStudents } from 'containers/Students/selectors';
import messages from './messages';

import { styles } from './styles';

class AssessmentsStudentsTitle extends React.Component {
  getDescription = () => {
    const { keyName, assessments, students } = this.props;
    const assessmentsCount = (assessments && assessments.length) || 0;
    const studentsCount = (students && students.length) || 0;
    const count = keyName === 'students' ? studentsCount : assessmentsCount;

    if (keyName === 'students') {
      return count === 1 ? (
        <FormattedMessage {...messages.studentCount} />
      ) : (
        <FormattedMessage {...messages.studentsCount} values={{ count }} />
      );
    }
    return count === 1 ? (
      <FormattedMessage {...messages.assessmentCount} />
    ) : (
      <FormattedMessage {...messages.assessmentsCount} values={{ count }} />
    );
  };

  renderGroup = (classes, group) => {
    const { studentsAdded } = this.props;
    if (group && !group.isLoading) {
      const { color, name } = group;
      return (
        <Grid
          alignItems="flex-start"
          className={classes.group}
          container
          direction="row"
          justify="space-between"
          style={cardStyle(color, false)}
        >
          <Grid item md={studentsAdded ? 3 : 9} xs={studentsAdded ? 3 : 9}>
            <div className={classes.group_title}>{name}</div>
            <div className={classes.group_description}>{this.getDescription(group)}</div>
          </Grid>
          {studentsAdded && (
            <Grid item md={6} xs={6} className={classes.group_message}>
              <FormattedMessage {...messages.studentsAddedToClass} />
            </Grid>
          )}
          <Grid item md={3} xs={3} style={{ color: LightenDarkenColor(color, 60) }} className={classes.group_icon}>
            {getCardIcon(classes, group)}
          </Grid>
        </Grid>
      );
    }
    return null;
  };

  render() {
    const { classes, group } = this.props;
    return <Fragment>{this.renderGroup(classes, group)}</Fragment>;
  }
}

AssessmentsStudentsTitle.propTypes = {
  keyName: PropTypes.string,
  classes: PropTypes.object,
  group: PropTypes.object,
  assessments: PropTypes.array,
  students: PropTypes.array,
  studentsAdded: PropTypes.bool,
};

const mapStateToProps = createStructuredSelector({
  group: makeSelectGroup(),
  assessments: makeSelectAssessments(),
  students: makeSelectStudents(),
});

const withConnect = connect(
  mapStateToProps,
  null,
);

const withReducer = injectReducer({ key: 'groups', reducer });

export default compose(
  withConnect,
  withReducer,
  withStyles(styles),
)(AssessmentsStudentsTitle);
