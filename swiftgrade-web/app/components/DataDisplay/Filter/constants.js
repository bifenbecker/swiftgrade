import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from '@material-ui/core';
import { IconInfoQuestion } from 'components/Svgs';
import messages from './messages';

const DEFAULT_FILTERS = ['correct', 'incorrect', 'partially_correct', 'low_accuracy', 'high_accuracy'];

const getLowAccuracyLabel = classes => {
  const tooltipText = <FormattedMessage {...messages.lowConfidenceTooltip} />;
  return (
    <div className={classes.low_confidence_container}>
      <span>
        <FormattedMessage {...messages.lowAccuracy} /> (<FormattedMessage {...messages.needsGrading} />)
      </span>
      <Tooltip title={tooltipText} placement="bottom-start" classes={{ tooltip: classes.low_confidence_tooltip }}>
        <div className={classes.info_icon_container}>
          <IconInfoQuestion className={classes.info_icon} />
        </div>
      </Tooltip>
    </div>
  );
};

const FILTER_OPTIONS = (assessment, classes) => {
  let filterOptions = [
    { key: 1, value: 'correct', label: <FormattedMessage {...messages.correct} /> },
    { key: 2, value: 'partially_correct', label: <FormattedMessage {...messages.partiallyCorrect} /> },
    { key: 3, value: 'incorrect', label: <FormattedMessage {...messages.incorrect} /> },
  ];
  if (assessment && assessment.type === 'paper' && assessment.kind === 'custom') {
    const needGradingOptions = [
      { key: 4, value: 'high_accuracy', label: <FormattedMessage {...messages.highConfidence} /> },
      { key: 5, value: 'low_accuracy', label: getLowAccuracyLabel(classes) },
    ];
    filterOptions = filterOptions.concat(needGradingOptions);
  }
  return filterOptions;
};

export { DEFAULT_FILTERS, FILTER_OPTIONS };
