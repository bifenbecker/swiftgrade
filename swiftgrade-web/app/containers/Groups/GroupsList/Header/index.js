import React, { Fragment } from 'react';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';

import { AppBar, Grid, Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

import classNames from 'classnames';
import _, { get as lodashGet } from 'lodash';

import { IconButton, DefaultButton, Loading, MUButton } from 'components/Controls';
import { AccountLayout } from 'components/Layouts';
import { IconHome, IconGenerateSheet, IconReadyForDownload } from 'components/Svgs';
import {
  GENERATE_SHEET_ICON_ID,
  STUDENT_TUTORIAL_JOIN_BTN_ID,
  PULSE_DASHBOARD_CREATE_CLASS,
  PULSE_DASHBOARD_GENERATE_GENERIC_AS,
  PULSE_DASHBOARD_DOWNLOAD_GENERIC_AS,
  // TUTORIAL_PRINT_MC_SHEETS,
  TUTORIAL_WELCOME_DASHBOARD_WITHOUT_GROUPS,
  TUTORIAL_WELCOME_DASHBOARD_WITH_GROUPS,
  TUTORIAL_AFTER_PRINT_MC_SHEETS,
  HEADER_PLUS_ICON_CONTAINER_ID,
} from 'globalConstants';
import { isTeacher } from 'utils/helpers/usersHelper';
import { getEnabledTutorials } from 'utils/helpers/tutorialHelpers';
import { getPulseButtonValue } from 'utils/helpers/common';
import { CreateArrow } from 'images';

import messages from './messages';
import { styles } from './styles';
import '../font/style.scss';
import './styles.scss';

class Header extends React.Component {
  onGenerateSheetClick = () => {
    const { groups, history } = this.props;
    const numberOfGenericAssessments = _.sum(groups.map(group => group.generic_assessments_count));
    if (numberOfGenericAssessments === 0) {
      this.printMCAnswerSheetModal();
    } else {
      history.push('groups/preview/');
    }
  };

  printMCAnswerSheetModal = () => {
    const { classes } = this.props;
    this.props.showModal({
      title: <FormattedMessage {...messages.printMCAnswerSheetsTitle} />,
      body: (
        <div className={classes.print_mc_answer_sheet_modal}>
          <div>
            <FormattedMessage {...messages.printMCAnswerSheetsBody} />
          </div>
          <div className={classes.okay_btn_container}>
            <MUButton
              className={classes.okay_button}
              text={<FormattedMessage {...messages.okay} />}
              onClick={this.props.hideModal}
            />
          </div>
        </div>
      ),
    });
  };

  renderReadyForDownloadButton = classes => {
    const { isModalActive, user } = this.props;
    const isDashboardGenerateGenericAsEnabled = getPulseButtonValue(user, PULSE_DASHBOARD_DOWNLOAD_GENERIC_AS);
    return (
      <div className={classes.download_container}>
        <div>
          <IconButton
            borderRadius="50%"
            icon={<IconReadyForDownload className={classes.ready_for_download_icon} />}
            onClick={this.props.onDownloadFile}
            className={isDashboardGenerateGenericAsEnabled && !isModalActive ? classes.pulse : null}
          />
        </div>
        <div className={classNames(classes.generate_mc_title, { readyForDownload: true })}>
          <FormattedMessage {...messages.download} />
        </div>
      </div>
    );
  };

  renderGeneratingButton = classes => (
    <div className={classes.loading_container}>
      <div className={classes.loading}>
        <Loading size={25} />
      </div>
      <div className={classes.generate_mc_title}>
        <FormattedMessage {...messages.generating} />
      </div>
    </div>
  );

  // Uncomment it when the customer will be ready to return this logic
  // renderPlayerButton = classes => (
  //   <Tooltip
  //     classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
  //     placement="bottom"
  //     arrow
  //     title={<FormattedMessage {...messages.gettingStartedVideos} />}
  //   >
  //     <div>
  //       <IconButton
  //         borderRadius="50%"
  //         className={classes.player_icon_container}
  //         icon={<IconVideoPlayer id="generate-custom-tutorial-video" className={classes.player_icon} />}
  //         onClick={() => this.props.onShowPlayerModal('player')}
  //       />
  //     </div>
  //  </Tooltip>
  // );

  renderReadyForGenerationButton = classes => {
    const { history, user } = this.props;
    const tooltipMess = (
      <div className={classes.add_class}>
        <FormattedMessage {...messages.printAnswersheets} />{' '}
      </div>
    );
    const enabledTutorials = getEnabledTutorials(user);
    const isDashboardGenerateGenericAsEnabled = getPulseButtonValue(user, PULSE_DASHBOARD_GENERATE_GENERIC_AS);
    const isMCAssessmentCreated = lodashGet(history, 'location.state.mcAssessmentCreated');

    return (
      <Tooltip
        title={tooltipMess}
        placement="bottom"
        arrow
        classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
      >
        <div>
          <IconButton
            borderRadius="50%"
            className={
              isDashboardGenerateGenericAsEnabled &&
              // !enabledTutorials[TUTORIAL_PRINT_MC_SHEETS] &&
              !enabledTutorials[TUTORIAL_AFTER_PRINT_MC_SHEETS] &&
              isMCAssessmentCreated
                ? classes.pulse
                : null
            }
            icon={<IconGenerateSheet id={GENERATE_SHEET_ICON_ID} className={classes.generate_sheet_icon} />}
            onClick={this.onGenerateSheetClick}
          />
        </div>
      </Tooltip>
    );
  };

  renderGenerateMCButton = (classes, history, genericPdfStatus) => {
    const { user } = this.props;
    if (_.isNull(user) || _.isNil(genericPdfStatus)) {
      return null;
    }
    const content = {
      ready_for_generation: this.renderReadyForGenerationButton,
      ready_for_download: this.renderReadyForDownloadButton,
      generating: this.renderGeneratingButton,
    };

    return content[genericPdfStatus](classes, history);
  };

  renderStudentButton = () => {
    const { classes, user, onShowModal } = this.props;
    if (_.isNil(user)) {
      return null;
    }
    return (
      <Tooltip title={<FormattedMessage {...messages.joinNewClass} />} arrow>
        <div id={STUDENT_TUTORIAL_JOIN_BTN_ID}>
          <DefaultButton
            customClasses={{ root: classes.join_class_btn, startIcon: classes.add_start_icon }}
            startIcon={<AddIcon />}
            onClick={() => onShowModal('join')}
            text={<FormattedMessage {...messages.joinClass} />}
          />
        </div>
      </Tooltip>
    );
  };

  renderTeacherButtons = user => {
    const { classes, genericPdfStatus, groups, history, isModalActive } = this.props;
    const enabledTutorials = lodashGet(user, 'enabled_tutorials', {});
    const tooltipText = <FormattedMessage {...messages.createClass} />;
    const isDashboardCreateClassEnabled = getPulseButtonValue(user, PULSE_DASHBOARD_CREATE_CLASS);
    const isTutorialPassed =
      !enabledTutorials[TUTORIAL_WELCOME_DASHBOARD_WITHOUT_GROUPS] ||
      !enabledTutorials[TUTORIAL_WELCOME_DASHBOARD_WITH_GROUPS];
    return (
      <Fragment>
        {groups && groups.length === 0 && (
          <div className={classes.add_new_class_note_container}>
            <span className={classes.add_new_class_note_text}>
              <FormattedMessage {...messages.createFirstClass} />
            </span>
            <img src={CreateArrow} alt="" className={classes.add_new_class_note_arrow} />
          </div>
        )}
        <Tooltip
          title={tooltipText}
          placement="bottom"
          arrow
          classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
        >
          <div className={classes.plus}>
            <IconButton
              id={HEADER_PLUS_ICON_CONTAINER_ID}
              borderRadius="50%"
              className={
                isDashboardCreateClassEnabled && _.isEmpty(groups) && isTutorialPassed && !isModalActive
                  ? classNames(classes.plus_icon_container, classes.pulse)
                  : classes.plus_icon_container
              }
              icon={<AddIcon className={classes.plus_icon} />}
              onClick={() => this.props.onShowModal('create')}
            />
          </div>
        </Tooltip>
        {this.renderGenerateMCButton(classes, history, genericPdfStatus)}
        {/* {this.renderPlayerButton(classes)} */}
      </Fragment>
    );
  };

  renderButtons = () => {
    const { classes, history, user } = this.props;
    return (
      <Grid item xs={6} className={classes.header_item_rigth}>
        {isTeacher(user) ? this.renderTeacherButtons(user) : this.renderStudentButton()}
        <AccountLayout history={history} />
      </Grid>
    );
  };

  render() {
    const { classes } = this.props;
    const iOS = /iPad|iPhone|iPod|Mac/.test(navigator.userAgent) && !window.MSStream;
    const tooltipHome = <FormattedMessage {...messages.showClasses} />;

    const refreshPage = () => window.location.reload(false);

    return (
      <AppBar position="fixed" className={classes.header} color="transparent">
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.header_container}
        >
          <Grid item xs={6} className={classes.header_item_left}>
            <Tooltip
              title={tooltipHome}
              placement="bottom"
              arrow
              classes={{ tooltip: classes.tooltip, arrow: classes.arrow }}
            >
              <div>
                <IconHome onClick={refreshPage} className={classNames(classes.home_icon, { iOS })} />
              </div>
            </Tooltip>
            <div className={classNames(classes.header_title_text, 'logo_text')}>
              <FormattedMessage {...messages.swiftGrade} />
            </div>
          </Grid>
          {this.renderButtons()}
        </Grid>
      </AppBar>
    );
  }
}

Header.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  genericPdfStatus: PropTypes.string,
  groups: PropTypes.array,
  isModalActive: PropTypes.bool,
  role: PropTypes.string,
  user: PropTypes.object,
  hideModal: PropTypes.func,
  onDownloadFile: PropTypes.func,
  onShowModal: PropTypes.func,
  onShowPlayerModal: PropTypes.func,
  showModal: PropTypes.func,
};

export default withStyles(styles)(Header);
