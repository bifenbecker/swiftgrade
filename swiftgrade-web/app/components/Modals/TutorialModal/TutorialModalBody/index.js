import React from 'react';
import { FormattedMessage } from 'react-intl';
import Lottie from 'react-lottie';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { compose } from 'redux';

import { Grid } from '@material-ui/core';

import _, { get as lodashGet } from 'lodash';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { updateCurrentUserRequest } from 'containers/App/actions';
import { MUButton, MUCheckbox } from 'components/Controls';
import { IconAssignArrowUp, IconCustom, IconGenerateSheet } from 'components/Svgs';
import { DashboardFormattedLink } from 'components/DashboardFormattedLink';
import { LottieAndPlayerModalBody } from 'components/Modals/TutorialModal/Views';
import { makeSelectCurrentUser } from 'containers/App/selectors';
import ScanAnswerSheetBody from 'containers/Assessments/AssessmentsList/Views/ScanAnswerSheetBody';
import {
  GenericTipFillCircles,
  GenericTipUseDarkPen,
  TipEraseMistakes,
  TipPrintText,
  TipWriteInsideBox,
  TipWriteLarge,
  FilledCircles,
  DarkCircle,
} from 'images';
import { TUTORIAL_PRINT_MC_SHEETS } from 'globalConstants';

import { AFTER_RELEASE_LOTTIE_OPTIONS } from './constants';
import {
  AFTER_RELEASE_TUTORIAL_KEY,
  ASK_TO_WRITE_NEATLY_TUTORIAL_KEY,
  CREATE_ASSESSMENT_TUTORIAL_KEY,
  CUSTOM_TUTORIAL_KEY,
  DISTRIBUTE_GENERIC_AS_TUTORIAL_KEY,
  DISTRIBUTE_REGULAR_AS_TUTRIAL_KEY,
  GENERIC_TUTORIAL_KEY,
  NO_STUDENTS_TUTORIAL_KEY,
  ONLINE_TUTORIAL_KEY,
  SCAN_WRITTEN_GENERIC_AS_TUTORIAL_KEY,
  SCAN_WRITTEN_AS_TUTORIAL_KEY,
  STUDENT_INSTRUCTIONS_TUTORIAL_KEY,
  STUDENTS_MUST_FILL_CIRCLES_TUTORIAL_KEY,
  VIEW_RESULTS_TUTORIAL_KEY,
} from '../constants';

import messages from './messages';
import { styles } from './styles';

class TutorialModalBody extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checkboxIsChecked: false,
    };
  }

  getModalButton = ({ disabled = false, message, onClick, endIcon }) => {
    const { classes } = this.props;

    return (
      <MUButton
        className={classes.transparent_modal_button}
        disabled={disabled}
        style={{ color: disabled ? 'gray' : '#3367d6' }}
        onClick={onClick}
        text={<FormattedMessage {...message} />}
        endIcon={endIcon}
      />
    );
  };

  renderFormattedMessageWithIcon = (message, Icon, iconProps = {}) => {
    const { classes } = this.props;
    const messageValues = {};

    if (Icon) {
      messageValues.icon = <Icon className={classes.tutorial_icon} {...iconProps} />;
    }
    return <FormattedMessage {...message} values={messageValues} />;
  };

  renderFormattedMessageWithLinkAndIcon = (message, Icon, Link, iconProps = {}) => {
    const { classes } = this.props;
    const messageValues = {};

    if (Icon) {
      messageValues.icon = <Icon className={classes.tutorial_icon} {...iconProps} />;
    }

    if (Link) {
      messageValues.link = <Link />;
    }

    return <FormattedMessage {...message} values={messageValues} />;
  };

  renderAskToWriteNeatlyBody = () => {
    const { classes } = this.props;

    return (
      <div className={classes.tutorial_ask_to_write_neatly_body}>
        <br />
        <FormattedMessage {...messages.neatWritingInstructionsHeader} />
        <br />
        <br />

        <div className={classes.tutorial_ask_to_write_neatly_body_container}>
          <Grid container spacing={2}>
            <Grid item md={6} sm={12}>
              <li>
                <FormattedMessage {...messages.neatWritingInstructionsWriteLarge} />
              </li>
              <div className={classes.tutorial_ask_to_write_neatly_body_img}>
                <img src={TipWriteLarge} alt="" />
              </div>
            </Grid>
            <Grid item md={6} sm={12}>
              <li>
                <FormattedMessage {...messages.neatWritingInstructionsWriteInsideBox} />
              </li>
              <div className={classes.tutorial_ask_to_write_neatly_body_img}>
                <img src={TipWriteInsideBox} alt="" style={{ height: 80 }} />
              </div>
            </Grid>
            <Grid item md={6} sm={12}>
              <li>
                <FormattedMessage {...messages.neatWritingInstructionsNoCursive} />
              </li>
              <div className={classes.tutorial_ask_to_write_neatly_body_img}>
                <img src={TipPrintText} alt="" />
              </div>
            </Grid>
            <Grid item md={6} sm={12}>
              <li>
                <FormattedMessage {...messages.neatWritingInstructionsEraseMistakes} />
              </li>
              <div className={classes.tutorial_ask_to_write_neatly_body_img}>
                <img src={TipEraseMistakes} alt="" />
              </div>
            </Grid>
          </Grid>
        </div>
        <FormattedMessage {...messages.neatWritingInstructionsFooter} />
      </div>
    );
  };

  renderScanWrittenASBody = () => {
    const { group, tutorialKey } = this.props;
    return (
      <ScanAnswerSheetBody
        downloadAppBodyMessage={messages.downloadAppFirstTimeBody}
        group={group}
        onClose={this.props.hideModal}
        showModal={this.props.showModal}
        isButtonActive={false}
        tutorialKey={tutorialKey}
      />
    );
  };

  renderAfterReleaseBody = () => {
    const { classes } = this.props;
    const appDomain = 'https://goswiftgrade.com/';

    return (
      <div>
        <FormattedMessage {...messages.afterReleaseOASTutorialBodyHeader} />
        <br />

        <ol className={classes.tutorial_body_list}>
          <li>
            <FormattedMessage
              {...messages.afterReleaseOASTutorialBodyFirst}
              values={{ link: <a href={appDomain}>{appDomain}</a> }}
            />
          </li>
          <li>
            <FormattedMessage {...messages.afterReleaseOASTutorialBodySecond} />
          </li>
          <li>
            <FormattedMessage {...messages.afterReleaseOASTutorialBodyThird} />
          </li>
        </ol>

        <div className={classes.released_images_container}>
          <Lottie options={AFTER_RELEASE_LOTTIE_OPTIONS} height={250} width={250} />
        </div>

        {/* <br />
        <br />
        <FormattedMessage {...messages.afterReleaseOASTutorialBodyDescrVideo} />
        <br />
        <br />

        <div className={classes.released_video_container}>
          <VideoPlayer uuid="5hUnb3NbwC8m2oyooHYcox" />
        </div> */}
      </div>
    );
  };

  renderCustomBody = groupColor =>
    this.renderFormattedMessageWithIcon(messages.printRegularASBody, IconCustom, { fill: groupColor });

  renderGenericBody = () =>
    this.renderFormattedMessageWithLinkAndIcon(
      messages.printMCASTutorialBody,
      IconGenerateSheet,
      DashboardFormattedLink,
    );

  renderDistributeGenericASBody = () => <LottieAndPlayerModalBody tutorialKey={this.props.tutorialKey} />;

  renderDistributeRegularASBody = () => <LottieAndPlayerModalBody tutorialKey={this.props.tutorialKey} />;

  renderScanGenericASBody = () => {
    const { group, tutorialKey } = this.props;
    return (
      <ScanAnswerSheetBody
        group={group}
        onClose={this.props.hideModal}
        showModal={this.props.showModal}
        isButtonActive={false}
        tutorialKey={tutorialKey}
      />
    );
  };

  renderNoStudentsBody = () => {
    const { classes } = this.props;

    return (
      <div className={classes.tutorial_no_students_body}>
        <FormattedMessage {...messages.addStudentsTutorialBodyNoStudents} />
        <br />
        <FormattedMessage {...messages.addStudentsTutorialBodyAddStudents} />
      </div>
    );
  };

  renderOnlineBody = groupColor => (
    <span className={this.props.classes.tutorial_online_body}>
      {this.renderFormattedMessageWithIcon(messages.releaseOASTurorialBody, IconAssignArrowUp, { fill: groupColor })}
    </span>
  );

  renderStudentInstructionsBody = () => {
    const { classes } = this.props;
    return (
      <div className={classes.tutorial_student_instructions_body_title}>
        <FormattedMessage
          {...messages.mcSheetsFillingInstructions}
          values={{
            important: (
              <span className={classes.important_text}>
                <FormattedMessage {...messages.important} />
              </span>
            ),
          }}
        />
        <ul className={classes.tutorial_student_instructions_body}>
          <li>
            <FormattedMessage {...messages.fillCircles} />
            <div className={classes.students_must_fill_circles_img}>
              <img src={FilledCircles} alt="" className={classes.circle_images} width="60%" />
            </div>
          </li>
          <li>
            <FormattedMessage {...messages.usePencil} />
            <div className={classes.students_must_fill_circles_img}>
              <img src={DarkCircle} alt="" className={classes.circle_images_dark} width="32%" />
            </div>
          </li>
          <li>
            <FormattedMessage {...messages.doNotFold} />
          </li>
          <li>
            <FormattedMessage {...messages.doNotWriteOnAnchors} />
          </li>
          <li>
            <FormattedMessage {...messages.eraseMistakes} />
          </li>
        </ul>
      </div>
    );
  };

  renderStudentsMustFillCirclesBody = () => {
    const { classes } = this.props;

    return (
      <div className={classes.tutorial_students_must_fill_circles}>
        <FormattedMessage
          {...messages.mcSheetsFillingInstructions}
          values={{
            important: (
              <span className={classes.important_text}>
                <FormattedMessage {...messages.important} />
              </span>
            ),
          }}
        />
        <ul>
          <li>
            <FormattedMessage {...messages.fillCirlclesFully} />
          </li>
          <img src={GenericTipFillCircles} alt="" />
          <li>
            <FormattedMessage {...messages.useDarkPen} />
          </li>
          <img src={GenericTipUseDarkPen} alt="" />
          <li>
            <FormattedMessage {...messages.doNotFold} />
          </li>
          <li>
            <FormattedMessage {...messages.doNotWriteOnAnchors} />
          </li>
          <li>
            <FormattedMessage {...messages.eraseMistakes} />
          </li>
        </ul>
      </div>
    );
  };

  renderBodyText = () => {
    const { group, tutorialKey } = this.props;
    const bodyRenderMethod = _.get(this, `render${tutorialKey}Body`);
    return bodyRenderMethod(lodashGet(group, 'color'));
  };

  // renderUnderstandAndNextButtons = () => {
  // return (
  //   <>
  //     <MUCheckbox
  //       checked={checkboxIsChecked}
  //       checkboxClasses={{ label: { label: classes.tutorial_checkbox_label } }}
  //       label={<FormattedMessage {...messages.iUnderstand} />}
  //       onChange={() => this.setState({ checkboxIsChecked: !checkboxIsChecked })}
  //     />
  //     {this.getModalButton({ disabled: !checkboxIsChecked, message: messages.next, onClick: onDoNotShowClick })}
  //   </>
  // )
  // };

  renderActionButtons = () => {
    const { classes, history, tutorialKey, group, user, hideModal, okCallback } = this.props;
    const { checkboxIsChecked } = this.state;
    let Buttons;

    const onDoNotShowClick = () => {
      hideModal();
      this.props.onDoNotShowClick();
    };

    const redirectToDashboard = () => {
      const enabledTutorials = lodashGet(user, 'enabled_tutorials');
      enabledTutorials[TUTORIAL_PRINT_MC_SHEETS] = true;
      const handleSuccess = () => {
        hideModal();
        history.push({ pathname: '/teacher/', state: { mcAssessmentCreated: true } });
      };
      this.props.updateCurrentUserRequest({
        data: { enabled_tutorials: enabledTutorials },
        userId: user.id,
        handleSuccess,
      });
    };

    const onOkClick = () => {
      hideModal();

      if (okCallback) {
        okCallback();
      }
    };

    const onStudentsTabClick = () => {
      hideModal();
      history.push(`/groups/${group.id}/students/`);
    };

    switch (tutorialKey) {
      case AFTER_RELEASE_TUTORIAL_KEY: {
        Buttons = this.getModalButton({ message: messages.gotIt, onClick: onDoNotShowClick });
        break;
      }
      case ONLINE_TUTORIAL_KEY: {
        Buttons = this.getModalButton({ message: messages.okay, onClick: onDoNotShowClick });
        break;
      }
      case DISTRIBUTE_GENERIC_AS_TUTORIAL_KEY: {
        Buttons = this.getModalButton({ message: messages.distributeGenericASButton, onClick: onDoNotShowClick });
        break;
      }
      case DISTRIBUTE_REGULAR_AS_TUTRIAL_KEY: {
        Buttons = this.getModalButton({ message: messages.distributeRegularASButton, onClick: onDoNotShowClick });
        break;
      }
      case ASK_TO_WRITE_NEATLY_TUTORIAL_KEY: {
        Buttons = (
          <>
            <MUCheckbox
              checked={checkboxIsChecked}
              checkboxClasses={{ label: { label: classes.tutorial_checkbox_label } }}
              label={<FormattedMessage {...messages.iUnderstand} />}
              onChange={() => this.setState({ checkboxIsChecked: !checkboxIsChecked })}
            />
            {this.getModalButton({ disabled: !checkboxIsChecked, message: messages.next, onClick: onDoNotShowClick })}
          </>
        );
        break;
      }
      case SCAN_WRITTEN_AS_TUTORIAL_KEY:
      case SCAN_WRITTEN_GENERIC_AS_TUTORIAL_KEY: {
        Buttons = this.getModalButton({ message: messages.done, onClick: onDoNotShowClick });
        break;
      }
      case STUDENTS_MUST_FILL_CIRCLES_TUTORIAL_KEY: {
        Buttons = (
          <>
            <MUCheckbox
              checked={checkboxIsChecked}
              checkboxClasses={{ label: { label: classes.tutorial_checkbox_label } }}
              label={<FormattedMessage {...messages.iUnderstand} />}
              onChange={() => this.setState({ checkboxIsChecked: !checkboxIsChecked })}
            />
            {this.getModalButton({ disabled: !checkboxIsChecked, message: messages.next, onClick: onDoNotShowClick })}
          </>
        );
        break;
      }
      case CUSTOM_TUTORIAL_KEY: {
        Buttons = this.getModalButton({ message: messages.okay, onClick: onDoNotShowClick });
        break;
      }
      case GENERIC_TUTORIAL_KEY: {
        Buttons = this.getModalButton({ message: messages.goToDashboard, onClick: redirectToDashboard });
        break;
      }
      case CREATE_ASSESSMENT_TUTORIAL_KEY:
      case VIEW_RESULTS_TUTORIAL_KEY: {
        if (
          user &&
          _.has(user, 'enabled_tutorials') &&
          (!_.has(user.enabled_tutorials, 'create_assessment_help') || user.enabled_tutorials.create_assessment_help)
        )
          Buttons = (
            <>
              {this.getModalButton({ message: messages.doNotShowAgain, onClick: onDoNotShowClick })}
              {this.getModalButton({ message: messages.watchLater, onClick: onOkClick })}
            </>
          );
        else Buttons = this.getModalButton({ message: messages.done, onClick: onDoNotShowClick });
        break;
      }
      case NO_STUDENTS_TUTORIAL_KEY: {
        Buttons = this.getModalButton({ message: messages.goToStudentsTab, onClick: onStudentsTabClick });
        break;
      }
      // duplicate with key below - fix
      // case STUDENT_INSTRUCTIONS_TUTORIAL_KEY: {
      //   Buttons = this.getModalButton({ message: messages.okay, onClick: onOkClick });
      //   break;
      // }
      case STUDENT_INSTRUCTIONS_TUTORIAL_KEY: {
        Buttons = this.getModalButton({ message: messages.gotIt, onClick: onOkClick });
        break;
      }
      default: {
        Buttons = (
          <>
            {this.getModalButton({ message: messages.doNotShowAgain, onClick: onDoNotShowClick })}
            {this.getModalButton({ message: messages.ok, onClick: onOkClick })}
          </>
        );
        break;
      }
    }

    return <div className={classes.tutorial_modal_buttons}>{Buttons}</div>;
  };

  render() {
    return (
      <div>
        {this.renderBodyText()}
        {this.renderActionButtons()}
      </div>
    );
  }
}

TutorialModalBody.propTypes = {
  classes: PropTypes.object,
  group: PropTypes.object,
  history: PropTypes.object,
  tutorialKey: PropTypes.string,
  user: PropTypes.object,
  hideModal: PropTypes.func,
  okCallback: PropTypes.func,
  onClose: PropTypes.func,
  onDoNotShowClick: PropTypes.func,
  showModal: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
};

TutorialModalBody.defaultProps = {
  group: {},
};

const mapStateToProps = createStructuredSelector({
  user: makeSelectCurrentUser(),
});

const mapDispatchToProps = {
  updateCurrentUserRequest,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(TutorialModalBody);
