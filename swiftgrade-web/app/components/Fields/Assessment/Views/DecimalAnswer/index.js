import React from 'react';
import PropTypes from 'prop-types';
import { InputAdornment } from '@material-ui/core';
import _ from 'lodash';
import { fraction } from 'mathjs';
import { isDecimal } from 'utils/helpers/common';

import FractionContent from '../FractionContent';
import FractionIcon from '../FractionIcon';
import WarningView from '../WarningView';

class DecimalAnswer extends React.Component {
  onChangeViewFraction = () => {
    const { isFraction } = this.props;
    this.props.onChangeIsFraction(!isFraction);
  };

  render() {
    const { isError, isFraction, meta, value } = this.props;

    if ((meta.touched && meta.invalid) || isError) {
      return <WarningView isError={isError} meta={meta} />;
    }

    if (!_.isEmpty(value) && isDecimal(value)) {
      return (
        <InputAdornment position="end">
          {isFraction && <FractionContent data={fraction(value)} />}
          <FractionIcon onChangeViewFraction={this.onChangeViewFraction} />
        </InputAdornment>
      );
    }

    return null;
  }
}

DecimalAnswer.propTypes = {
  value: PropTypes.any,
  isError: PropTypes.bool,
  isFraction: PropTypes.bool,
  meta: PropTypes.object,
  onChangeIsFraction: PropTypes.func,
};

export default DecimalAnswer;
