import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { ExpandMoreOutlined } from '@material-ui/icons';
import { filter as lodashFilter, get as lodashGet, isNil as lodashIsNil } from 'lodash';
import { POPUP_CHECKLIST_BOTTOM } from 'globalConstants';
import { ChecklistButton, MUButton } from 'components/Controls';
import ChecklistTutorial from '../ChecklistTutorial';

import messages from './messages';
import { styles } from './styles';

class ChecklistTutorialBottom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDismiss: false,
      isOpen: false,
      isPassed: false,
    };
  }

  getStepsToDoNumber = () => {
    const { data } = this.props;
    const steps = {
      create_class: data.last_created_class,
      create_answer_key: data.last_created_assessment,
      print_or_release_as: data.last_printed_as || data.last_released_as,
      scan_or_get_results: data.last_created_result,
    };
    const stepsToDoNumber = lodashFilter(steps, value => lodashIsNil(value)).length;
    if (stepsToDoNumber === 0 && !this.state.isPassed) {
      this.setState({ isPassed: true });
    }
    return stepsToDoNumber;
  };

  isDismissChange = () => this.setState(prevState => ({ ...prevState, isDismiss: !prevState.isDismiss }));

  isOpenChange = () => this.setState(prevState => ({ ...prevState, isOpen: !prevState.isOpen }));

  onDismissClick = () => {
    const { user } = this.props;
    const updatedEnabledPopups = { ...user.enabled_popups, [POPUP_CHECKLIST_BOTTOM]: false };
    this.props.updateCurrentUserRequest({
      data: { enabled_popups: updatedEnabledPopups },
      userId: user.id,
    });
  };

  renderBody = () => {
    const { classes, data, user } = this.props;
    const { isDismiss, isPassed } = this.state;

    return (
      <div className={classes.checklist_body}>
        <ChecklistTutorial
          bodyCongratulationsTitle={
            <div className={classes.congratulations_body_text}>
              <FormattedMessage {...messages.checklistDashboardCongratulationsBodyTitle} />
            </div>
          }
          bodyTitle={<FormattedMessage {...messages.checklistDashboardBottomBodyTitle} />}
          data={data}
          dismissContent={this.renderDismiss()}
          isBottomChecklist
          isDismiss={isDismiss}
          isPassed={isPassed}
          user={user}
        />
      </div>
    );
  };

  renderDismiss = () => {
    const { classes } = this.props;

    return (
      <div className={classes.checklist_dismiss_container}>
        <div className={classes.checklist_body_title}>
          <FormattedMessage {...messages.dismissChecklistBodyTitle} />
        </div>
        <div className={classes.dismiss_buttons}>
          <MUButton
            text={<FormattedMessage {...messages.keepItButton} />}
            variant="outlined"
            className={classes.keep_it_button}
            onClick={this.isDismissChange}
          />
          <MUButton
            className={classes.dismiss_it_button}
            text={<FormattedMessage {...messages.dismissItButton} />}
            onClick={this.onDismissClick}
          />
        </div>
      </div>
    );
  };

  render() {
    const { classes, user } = this.props;
    const { isOpen, isPassed } = this.state;
    const isShowChecklist = lodashGet(user, 'enabled_popups', {})[POPUP_CHECKLIST_BOTTOM];

    return isShowChecklist ? (
      <div>
        {isOpen && (
          <div className={classes.checklist}>
            <div className={classes.checklist_header}>
              <span className={classNames(classes.header_text, { isPassed })}>
                <FormattedMessage {...(isPassed ? messages.dashboardCongratulationsTitle : messages.headerTitle)} />
              </span>
              <span className={classes.expand_more_icon}>
                <ExpandMoreOutlined onClick={this.isOpenChange} />
              </span>
            </div>
            {this.renderBody()}
            <div className={classes.dismiss_checklist}>
              <span
                className={classes.dismiss_checklist_text}
                onClick={this.isDismissChange}
                role="button"
                tabIndex={0}
              >
                <FormattedMessage {...messages.dismissChecklist} />
              </span>
            </div>
          </div>
        )}
        <div className={classes.checklist_button}>
          <ChecklistButton stepsToDo={this.getStepsToDoNumber()} onClick={this.isOpenChange} />
        </div>
      </div>
    ) : null;
  }
}

ChecklistTutorialBottom.propTypes = {
  classes: PropTypes.object,
  data: PropTypes.object,
  user: PropTypes.object,
  hideModal: PropTypes.func,
  showModal: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
};

export default withStyles(styles)(ChecklistTutorialBottom);
