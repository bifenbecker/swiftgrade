import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Tooltip } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import _ from 'lodash';

import { makeSelectAssessment } from 'containers/Assessments/config/selectors';
import { makeSelectGroup } from 'containers/Groups/selectors';
import { DefaultButton } from 'components/Controls';
import { showModal, hideModal } from 'components/Modals/Modal/actions';
import { IconInfoFilled, IconInfoQuestion } from 'components/Svgs';
import { CUSTOM_INFO_MESSAGES, TOOLTIP_MESSAGES } from './constants';
import messages from './messages';
import { styles } from './styles';

class InfoView extends React.Component {
  getCustomInfoMessage = desmosMessage => {
    if (Object.keys(CUSTOM_INFO_MESSAGES).includes(desmosMessage)) {
      return CUSTOM_INFO_MESSAGES[desmosMessage];
    }
    const variableName = desmosMessage.match(/'\w+'/);
    if (variableName) {
      const cleanedDesmosMessage = desmosMessage.replace(variableName, "''");
      if (Object.keys(CUSTOM_INFO_MESSAGES).includes(cleanedDesmosMessage)) {
        return CUSTOM_INFO_MESSAGES[cleanedDesmosMessage].replace('{variableName}', variableName);
      }
    }
    return desmosMessage;
  };

  getTooltipMessages = tooltipType => {
    const tooltipMessages = TOOLTIP_MESSAGES[tooltipType];
    const { classes } = this.props;

    return (
      <div>
        <div className={classes.tooltip_title}>
          <FormattedMessage {...tooltipMessages.title} />
        </div>
        <FormattedMessage {...tooltipMessages.bodyHeader} />
        <br />
        <br />
        <div className={classes.tooltip_info_icon_question_body_example}>
          <FormattedMessage {...tooltipMessages.forExampleHeader} />
          <br />
          <FormattedMessage
            {...tooltipMessages.forExampleFirst}
            values={{
              answer: (
                <b>
                  <FormattedMessage {...tooltipMessages.forExampleSecond} />
                </b>
              ),
            }}
          />
          <br />
          <FormattedMessage
            {...tooltipMessages.forExampleThird}
            values={{
              answer: (
                <b>
                  <FormattedMessage {...tooltipMessages.forExampleFourth} />
                </b>
              ),
            }}
          />
        </div>
      </div>
    );
  };

  getInfoTooltipMessage = () => {
    const { classes } = this.props;

    return (
      <div>
        <FormattedMessage {...messages.gradedByCharacter} />
        <div className={classes.tooltip_info}>
          <FormattedMessage {...messages.clickForMoreInfo} />
        </div>
      </div>
    );
  };

  getInfoTypeModalBody = () => {
    const { assessment, classes, errorMessage, group, setStateData } = this.props;
    return (
      <div className={classes.info_body}>
        <div>
          <FormattedMessage {...messages.canNotValidateAnswerBody} />
          <div className={classes.desmos_message}>{this.getCustomInfoMessage(errorMessage)}</div>
          <FormattedMessage {...messages.noteThat} />
          <ul className={classes.info_list}>
            <li>
              <FormattedMessage {...messages.unvalidatedMessage} />
              <Tooltip
                title={this.getTooltipMessages('characterMatching')}
                placement="bottom"
                arrow
                classes={{ tooltip: classes.tooltip_info_icon_question }}
              >
                <div className={classes.info_icon_container}>
                  <IconInfoQuestion className={classes.info_icon_question} />
                </div>
              </Tooltip>
            </li>
            <li>
              <FormattedMessage {...messages.validatedMessage} />
              <Tooltip
                title={this.getTooltipMessages('equivalence')}
                placement="bottom"
                arrow
                classes={{ tooltip: classes.tooltip_info_icon_question }}
              >
                <div className={classes.info_icon_container}>
                  <IconInfoQuestion className={classes.info_icon_question} />
                </div>
              </Tooltip>
            </li>
          </ul>
        </div>
        <DefaultButton
          text={<FormattedMessage {...messages.okay} />}
          onClick={() => {
            setStateData({ isInvalidAnswerFocused: false });
            this.props.hideModal();
          }}
          backgroundColor={!_.isNil(assessment) ? assessment.group.color : group.color}
          className={classes.info_button}
        />
      </div>
    );
  };

  onShowInfoTypeModal = () => {
    this.props.showModal({
      title: (
        <Fragment>
          <div>
            <FormattedMessage {...messages.canNotValidateAnswerTitle} />
          </div>
        </Fragment>
      ),
      body: this.getInfoTypeModalBody(),
    });
  };

  render() {
    const { classes, setStateData } = this.props;

    return (
      <Tooltip
        title={this.getInfoTooltipMessage()}
        placement="left"
        arrow
        classes={{ arrow: classes.arrow, tooltip: classes.tooltip }}
      >
        <div
          role="button"
          tabIndex="-1"
          onClick={this.onShowInfoTypeModal}
          onMouseEnter={() => setStateData({ isInvalidAnswerFocused: true })}
        >
          <IconInfoFilled className={classes.info_icon} />
        </div>
      </Tooltip>
    );
  }
}

InfoView.propTypes = {
  assessment: PropTypes.object,
  classes: PropTypes.object,
  errorMessage: PropTypes.string,
  isError: PropTypes.bool,
  group: PropTypes.object,
  hideModal: PropTypes.func,
  meta: PropTypes.object,
  onClick: PropTypes.func,
  setStateData: PropTypes.func,
  showModal: PropTypes.func,
};

const mapStateToProps = createStructuredSelector({
  assessment: makeSelectAssessment(),
  group: makeSelectGroup(),
});

const mapDispatchToProps = {
  hideModal,
  showModal,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(InfoView);
