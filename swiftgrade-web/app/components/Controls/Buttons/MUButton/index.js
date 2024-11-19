/* eslint-disable react/no-unused-prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import { styles } from './styles';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#6e6ce7',
    },
    secondary: {
      main: '#fea042',
    },
  },
});

function MUButton(props) {
  const { classes, text, onClick, customColor, customTextColor, ...other } = props;

  return (
    <ThemeProvider theme={theme}>
      <Button
        className={classes.root}
        style={{ backgroundColor: customColor, color: customTextColor }}
        onClick={onClick}
        {...other}
      >
        {text}
      </Button>
    </ThemeProvider>
  );
}

MUButton.propTypes = {
  text: PropTypes.any,
  type: PropTypes.string,
  color: PropTypes.string,
  variant: PropTypes.string,
  classes: PropTypes.object,
  onClick: PropTypes.func,
  customColor: PropTypes.string,
  customTextColor: PropTypes.string,
};

MUButton.defaultProps = {
  color: 'primary',
  text: 'Button text',
  type: 'button',
  variant: 'contained',
};

export default withStyles(styles)(MUButton);
