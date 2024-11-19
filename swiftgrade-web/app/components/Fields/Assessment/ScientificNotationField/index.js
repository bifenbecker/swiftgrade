import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import DefaultButton from 'components/Controls/Buttons/DefaultButton';
import { hideModal, showModal } from 'components/Modals/Modal/actions';
import { isValidScientificNotationSymbol } from 'utils/helpers/assessments/validation';
import { getSelectionValue } from 'utils/helpers/assessments/getter';
import { change, formValueSelector } from 'redux-form/immutable';

import _ from 'lodash';
import { createStructuredSelector } from 'reselect';
import { setCurrentInputTabElement, setPrevInputTabElement } from 'containers/Assessments/config/actions';
import messages from './messages';
import { styles } from './styles';

class ScientificNotationField extends React.Component {
  onPaste = e => {
    const { input } = this.props;
    const scientificNotation = input.value;
    const invalidSymbols = [];

    const clipboardData = e.clipboardData.getData('text');
    clipboardData.split('').map(symbol => !isValidScientificNotationSymbol(symbol) && invalidSymbols.push(symbol));

    const selectedValue = getSelectionValue();

    if (invalidSymbols.length > 0) {
      this.onIncorrectSNFormat();
    }
    if (
      invalidSymbols.length > 0 ||
      clipboardData.length + scientificNotation.toString().length - selectedValue.length > 3
    ) {
      e.preventDefault();
      return false;
    }
  };

  onChangeSNValue = scientificNotation => {
    const { input } = this.props;
    const intSN = parseInt(scientificNotation, 10);
    if (Number.isInteger(intSN)) {
      input.onChange(intSN);
    } else {
      input.onChange(scientificNotation);
    }

    if (scientificNotation.slice(1).includes('-')) {
      input.onChange(parseInt(scientificNotation.replace(/-/g, ''), 10));
    }
  };

  onBlur = () => {
    const { input } = this.props;
    const scientificNotation = input.value;
    if (scientificNotation > 30) {
      input.onChange(30);
    }
    if (scientificNotation < -30) {
      input.onChange(-30);
    }
    this.props.setFormValue('field_for_focus', null);
  };

  onKeyDown = e => {
    const { input } = this.props;
    const scientificNotation = input.value;
    const { key: currentKey } = e;

    if (currentKey === 'Enter') {
      this.onBlur();
    } else if (currentKey === 'Tab') {
      this.props.setPrevInputTabElement(e.currentTarget.id);
    }

    const selectedValue = getSelectionValue();
    const validKeys = ['Backspace', 'Tab', 'ArrowLeft', 'ArrowRight', 'Delete'];
    if (
      (!isValidScientificNotationSymbol(currentKey) ||
        scientificNotation.toString().length - selectedValue.length >= 3) &&
      !validKeys.includes(currentKey) &&
      !(e.ctrlKey || e.metaKey)
    ) {
      e.preventDefault();
      return false;
    }
    if (scientificNotation.toString().includes('-') && currentKey === '-' && !validKeys.includes(currentKey)) {
      e.preventDefault();
      return false;
    }
  };

  onKeyUp = e => {
    const { disabled, index } = this.props;
    const { key: currentKey } = e;

    if (currentKey === 'Enter') {
      if (!disabled) {
        this.props.addRow(index);
        if (!_.isNull(index)) {
          this.onBlur();
          this.props.setFormValue('field_for_focus', `assessment_items[${index + 1}].answers.numeric[0].body`);
        } else {
          this.props.setFormValue('field_for_focus', 'answers.numeric[0].body');
        }
      } else {
        document.getElementById(`scientific_notation_field[${index}]`).blur();
      }
    } else if (currentKey === 'Tab') {
      this.props.setCurrentInputTabElement(e.currentTarget.id);
    }
  };

  onIncorrectSNFormat = () => {
    const { classes, group, hideModal: onClose, index, isAddRow } = this.props;

    this.props.showModal({
      type: 'error',
      overflow: '',
      body: (
        <div className={classes.incorrect_sn_view}>
          {isAddRow ? (
            <FormattedMessage {...messages.incorrectSNFormatAddRow} />
          ) : (
            <FormattedMessage {...messages.incorrectSNFormat} values={{ index: index + 1 }} />
          )}
          <div className={classes.incorrect_sn_view_button}>
            <DefaultButton
              text={<FormattedMessage {...messages.ok} />}
              onClick={onClose}
              backgroundColor={group.color}
            />
          </div>
        </div>
      ),
    });
  };

  render() {
    const { classes, index, input } = this.props;

    return (
      <Fragment>
        <TextField
          id={`scientific_notation_field[${index}]`}
          className={classes.scientific_notation_input_field}
          InputProps={{
            classes: {
              input: classes.textfield_input,
            },
          }}
          onBlur={() => this.onBlur()}
          onChange={e => this.onChangeSNValue(e.target.value)}
          onKeyDown={this.onKeyDown}
          onKeyUp={this.onKeyUp}
          onPaste={this.onPaste}
          variant="outlined"
          value={input.value}
        />
      </Fragment>
    );
  }
}

ScientificNotationField.propTypes = {
  addRow: PropTypes.func,
  classes: PropTypes.object,
  disabled: PropTypes.bool,
  fieldForFocus: PropTypes.any,
  group: PropTypes.object,
  hideModal: PropTypes.func,
  index: PropTypes.any,
  input: PropTypes.object,
  isAddRow: PropTypes.bool,
  prevInputTabElement: PropTypes.string,
  showModal: PropTypes.func,
  setCurrentInputTabElement: PropTypes.func,
  setFormValue: PropTypes.func,
  setPrevInputTabElement: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  fieldForFocus: state => formValueSelector('AssessmentForm')(state, 'field_for_focus'),
});

const mapDispatchToProps = dispatch => ({
  setFormValue(name, value) {
    dispatch(change('AssessmentForm', name, value));
  },
  setCurrentInputTabElement(elementId) {
    dispatch(setCurrentInputTabElement(elementId));
  },
  setPrevInputTabElement(elementId) {
    dispatch(setPrevInputTabElement(elementId));
  },
  hideModal,
  showModal,
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(ScientificNotationField);
