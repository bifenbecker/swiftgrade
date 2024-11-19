import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Tooltip } from '@material-ui/core';
import classNames from 'classnames';
import { IconFlag } from 'components/Svgs';
import { ANSWER_KIND_TYPES } from 'utils/helpers/results/tableHelper';
import MostCommon from './MostCommon';
import messages from './messages';

const renderNumberValue = (value, item, classes) => {
  const isLowCorrectAnswerRatio = item && item.is_flag_visible;
  return (
    <div className={classNames(classes.number_wrapper, { flag_visible: isLowCorrectAnswerRatio })}>
      {isLowCorrectAnswerRatio && (
        <Tooltip
          title={<FormattedMessage {...messages.analysisFlagTitle} />}
          placement="bottom-start"
          classes={{ tooltip: classes.analysis_tooltip }}
        >
          <div>
            <IconFlag className={classes.flag_icon} />
          </div>
        </Tooltip>
      )}
      <div>{value}</div>
    </div>
  );
};

const renderTableValue = (value, classes) => (
  <div className={classes.table_value}>
    <div className={classes.table_count}>{value.count}</div>
    <div className={classes.table_ratio}>{value.ratio}%</div>
  </div>
);

const COLUMNS = classes => [
  {
    id: 'number',
    key: 'number',
    label: '#',
    align: 'center',
    width: '3%',
    classNames: {
      head: classes.number_head,
      body: classes.analysis_key_column,
      key: classes.head_key,
    },
    render: (value, item) => renderNumberValue(value, item, classes),
    enableSort: true,
    tooltip: item => ANSWER_KIND_TYPES.find(object => object.value === item.kind).message,
  },
  {
    id: 'incorrect',
    label: <FormattedMessage {...messages.incorrect} />,
    align: 'center',
    width: '10%',
    render: value => renderTableValue(value, classes),
    classNames: {
      head: classes.analysis_key_column_title,
      body: classes.analysis_key_column,
      key: classes.head_key,
    },
    enableSort: true,
  },
  {
    id: 'correct',
    label: <FormattedMessage {...messages.correct} />,
    align: 'center',
    width: '10%',
    render: value => renderTableValue(value, classes),
    classNames: {
      head: classes.analysis_key_column_title,
      body: classes.analysis_key_column,
      key: classes.head_key,
    },
    enableSort: true,
  },
  {
    id: 'partial',
    label: <FormattedMessage {...messages.partial} />,
    align: 'center',
    width: '13%',
    render: value => renderTableValue(value, classes),
    classNames: {
      head: classes.analysis_key_column_title,
      body: classes.analysis_key_column,
      key: classes.head_key,
    },
    enableSort: true,
  },
  {
    id: 'unanswered',
    label: <FormattedMessage {...messages.unanswered} />,
    align: 'center',
    width: '10%',
    render: value => renderTableValue(value, classes),
    classNames: {
      head: classes.analysis_key_column_title,
      body: classes.analysis_key_column,
      key: classes.head_key,
    },
    enableSort: true,
  },
  {
    id: 'most_common',
    label: <FormattedMessage {...messages.mostCommonAnswers} />,
    align: 'center',
    width: '54%',
    render: (value, item) => <MostCommon item={item} value={value} />,
    classNames: {
      head: classes.analysis_key_column_end,
      body: classes.analysis_key_column,
    },
  },
];

const TABLE_STYLE = { width: 'calc(100% - 46px)', margin: '25px auto 80px', borderTop: '1px solid rgb(224, 224, 224)' };

export { COLUMNS, TABLE_STYLE };
