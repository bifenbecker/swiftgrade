import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Input } from '@material-ui/core';
import { Map } from 'immutable';
import _ from 'lodash';
import { change, formValueSelector } from 'redux-form/immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { injectIntl, intlShape } from 'react-intl';
import { isDecimal, isNumber } from 'utils/helpers/common';
import { isValidNumericAnswer } from 'utils/helpers/assessments';
import { withStyles } from '@material-ui/core/styles';
import { styles } from './styles';
import messages from '../messages';

import DecimalAnswer from '../Views/DecimalAnswer';

class AnswerInputField extends React.Component {
  constructor(props) {
    super(props);

    this.field = React.createRef();

    this.state = {
      isError: false,
      isPaste: false,
      key: null,
    };
  }

  componentDidMount() {
    const { fieldForFocus, input } = this.props;

    if (fieldForFocus === input.name) {
      this.onFocus();
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fieldForFocus, input } = nextProps;

    if (this.props.fieldForFocus !== fieldForFocus && fieldForFocus === input.name) {
      this.onFocus();
    }
  }

  // componentWillUnmount() {
  //   const { index } = this.props;
  //
  //   if (!_.isNull(index) && document.activeElement) {
  //     document.activeElement.blur();
  //   }
  // }

  addRow = e => {
    const { index } = this.props;

    if (e.key === 'Enter') {
      this.props.addRow(index);

      if (!_.isNull(index) && document.activeElement) {
        // document.activeElement.blur();
        this.props.setFieldForFocus(`assessment_items[${index + 1}].answers[0].body`);
      }
    }
  };

  isValid = value => {
    const { isPaste, isError } = this.state;

    if (isPaste) {
      return this.isValidAfterPaste(value);
    }

    const isValid = isValidNumericAnswer(value);

    if (isError) {
      if (!isValid) {
        return this.isValidWithError(value);
      }
      this.setState({ isError: false });
    }

    return isValid;
  };

  isValidWithError = value => {
    const { key } = this.state;

    const v = Number(key);
    const isValidPoint = (value.match(/\./g) || []).length === 1 && key === '.';

    return (_.isNumber(v) && !_.isNaN(v)) || isValidPoint || key === 'Backspace';
  };

  isValidAfterPaste = value => {
    this.setState({ isPaste: false });

    if (value.length <= 20) {
      this.setState({ isError: !isNumber(value) });
      return true;
    }
    return false;
  };

  onChange = e => {
    const { input } = this.props;
    const { value } = e.target;

    const isAnswer = input.value.get('is_fraction');

    if (this.isValid(value)) {
      input.onChange(value);

      const newIsAnswer = !isDecimal(value) && isAnswer ? false : isAnswer;

      input.onChange(
        Map({
          answer: value,
          height: 1,
          is_fraction: newIsAnswer,
          scientific_notation: input.value.get('scientific_notation'),
          value,
          width: value.length,
        }),
      );
    }
  };

  onFocus = () => {
    this.field.current.focus();
    // this.props.setFieldForFocus(null);
  };

  renderAnswer = input => {
    const { meta } = this.props;
    const { isError } = this.state;
    return (
      <DecimalAnswer
        value={input.value.get('value')}
        isError={isError}
        isFraction={input.value.get('is_fraction')}
        meta={meta}
        onChangeIsFraction={isAnswer => {
          const newValue = input.value.set('is_fraction', isAnswer);
          input.onChange(newValue);
        }}
      />
    );
  };

  render() {
    const { classes, disabled, fieldForFocus, intl, input } = this.props;
    const value = input.value.get('value');
    return (
      <Fragment>
        <Input
          classes={{ root: classes.root }}
          disabled={disabled}
          disableUnderline
          endAdornment={this.renderAnswer(input)}
          placeholder={intl.formatMessage(messages.addCorrectAnswer)}
          inputProps={{
            ref: this.field,
          }}
          value={_.isNull(value) ? '' : value}
          onChange={e => this.onChange(e)}
          onFocus={() => {
            if (fieldForFocus !== input.name) {
              this.props.setFieldForFocus(input.name);
            }
          }}
          onKeyDown={e => this.addRow(e)}
          onPaste={() => this.setState({ isPaste: true })}
        />
      </Fragment>
    );
  }
}

AnswerInputField.propTypes = {
  intl: intlShape.isRequired,
  fieldForFocus: PropTypes.any,
  index: PropTypes.any,
  disabled: PropTypes.bool,
  classes: PropTypes.object,
  input: PropTypes.object,
  meta: PropTypes.object,
  addRow: PropTypes.func,
  setFieldForFocus: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  fieldForFocus: state => formValueSelector('AssessmentForm')(state, 'field_for_focus'),
});

const mapDispatchToProps = dispatch => ({
  setFieldForFocus(value) {
    dispatch(change('AssessmentForm', 'field_for_focus', value));
  },
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  injectIntl,
  withConnect,
  withStyles(styles),
)(AnswerInputField);
