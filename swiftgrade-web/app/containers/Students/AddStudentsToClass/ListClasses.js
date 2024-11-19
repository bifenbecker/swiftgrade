import React from 'react';
import PropTypes from 'prop-types';
import { List, ListItem, ListItemIcon } from '@material-ui/core';
import { MUCheckbox } from 'components/Controls';
import PersonOutline from '@material-ui/icons/PersonOutline';
import { withStyles } from '@material-ui/core/styles';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { makeSelectGroups } from 'containers/Groups/selectors';
import { styles } from './styles';

const ListClasses = props => {
  const { classes, currentGroup, groups, handleChange, checkedClasses } = props;
  return (
    <List className={classes.list}>
      {groups.map(group =>
        group.id !== currentGroup.id ? (
          <ListItem key={group.id} disableGutters className={classes.class_choice_wrapper}>
            <ListItemIcon className={classes.item_wrapper}>
              <MUCheckbox
                size="medium"
                label={group.name}
                checked={checkedClasses.includes(group.id)}
                value={group.id}
                onChange={handleChange}
              />
              <PersonOutline fontSize="small" />
              {group.students_count}
            </ListItemIcon>
          </ListItem>
        ) : null,
      )}
    </List>
  );
};

ListClasses.propTypes = {
  classes: PropTypes.object,
  currentGroup: PropTypes.object,
  groups: PropTypes.array,
  handleChange: PropTypes.func,
  checkedClasses: PropTypes.array,
};
const mapStateToProps = createStructuredSelector({
  groups: makeSelectGroups(),
});

const withConnect = connect(
  mapStateToProps,
  {},
);

export default compose(
  withConnect,
  withStyles(styles),
)(ListClasses);
