import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import classNames from 'classnames';
import _ from 'lodash';

import { CheckCircleRounded } from '@material-ui/icons';
import { LinearProgress, Grid } from '@material-ui/core';
import { IconChecklistStepWithNumber } from 'components/Svgs';

import messages from './messages';
import { styles } from './styles';

const CHECKLIST_STEPS = [
  { key: 'create_class', message: messages.progressChecklistFirstStep },
  { key: 'create_answer_key', message: messages.progressChecklistSecondStep },
  { key: 'print_or_release_as', message: messages.progressChecklistThirdStep },
  { key: 'scan_or_get_results', message: messages.progressChecklistFourthStep },
];

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0F3AE8',
    },
    secondary: {
      main: '#00D260',
    },
  },
});

const ChecklistTutorial = props => {
  const {
    classes,
    bodyCongratulationsTitle,
    bodyTitle,
    data,
    dismissContent,
    isBottomChecklist,
    isDismiss,
    isPassed,
  } = props;

  const getChecklistValueByKey = key => {
    const valueMap = {
      create_class: data.last_created_class,
      create_answer_key: data.last_created_assessment,
      print_or_release_as: data.last_printed_as || data.last_released_as,
      scan_or_get_results: data.last_created_result,
    };
    return valueMap[key];
  };

  const getPercentageValue = () => {
    const valueMap = [
      { key: 'last_created_class', percentage: 25 },
      { key: 'last_created_assessment', percentage: 50 },
      { key: 'last_printed_as', percentage: 75 },
      { key: 'last_released_as', percentage: 75 },
      { key: 'last_created_result', percentage: 100 },
    ];
    const sortedKeys = _.sortBy(valueMap, 'percentage')
      .map(item => item.key)
      .reverse();
    const checklistKey = sortedKeys.find(key => !_.isNull(data[key]));
    const value = valueMap.find(item => item.key === checklistKey);
    const progressValue = value ? value.percentage : 0;
    return progressValue;
  };

  const renderProgressBar = () => {
    const value = getPercentageValue();
    return (
      <ThemeProvider theme={theme}>
        {!isPassed && bodyTitle}
        <div className={classNames(classes.linear_bar_container, { isBottomChecklist })}>
          <span className={classes.linear_bar_wrapper}>
            <LinearProgress
              className={classes.linear_bar}
              color={isPassed ? 'secondary' : 'primary'}
              variant="determinate"
              value={value}
            />
          </span>
          <span className={classNames(classes.percentage_wrapper, { isPassed, isLessHalf: value < 50 })}>{value}%</span>
        </div>
        {isPassed && bodyCongratulationsTitle}
      </ThemeProvider>
    );
  };

  const renderProgressChecklist = () => (
    <div className={classes.checklist_wrapper}>
      <ul style={{ padding: 0 }}>
        {CHECKLIST_STEPS.map((step, number) => {
          const isStepDone = data && getChecklistValueByKey(step.key);
          return (
            <li className={classNames(classes.line_wrapper, { isBottomChecklist })}>
              <Grid container wrap="nowrap" justify="flex-start" alignItems="center" spacing={2}>
                <Grid item>
                  <span className={classes.circle_wrapper}>
                    {isStepDone ? (
                      <CheckCircleRounded className={classNames(classes.done_circle_wrapper, { isPassed })} />
                    ) : (
                      <IconChecklistStepWithNumber className={classes.todo_circle_wrapper} number={number + 1} />
                    )}
                  </span>
                </Grid>
                <Grid item>
                  <span className={isStepDone ? classes.done_step_text : classes.todo_step_text}>
                    <FormattedMessage {...step.message} />
                  </span>
                </Grid>
              </Grid>
            </li>
          );
        })}
      </ul>
    </div>
  );

  if (!data) {
    return null;
  }

  return (
    <div className={classes.checklist_tutorial_wrapper}>
      {renderProgressBar()}
      {isDismiss ? dismissContent : renderProgressChecklist()}
    </div>
  );
};

ChecklistTutorial.propTypes = {
  classes: PropTypes.object,
  bodyCongratulationsTitle: PropTypes.any,
  bodyTitle: PropTypes.any,
  data: PropTypes.object,
  dismissContent: PropTypes.any,
  isBottomChecklist: PropTypes.bool,
  isDismiss: PropTypes.bool,
  isPassed: PropTypes.bool,
};

export default withStyles(styles)(ChecklistTutorial);
