import React from 'react';
import PropTypes from 'prop-types';
import { InputAdornment } from '@material-ui/core';
import { fraction } from 'mathjs';
import { isDecimal } from 'utils/helpers/common';
import { formatAnswer } from 'utils/helpers/assessments';

import Answer from '../Answer';
import InfoView from '../InfoView';
import FractionContent from '../FractionContent';
import FractionIcon from '../FractionIcon';
import WarningView from '../WarningView';

class NonDecimalAnswer extends React.Component {
  state = {
    mode: null,
  };

  componentDidMount() {
    const { fractionMode, value } = this.props;

    if (fractionMode) {
      const mode = isDecimal(value) ? 'number' : 'fraction';
      this.setState({ mode });
    }
  }

  componentWillReceiveProps(nextProps) {
    const { fractionMode, value } = nextProps;

    if (this.props.fractionMode !== fractionMode) {
      let mode = null;
      if (fractionMode) {
        mode = isDecimal(value) ? 'number' : 'fraction';
      }
      this.setState({ mode });
    }
  }

  onChangeViewFraction = () => {
    const { mode } = this.state;
    const newMode = mode === 'number' ? 'fraction' : 'number';
    this.setState({ mode: newMode });
    this.props.onBlur();
  };

  render() {
    const {
      answer,
      errorMessage,
      evaluationDisplayed,
      fractionMode,
      isError,
      isMobile,
      kind,
      meta,
      setStateData,
    } = this.props;
    const { mode } = this.state;

    if (((meta.touched && meta.invalid) || isError) && answer !== 'undefined') {
      return kind === 'mf' ? (
        <InfoView errorMessage={errorMessage} isError={isError} meta={meta} setStateData={setStateData} />
      ) : (
        <WarningView isError={isError} meta={meta} />
      );
    }
    if (isMobile) {
      return null;
    }

    if (kind === 'numeric' && fractionMode) {
      const res = formatAnswer(answer);
      return (
        <InputAdornment position="end">
          {mode === 'fraction' ? <Answer answer={res} /> : <FractionContent data={fraction(answer)} />}
          <FractionIcon onChangeViewFraction={this.onChangeViewFraction} />
        </InputAdornment>
      );
    }
    if (evaluationDisplayed) {
      const res = formatAnswer(answer);
      return (
        <InputAdornment position="end">
          <Answer answer={res} />
        </InputAdornment>
      );
    }
    return null;
  }
}

NonDecimalAnswer.propTypes = {
  answer: PropTypes.any,
  errorMessage: PropTypes.string,
  evaluationDisplayed: PropTypes.bool,
  fractionMode: PropTypes.bool,
  isError: PropTypes.bool,
  isMobile: PropTypes.bool,
  kind: PropTypes.string,
  meta: PropTypes.object,
  value: PropTypes.any,
  onBlur: PropTypes.func,
  setStateData: PropTypes.func,
};

export default NonDecimalAnswer;
