import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import classNames from 'classnames';
import { intlShape } from 'react-intl';

class Option extends React.Component {
  getClassname = option => {
    const { classes, id, value } = this.props;
    if (id === 'add-row-actions') {
      const index = value.findIndex(v => v === option.value);
      return classNames(classes.add_row_option, {
        active: index >= 0,
      });
    }
    return '';
  };

  render() {
    const { classes, id, intl, isScroll, isWindows, option, optionProps } = this.props;
    const className = this.getClassname(option);
    const label = _.has(option, 'message') ? intl.formatMessage(option.message) : option.label;
    const isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;

    return (
      <div
        key={option.key}
        value={option.value}
        className={classNames(className, {
          [classes.answer_sheet_preview_option]: id === 'answer-sheet-preview' && isWindows,
          [classes.marks_option_with_scroll]: isScroll && id.includes('marks'),
          [classes.marks_narrow_option]: isWindows && isFirefox && id.includes('marks'),
        })}
        {...optionProps.actions}
      >
        {label}
      </div>
    );
  }
}

Option.propTypes = {
  id: PropTypes.string,
  intl: intlShape.isRequired,
  isScroll: PropTypes.bool,
  isWindows: PropTypes.bool,
  value: PropTypes.any,
  values: PropTypes.array,
  classes: PropTypes.object,
  option: PropTypes.object,
  optionProps: PropTypes.object,
};

export default Option;
