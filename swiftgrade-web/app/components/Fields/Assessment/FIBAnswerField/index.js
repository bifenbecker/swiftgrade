import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import { injectIntl } from 'react-intl';
import { withStyles } from '@material-ui/core';
import { change, formValueSelector } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { setCurrentInputTabElement, setPrevInputTabElement } from 'containers/Assessments/config/actions';
import { getSelectionValue } from 'utils/helpers/assessments';
import { isValidFIBSymbol } from 'utils/helpers/assessments/validation';
// import _ from 'lodash';
import messages from './messages';
import { styles } from './styles';

class FIBAnswerField extends React.Component {
  constructor(props) {
    super(props);

    this.field = React.createRef();
  }

  componentDidMount() {
    const { fieldForFocus, input } = this.props;
    const name = input.name.replace('.value', '');

    if (fieldForFocus === name) {
      this.onFocus();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fieldForFocus, input } = nextProps;
    const name = input.name.replace('.value', '');

    if (this.props.fieldForFocus !== fieldForFocus && fieldForFocus === name) {
      this.onFocus();
    }
  }

  onChange = value => {
    const { input, index, subindex } = this.props;
    let { heights } = this.props;

    input.onChange(value);

    const currentHeight = heights.get(index);
    const newHeight = subindex ? `${Math.random()}_${subindex}` : Math.random().toString();

    if (currentHeight !== newHeight) {
      heights = heights.set(index, newHeight);
      this.props.setFormValue('heights', heights);
    }
  };

  onFocus = () => {
    const x = window.scrollX;
    const y = window.scrollY;
    this.field.current.focus();
    window.scrollTo(x, y);
  };

  onKeyDown = e => {
    const { input } = this.props;
    const fibValue = input.value;
    const enableKeys = ['Tab', 'Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'];
    const { key: currentKey } = e;
    const isValidSymbol = isValidFIBSymbol(currentKey);

    const selectedData = getSelectionValue();

    if (
      (!isValidSymbol || fibValue.length - selectedData.length >= 26) &&
      !(e.ctrlKey || e.metaKey) &&
      !enableKeys.includes(currentKey)
    ) {
      e.preventDefault();
      return false;
    }

    if (currentKey === 'Tab') {
      this.props.setPrevInputTabElement(e.currentTarget.id);
    }
  };

  onKeyUp = e => {
    const { disabled, index } = this.props;
    const { key: currentKey } = e;
    if (currentKey === 'Enter') {
      if (disabled) {
        this.field.current.blur();
      } else {
        this.props.addRow(index);
        // TODO: This is incorrect fix, which breaks the logic with correct focus, but fixes page crashing
        // in case of multiple answers. Need to be fixed. This code should be uncommented.
        // if (_.isNull(index)) {
        //   this.props.setFormValue('field_for_focus', 'answers.fib[0].body');
        // }
      }
    } else if (currentKey === 'Tab') {
      this.props.setCurrentInputTabElement(e.currentTarget.id);
    }
  };

  onPaste = e => {
    const { input } = this.props;
    const invalidSymbols = [];
    const fibAnswer = input.value;

    const clipboardData = e.clipboardData.getData('text');
    clipboardData.split('').map(symbol => !isValidFIBSymbol(symbol) && invalidSymbols.push(symbol));

    const selectedValue = getSelectionValue();
    if (invalidSymbols.length > 0 || clipboardData.length + fibAnswer.toString().length - selectedValue.length > 26) {
      e.preventDefault();
      return false;
    }
  };

  render() {
    const { classes, index, input, intl, placeholder, subindex } = this.props;
    const placeholderMessage = placeholder || intl.formatMessage(messages.fibAnswerPlaceholder);

    return (
      <Fragment>
        <TextField
          autoComplete="off"
          className={classes.fib_text_field}
          id={`fib_textfield[${index}][${subindex}]`}
          InputProps={{
            ref: this.field,
            classes: {
              root: classes.fib_root,
              input: classes.fib_input,
            },
          }}
          onBlur={input.onBlur}
          onChange={e => this.onChange(e.target.value)}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          onPaste={this.onPaste}
          placeholder={placeholderMessage}
          value={input.value}
          variant="outlined"
          spellCheck="false"
        />
      </Fragment>
    );
  }
}

FIBAnswerField.propTypes = {
  addRow: PropTypes.func,
  disabled: PropTypes.bool,
  fieldForFocus: PropTypes.any,
  index: PropTypes.any,
  subindex: PropTypes.number,
  classes: PropTypes.object,
  heights: PropTypes.object,
  input: PropTypes.object,
  intl: PropTypes.object,
  placeholder: PropTypes.any,
  setCurrentInputTabElement: PropTypes.func,
  setFormValue: PropTypes.func,
  setPrevInputTabElement: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  fieldForFocus: (state, ownProps) => formValueSelector(ownProps.formName)(state, 'field_for_focus'),
  heights: (state, ownProps) => formValueSelector(ownProps.formName)(state, 'heights'),
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  setCurrentInputTabElement(elementId) {
    dispatch(setCurrentInputTabElement(elementId));
  },
  setFormValue(name, value) {
    dispatch(change(ownProps.formName, name, value));
  },
  setPrevInputTabElement(elementId) {
    dispatch(setPrevInputTabElement(elementId));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  injectIntl,
  withStyles(styles),
)(FIBAnswerField);
