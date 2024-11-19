import React from 'react';
import PropTypes from 'prop-types';
import { IconLogoBold } from 'components/Svgs';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core';
import { styles } from './styles';

function UserHeaderLayout(props) {
  const { classes, content, history, isLogin } = props;
  return (
    <header className={isLogin && classes.main_nav}>
      <div className={isLogin ? classes.container : classes.top_navbar}>
        <div className={classes.logo}>
          <a role="button" onClick={() => history.push('/')} tabIndex={0}>
            <span className={classes.logo_icon}>
              <IconLogoBold />
            </span>
          </a>
        </div>
        {content}
      </div>
    </header>
  );
}

UserHeaderLayout.propTypes = {
  isLogin: PropTypes.bool,
  content: PropTypes.any,
  classes: PropTypes.object,
  history: PropTypes.object,
};

UserHeaderLayout.defaultProps = {
  content: null,
  isLogin: false,
};

export default compose(withStyles(styles))(UserHeaderLayout);
