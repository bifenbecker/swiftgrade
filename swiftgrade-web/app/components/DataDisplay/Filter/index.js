import React from 'react';
import PropTypes from 'prop-types';
import { ClickAwayListener } from '@material-ui/core';
import { FilterButton, MUCheckbox } from 'components/Controls';
import { FormattedMessage } from 'react-intl';
import { createMuiTheme, withStyles, ThemeProvider } from '@material-ui/core/styles';
import classNames from 'classnames';
import {
  POPUP_CHECKLIST_GET_RESULT,
  RESULTS_FILTER_BUTTON_ID,
  TUTORIAL_RESULTS,
  TUTORIAL_RESULTS_FILTERS_BUTTON,
  TUTORIAL_CLICK_ON_FILTERS_BUTTON,
  BODY_ID,
  PULSE_RESULTS_FILTERS,
  TUTORIAL_SECOND_RESULTS_FILTERS,
} from 'globalConstants';
import _, { get as lodashGet } from 'lodash';
import { makeSelectIsModalActive } from 'components/Modals/Modal/selectors';
import { getUserData } from 'utils/helpers/usersHelper';
import { getCurrentUserRequest, updateCurrentUserRequest } from 'containers/App/actions';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import { createStructuredSelector } from 'reselect';
import ControlledJoyrideTutorial from 'components/ControlledJoyrideTutorial';
import { getPulseButtonValue, updatePulseButtons } from 'utils/helpers/common';
import { getEnabledTutorials } from 'utils/helpers/tutorialHelpers';
import { OnClickFiltersTutorialOne, OnClickFiltersTutorialTwo } from './TutorialStepsContent';
import messages from './messages';
import { styles } from './styles';

import { DEFAULT_FILTERS, FILTER_OPTIONS } from './constants';

const THEME = color =>
  createMuiTheme({
    palette: {
      primary: {
        main: color,
      },
    },
  });

class Filter extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      filters: [],
      isModalHidden: true,
      continuous: true,
      tutorialIsRunning: false,
      tutorialKey: TUTORIAL_RESULTS_FILTERS_BUTTON,
      tutorialStepIndex: 0,
      tutorialSteps: [
        {
          target: BODY_ID,
          content: <OnClickFiltersTutorialOne />,
          disableBeacon: true,
          placement: 'center',
        },
        {
          target: BODY_ID,
          content: <OnClickFiltersTutorialTwo />,
          placement: 'center',
          locale: { last: <FormattedMessage {...messages.done} /> },
          disableBeacon: true,
          stepStyle: { maxWidth: '450px' },
        },
      ],
    };
  }

  componentDidMount() {
    const userData = getUserData();
    this.props.getCurrentUserRequest({ userId: userData.user_id });
  }

  componentDidUpdate(prevProps, prevState) {
    const { user, filters } = this.props;
    const { tutorialIsRunning, tutorialStepIndex, tutorialSteps } = this.state;
    const enabledTutorials = lodashGet(user, 'enabled_tutorials', {});

    if (prevState.tutorialStepIndex === tutorialSteps.length - 1 && tutorialStepIndex === tutorialSteps.length) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({
        isModalHidden: false,
        filters: _.isArray(filters) ? filters : [],
      });
    }

    if (
      !enabledTutorials[TUTORIAL_RESULTS_FILTERS_BUTTON] &&
      !enabledTutorials[TUTORIAL_CLICK_ON_FILTERS_BUTTON] &&
      !tutorialIsRunning
    ) {
      const newEnabledTutorials = {
        ...user.enabled_tutorials,
        click_on_filters_button: true,
      };

      this.props.updateCurrentUserRequest({
        data: { enabled_tutorials: newEnabledTutorials },
        userId: user.id,
      });
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ tutorialIsRunning: true, tutorialStepIndex: 0 });
    }
  }

  componentWillUnmount() {
    const { isModalHidden } = this.state;
    updatePulseButtons(this.props.user, this.props.updateCurrentUserRequest, PULSE_RESULTS_FILTERS);
    if (!isModalHidden) {
      this.onApply();
    }
  }

  onChange = (checked, value) => {
    const { filters } = this.state;
    const data = _.cloneDeep(filters);

    if (checked) {
      data.push(value);
    } else {
      const index = data.indexOf(value);
      data.splice(index, 1);
    }
    this.setState({ filters: data });
    this.props.setFilters(data, false);
  };

  onApply = () => {
    const { filters } = this.state;
    this.props.setFilters(filters, true);
    this.onClose();
  };

  onClose = () => {
    this.setState({ isModalHidden: true, filters: [] });
  };

  renderCheckbox = (classes, item, checked) => (
    <ThemeProvider theme={THEME(this.props.color)}>
      <MUCheckbox
        color="primary"
        checked={checked}
        keys={item.key}
        label={item.label}
        value={item.value}
        checkboxClasses={{
          checkbox: { root: classes.checkbox_root },
          label: {
            root: classNames(classes.checkbox_label_root, {
              need_grading_block: item.value === 'high_accuracy',
            }),
            label: classes.checkbox_label,
          },
        }}
        onChange={e => this.onChange(e.target.checked, e.target.value)}
      />
    </ThemeProvider>
  );

  onClickFilters = user => {
    const enabledTutorials = {
      ...user.enabled_tutorials,
      results_filters_button: false,
    };

    this.props.updateCurrentUserRequest({
      data: { enabled_tutorials: enabledTutorials },
      userId: user.id,
    });
  };

  renderModal = classes => {
    const { assessment, color } = this.props;
    const { filters: stateFilters } = this.state;
    const options = FILTER_OPTIONS(assessment, classes);

    const filters = _.isArray(this.props.filters) ? this.props.filters : [];
    const type = _.isEqual(filters.sort(), stateFilters.sort()) ? 'close' : 'apply';
    return (
      <ClickAwayListener onClickAway={() => this.onApply()}>
        <div className={classes.wrapper}>
          <div className={classes.modal_wrapper}>
            <div className={classes.modal}>
              <div className={classes.modal_btn}>
                <FilterButton color={color} type={type} onChange={() => this.onApply()} />
              </div>
              <div className={classes.content}>
                <div className={classes.title}>
                  <FormattedMessage {...messages.showTheseAnswers} />
                </div>
                <div style={{ width: '70%' }}>
                  {options.map(item => this.renderCheckbox(classes, item, stateFilters.includes(item.value)))}
                </div>
                <div className={classes.reset_btn}>
                  <FilterButton
                    color={color}
                    type="reset"
                    onChange={() => {
                      this.setState({ filters: DEFAULT_FILTERS });
                      this.props.setFilters(filters, false);
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </ClickAwayListener>
    );
  };

  onChangeFiltersButton = () => {
    const { user, filters, updateCurrentUserRequest: updateUser } = this.props;
    const enabledTutorials = getEnabledTutorials(user);
    updatePulseButtons(user, updateUser, PULSE_RESULTS_FILTERS);
    if (
      enabledTutorials &&
      enabledTutorials[TUTORIAL_RESULTS_FILTERS_BUTTON] &&
      !enabledTutorials[TUTORIAL_CLICK_ON_FILTERS_BUTTON]
    ) {
      this.onClickFilters(user);
    } else {
      this.setState({
        tutorialIsRunning: false,
        isModalHidden: false,
        filters: _.isArray(filters) ? filters : [],
      });
    }
  };

  renderTutorial = () => {
    const { tutorialIsRunning, tutorialStepIndex, tutorialKey, tutorialSteps, continuous } = this.state;
    const enabledPopups = lodashGet(this.props.user, 'enabled_popups', {});
    return (
      !enabledPopups[POPUP_CHECKLIST_GET_RESULT] && (
        <ControlledJoyrideTutorial
          continuous={continuous}
          // ignoreDidMount
          setTutorialIsRunning={() => {}}
          setTutorialStepIndex={stepIndex => this.setState({ tutorialStepIndex: stepIndex })}
          tutorialIsRunning={tutorialIsRunning}
          tutorialStepIndex={tutorialStepIndex}
          tutorialSteps={tutorialSteps}
          tutorialKey={tutorialKey}
        />
      )
    );
  };

  render() {
    const { classes, color, filters, isFiltered, isModalActive, user } = this.props;
    const { isModalHidden } = this.state;
    const enabledTutorials = getEnabledTutorials(user);
    const isResultsFiltersEnabled = getPulseButtonValue(user, PULSE_RESULTS_FILTERS);
    const isResultsFiltersPulse =
      isResultsFiltersEnabled &&
      !isModalActive &&
      !enabledTutorials[TUTORIAL_SECOND_RESULTS_FILTERS] &&
      !enabledTutorials[TUTORIAL_RESULTS] &&
      !enabledTutorials[TUTORIAL_CLICK_ON_FILTERS_BUTTON];

    if (isModalHidden) {
      const isDefaultFilters = _.isEqual(filters.sort(), DEFAULT_FILTERS.sort());
      return (
        <>
          {this.renderTutorial()}
          <div className={classes.wrapper}>
            <div id={RESULTS_FILTER_BUTTON_ID} className={classes.filter_btn}>
              <FilterButton
                isResultsFiltersPulse={isResultsFiltersPulse}
                isFiltered={!isDefaultFilters || isFiltered}
                color={color}
                count={_.isArray(filters) ? 5 - filters.length : 0}
                onChange={this.onChangeFiltersButton}
              />
            </div>
          </div>
        </>
      );
    }
    return this.renderModal(classes);
  }
}

Filter.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object,
  color: PropTypes.string,
  filters: PropTypes.array,
  isFiltered: PropTypes.bool,
  isModalActive: PropTypes.bool,
  key: PropTypes.string,
  setFilters: PropTypes.func,
  getCurrentUserRequest: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
  user: PropTypes.object,
};

Filter.defaultProps = {
  key: 'apply',
};

const mapStateToProps = createStructuredSelector({
  isModalActive: makeSelectIsModalActive(),
  user: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  getCurrentUserRequest,
  updateCurrentUserRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(Filter);
