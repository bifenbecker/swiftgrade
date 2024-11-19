import React from 'react';
import PropTypes from 'prop-types';
import { VirtualKeyboard } from 'components/DataDisplay';
import { withStyles } from '@material-ui/core';
import { styles } from '../../styles';
import './styles.scss';
import {
  getMobileOptions,
  MOBILE_MF_KEYBOARD_LAYOUT,
  MOBILE_MF_SWITCHERS,
  MOBILE_NUMERIC_KEYBOARD_LAYOUT,
  MOBILE_NUMERIC_SWITCHERS,
} from './constants';
import { COMMON_FUNCTIONS_STYLES } from '../../constants';

class MobileKeyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentLayout: '',
      keyOptions: null,
    };
  }

  componentWillMount() {
    const { kind } = this.props;
    this.setState({ currentLayout: kind === 'numeric' ? 'functions' : 'numbers' });
  }

  getButtonsTheme = () =>
    COMMON_FUNCTIONS_STYLES.concat([
      {
        class: 'back_button',
        buttons: '{back}',
      },
      {
        class: 'set_button',
        buttons: '{set}',
      },
      {
        class: 'letters_service_symbols',
        buttons: '{bksp} {shift} {shift_down} {123} {enter}',
      },
      {
        class: 'letters_numb_switcher',
        buttons: '{123}',
      },
      {
        class: 'numbers_service_symbols',
        buttons: '{math} {enter}',
      },
      {
        class: 'numbers_helper',
        buttons: '{left_arrow} {right_arrow} {bksp} {tab}',
      },
      {
        class: 'enter',
        buttons: '{enter}',
      },
      {
        class: 'backspace',
        buttons: '{bksp}',
      },
      {
        class: 'mobile_service_symbols',
        buttons:
          '{123} {abc} {shift} {back} {shift_down} {set} {bksp} {left_arrow} {right_arrow} {math} 0 1 2 3 4 5 6 7 8 9 . {inv}',
      },
      {
        class: 'math_letters_switcher',
        buttons: '{abc}',
      },
    ]);

  getTheme = (currentLayout, kind) => {
    if (kind === 'numeric' && currentLayout) {
      return 'mobile-numeric-theme';
    }
    return {
      set_notation: 'mobile-set-notation-theme',
      lower_letters: 'mobile-lower-letters-theme',
      upper_letters: 'mobile-upper-letters-theme',
      functions: 'mobile-math-formula-theme',
      numbers: 'mobile-numbers-theme',
    }[currentLayout];
  };

  onKeyPress = keyOptions => {
    this.setState({ keyOptions });
  };

  onMouseUp = () => {
    const { keyOptions } = this.state;
    this.props.setValueCalculator(keyOptions);
    this.setState({ keyOptions: null });
  };

  setStateData = data => this.setState(data);

  render() {
    const { kind } = this.props;
    const { currentLayout } = this.state;
    const theme = this.getTheme(currentLayout, kind);
    return (
      <div role="toolbar" tabIndex={-1} onMouseUp={this.onMouseUp} style={{ width: '100%' }}>
        <VirtualKeyboard
          layout={kind === 'numeric' ? MOBILE_NUMERIC_KEYBOARD_LAYOUT : MOBILE_MF_KEYBOARD_LAYOUT}
          layoutName={currentLayout}
          options={getMobileOptions(currentLayout, kind)}
          onKeyPress={this.onKeyPress}
          buttonTheme={this.getButtonsTheme()}
          setStateData={this.setStateData}
          switchers={kind === 'mf' ? MOBILE_MF_SWITCHERS : MOBILE_NUMERIC_SWITCHERS}
          theme={`hg-theme-default mobile-theme ${theme}`}
        />
      </div>
    );
  }
}

MobileKeyboard.propTypes = {
  kind: PropTypes.string,
  setValueCalculator: PropTypes.func,
};

MobileKeyboard.defaultProps = {
  kind: 'numeric',
};

export default withStyles(styles)(MobileKeyboard);
