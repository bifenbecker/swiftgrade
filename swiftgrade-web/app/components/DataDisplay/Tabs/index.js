import React from 'react';
import { withRouter } from 'react-router-dom';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { Paper, Tabs as MaterialTabs, Tab } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import FavoriteIcon from '@material-ui/icons/Favorite';

const styles = () => ({
  root: {
    boxShadow: 'none',
    borderRadius: 2,
  },
  tabs: {
    fontSize: 16,
    'text-transform': 'none',
  },
});

function Tabs(props) {
  const { availableToOpenInNewTab, classes, customTabClasses, customTabsClasses, history, tabs, ...other } = props;
  const tabClasses = customTabClasses || { root: classes.tabs };

  const getTabContent = tab =>
    availableToOpenInNewTab && tab.link ? (
      <Tab
        component="a"
        href={tab.link}
        classes={tabClasses}
        icon={tab.icon}
        index={tab.value}
        key={tab.key}
        label={tab.label}
        value={tab.value}
        onClick={e => {
          e.preventDefault();
          history.push(tab.link);
        }}
        onChange={e => e.preventDefault()}
      />
    ) : (
      <Tab classes={tabClasses} icon={tab.icon} index={tab.value} key={tab.key} label={tab.label} value={tab.value} />
    );

  return (
    <Paper className={classes.root}>
      <MaterialTabs classes={customTabsClasses} {...other}>
        {tabs.map(tab => getTabContent(tab))}
      </MaterialTabs>
    </Paper>
  );
}

Tabs.propTypes = {
  availableToOpenInNewTab: PropTypes.bool,
  classes: PropTypes.object.isRequired,
  customTabClasses: PropTypes.any,
  history: PropTypes.object,
  tabs: PropTypes.array,
  customTabsClasses: PropTypes.object,
  value: PropTypes.any,
  onChange: PropTypes.func,
};

Tabs.defaultProps = {
  customTabsClasses: { root: {}, fixed: {} },
  value: 'tab1',
  tabs: [
    { label: 'Tab 1', icon: <FavoriteIcon />, value: 'tab1' },
    { label: 'Tab 2', icon: null, value: 'tab2' },
    { label: 'Tab 3', icon: null, value: 'tab3' },
  ],
};

export default compose(
  withRouter,
  withStyles(styles),
)(Tabs);
