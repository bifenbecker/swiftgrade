import React from 'react';
import PropTypes from 'prop-types';
import Keyboard from 'react-simple-keyboard';
import 'react-simple-keyboard/build/css/index.css';
import _ from 'lodash';

class VirtualKeyboard extends React.Component {
  getDisplayNames = currentLayout => {
    const { options } = this.props;
    const displayNames = {};
    if (currentLayout) {
      options.forEach(option => {
        displayNames[option.key] = option.label;
      });
      return displayNames;
    }
    return null;
  };

  onKeyPress = (currentLayout, pressedKey) => {
    const { options } = this.props;
    const keyOptions = options.find(option => option.key === pressedKey);
    if (keyOptions.type === 'switcher') {
      this.onSwitchLayout(pressedKey);
    } else {
      this.props.onKeyPress(keyOptions);
    }
  };

  onSwitchLayout = switcherKey => {
    const { switchers, setStateData } = this.props;
    let layoutToSwitch = switchers[switcherKey];
    if (_.isArray(layoutToSwitch)) {
      layoutToSwitch = this.getSwitcherWithOptionsLayout(layoutToSwitch);
    }
    setStateData({ currentLayout: layoutToSwitch });
  };

  getSwitcherWithOptionsLayout = options => {
    const { layoutName } = this.props;
    return options.length === 2 && layoutName === options[0] ? options[1] : options[0];
  };

  render() {
    const { buttonTheme, layout, layoutName, theme } = this.props;
    return (
      <Keyboard
        keyboardRef={r => (this.keyboard = r)}
        buttonTheme={buttonTheme}
        display={this.getDisplayNames(layoutName)}
        layout={layout}
        layoutName={layoutName}
        onKeyPress={key => this.onKeyPress(layoutName, key)}
        onKeyReleased={this.props.onKeyUp}
        theme={theme}
      />
    );
  }
}

VirtualKeyboard.propTypes = {
  buttonTheme: PropTypes.array,
  layout: PropTypes.object,
  layoutName: PropTypes.string,
  options: PropTypes.array,
  switchers: PropTypes.object,
  theme: PropTypes.string,
  onKeyPress: PropTypes.func,
  setStateData: PropTypes.func,
  onKeyUp: PropTypes.func,
};

VirtualKeyboard.defaultProps = {
  buttonTheme: [],
  options: [],
};

export default VirtualKeyboard;
