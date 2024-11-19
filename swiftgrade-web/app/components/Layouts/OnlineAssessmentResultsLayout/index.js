import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { AppBar, Grid } from '@material-ui/core';
import { Attachments, FileUploader } from 'components/DataDisplay';
import { DefaultButton } from 'components/Controls';
import { FormattedMessage } from 'react-intl';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import { hideModal, showModal } from 'components/Modals/Modal/actions';
import { styles } from './styles';
import messages from './messages';

class OnlineAssessmentResultsLayout extends React.Component {
  onBtnClick = key => {
    const { assessment, history } = this.props;
    if (key === 'finish') {
      history.push('/');
    } else {
      history.push(`/groups/${assessment.group.id}/completed_assessments/`);
    }
  };

  onShowFiles = () => {
    const { assessment, classes, files } = this.props;
    this.props.showModal({
      title: <FormattedMessage {...messages.assessmentFiles} />,
      body: (
        <Fragment>
          <FileUploader assessment={assessment} attachments={files} className="read_mode" isDownload toolbar={false} />
          <div className={classes.doneBtnWrapper}>
            <DefaultButton
              backgroundColor={assessment.group.color}
              borderRadius={2}
              text={<FormattedMessage {...messages.done} />}
              onClick={this.props.hideModal}
            />
          </div>
        </Fragment>
      ),
    });
  };

  renderAttachments = assessment =>
    assessment && assessment.settings && assessment.settings.is_auto_release_files_checked ? (
      <Attachments onAttachmentsClick={this.onShowFiles} />
    ) : null;

  renderFinishGrid = (classes, isMobilePortrait) => (
    <div
      className={classNames(classes.finish_group, { isMobilePortrait })}
      onClick={() => this.onBtnClick('finish')}
      role="button"
      tabIndex={-1}
    >
      <div className={classNames(classes.finish_title, { isMobilePortrait })}>
        <FormattedMessage {...messages.finish} />
      </div>
      <ArrowBackIcon className={classes.back_icon} tabIndex={-1} />
    </div>
  );

  renderStartGrid = classes => (
    <Grid xs={3} sm={4} item className={classes.start_block}>
      <ArrowBackIcon className={classes.start_back_icon} tabIndex={-1} onClick={() => this.onBtnClick('back')} />
    </Grid>
  );

  render() {
    const { assessment, classes, isMobilePortrait, kind, mark, user } = this.props;
    const userName = user && (user.first_name || user.last_name) ? `${user.first_name} ${user.last_name}` : null;
    return (
      <AppBar position="relative" style={{ backgroundColor: assessment.group.color }}>
        <Grid
          alignItems="stretch"
          container
          direction="row"
          justify="space-between"
          classes={{ container: classNames(classes.header, { isMobilePortrait }) }}
        >
          <Grid xs={3} sm={4} item className={classes.header_item} justify="flex-start">
            {kind === 'submit' ? this.renderAttachments(assessment) : this.renderStartGrid(classes)}
          </Grid>
          <Grid xs={6} sm={4} item className={classes.titles_block}>
            <div className={classNames(classes.header_group_name, { isMobilePortrait })}>{assessment.name}</div>
            {[userName, mark].map(element => (
              <div className={classNames(classes.title, { isMobilePortrait })}>{element}</div>
            ))}
          </Grid>
          <Grid xs={3} sm={4} item className={classes.finish_block}>
            {kind === 'submit' ? this.renderFinishGrid(classes, isMobilePortrait) : this.renderAttachments(assessment)}
          </Grid>
        </Grid>
      </AppBar>
    );
  }
}

OnlineAssessmentResultsLayout.propTypes = {
  isMobilePortrait: PropTypes.bool,
  kind: PropTypes.string,
  mark: PropTypes.string,
  type: PropTypes.string,
  files: PropTypes.array,
  assessment: PropTypes.object,
  classes: PropTypes.object,
  history: PropTypes.object,
  user: PropTypes.object,
  hideModal: PropTypes.func,
  showModal: PropTypes.func,
};

OnlineAssessmentResultsLayout.defaultProps = {
  files: [],
};

const mapDispatchToProps = {
  hideModal,
  showModal,
};

const withConnect = connect(
  null,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  withStyles(styles),
)(OnlineAssessmentResultsLayout);
