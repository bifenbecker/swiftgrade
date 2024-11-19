import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { compose } from 'redux';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import { styles } from './styles';

class Layout extends React.Component {
  state = {
    height: window.innerHeight,
    isMobile: false,
    isMobileIOS: false,
    isMobileAndroid: false,
    isOnline: true,
    width: window.innerWidth,
  };

  componentDidMount() {
    const { userAgent: agent } = window.navigator;

    window.addEventListener('resize', this.resize);
    window.addEventListener('offline', () => this.setState({ isOnline: false }));
    window.addEventListener('online', () => this.setState({ isOnline: true }));

    if (agent.match(/Android/i)) {
      this.setState({ isMobileAndroid: true, isMobile: true });
    } else if (agent.match(/iPhone/i) || agent.match(/iPad/i) || agent.match(/iPod/i)) {
      this.setState({ isMobileIOS: true, isMobile: true });
    } else if (agent.match(/webOS/i) || agent.match(/BlackBerry/i) || agent.match(/Windows Phone/i)) {
      this.setState({ isMobile: true });
    }
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({ height: window.innerHeight, width: window.innerWidth });
  };

  render() {
    const { children, classes } = this.props;
    const { height, isMobile, isMobileAndroid, isMobileIOS, isOnline, width } = this.state;
    const isMobilePortrait = isMobile && width < 600 && window.matchMedia('(orientation: portrait)').matches;
    return (
      <div
        className={classNames({
          [classes.mobile_layout]: width <= 500,
          [classes.layout]: width > 500,
        })}
      >
        <div
          className={classNames({
            [classes.mobile_content]: window.innerWidth <= 500,
          })}
        >
          {React.cloneElement(children, {
            size: { height, width },
            isMobile,
            isMobileAndroid,
            isMobileIOS,
            isMobilePortrait,
            isOnline,
          })}
        </div>
      </div>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.any,
  classes: PropTypes.object,
};

export default compose(
  withRouter,
  withStyles(styles),
)(Layout);
