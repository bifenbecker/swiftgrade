import React from 'react';
import PropTypes from 'prop-types';
import { VirtualKeyboard } from 'components/DataDisplay';
import { withStyles } from '@material-ui/core';
import _ from 'lodash';
import { styles } from '../../styles';
import './styles.scss';
import { DESKTOP_KEYBOARD_LAYOUT, DESKTOP_SWITCHERS, getDesktopOptions } from './constants';
import { COMMON_FUNCTIONS_STYLES } from '../../constants';

class DesktopKeyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLayout: '',
      keyOptions: null,
    };
  }

  componentWillMount() {
    const { currentLayout } = this.state;
    const { calculator, kind } = this.props;
    if (calculator.layout && !currentLayout) {
      this.setState({ currentLayout: calculator.layout });
    } else {
      this.setState({ currentLayout: kind === 'numeric' ? 'numeric_functions' : 'numbers' });
    }
  }

  getButtonsTheme = () =>
    COMMON_FUNCTIONS_STYLES.concat([
      {
        class: 'letters_service_symbols',
        buttons: '{123} {shift} {shift_down} {back}',
      },
      {
        class: 'numbers_service_symbols',
        buttons: '{enter} {equal}',
      },
      {
        class: 'numbers_helper',
        buttons: '{left_arrow} {right_arrow} {bksp} {tab}',
      },
      {
        class: 'numbers_symbol',
        buttons: '{123}',
      },
      {
        class: 'comma_symbol',
        buttons: ',',
      },
    ]);

  getTheme = currentLayout =>
    ({
      lower_letters: 'desktop-lower-letters-theme',
      upper_letters: 'desktop-upper-letters-theme',
      numeric_functions: 'desktop-numeric-theme',
      mf_functions: 'desktop-math-theme',
      set_notation: 'desktop-set-notation-theme',
      numbers: 'desktop-numbers-theme',
    }[currentLayout]);

  setStateData = data => this.setState(data);

  onKeyPress = keyOptions => {
    this.setState({ keyOptions });
  };

  onMouseUp = () => {
    const { currentLayout, keyOptions } = this.state;
    const targetLayout =
      _.has(keyOptions, 'type') && keyOptions.type === 'symbol' && currentLayout === 'mf_functions'
        ? 'numbers'
        : currentLayout;
    let newState = { keyOptions: null };
    if (targetLayout !== currentLayout) {
      newState = _.assign(newState, { currentLayout: targetLayout });
    }
    this.props.setValueCalculator(_.assign(keyOptions, { layout: targetLayout }));
    this.setState(newState);
  };

  render() {
    const { kind } = this.props;
    const { currentLayout } = this.state;
    const theme = this.getTheme(currentLayout);
    return (
      <div role="toolbar" tabIndex={-1} onMouseUp={this.onMouseUp}>
        <VirtualKeyboard
          layout={DESKTOP_KEYBOARD_LAYOUT}
          layoutName={currentLayout}
          options={getDesktopOptions(currentLayout)}
          onKeyPress={this.onKeyPress}
          buttonTheme={this.getButtonsTheme()}
          setStateData={this.setStateData}
          switchers={DESKTOP_SWITCHERS(kind)}
          theme={`hg-theme-default desktop-theme ${theme}`}
        />
      </div>
    );
  }
}

DesktopKeyboard.propTypes = {
  calculator: PropTypes.object,
  kind: PropTypes.string,
  setValueCalculator: PropTypes.func,
};

DesktopKeyboard.defaultProps = {
  kind: 'numeric',
};

export default withStyles(styles)(DesktopKeyboard);
