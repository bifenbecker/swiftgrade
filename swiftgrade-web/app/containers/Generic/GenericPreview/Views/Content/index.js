import React from 'react';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';

import { Button, Grid, withStyles } from '@material-ui/core';
import _ from 'lodash';

import { Loading } from 'components/Controls';
import { PDFDisplay } from 'components/DataDisplay';
import { hideModal, showModal } from 'components/Modals/Modal/actions';
import IconDownload from 'components/Svgs/IconDownload';
import {
  GENERIC_PREVIEW_CUSTOMIZE_ID,
  GENERIC_PREVIEW_DOWNLOAD_BUTTON_ID,
  GENERIC_PREVIEW_PAGE_TUTORIAL,
  PULSE_PREVIEW_DOWNLOAD_GENERIC_AS,
} from 'globalConstants';
import { getPulseButtonValue, updatePulseButtons } from 'utils/helpers/common';
import { getEnabledTutorials } from 'utils/helpers/tutorialHelpers';

import { styles } from './styles';
import GenericASConfigSelector from '../GenericASConfigSelector';
import InputStudentNames from '../InputStudentNames';
import NoStudentsModalBody from '../NoStudentsModalBody';
import SelectClassess from '../SelectClasses';
import { FILE_FORMATS, NUMBER_OF_ANSWERS, NUMBER_OF_LETTERS, SHEETS_PER_PAGE } from '../../config';
import messages from '../../messages';
import './styles.scss';

class Content extends React.Component {
  componentWillUnmount() {
    updatePulseButtons(this.props.user, this.props.updateCurrentUserRequest, PULSE_PREVIEW_DOWNLOAD_GENERIC_AS);
    this.props.hideModal();
  }

  onChangeStudentNamesIncluded = newValue => {
    const { groups, selectedClasses, onChangeSelectedClasses, onChangeStudentNamesIncluded } = this.props;
    if (newValue === true) {
      if (groups.length === 0) {
        this.noStudentsModal();
      } else {
        onChangeStudentNamesIncluded(newValue);
      }
    } else {
      onChangeSelectedClasses(
        selectedClasses.map(obj => ({
          id: obj.id,
          name: obj.name,
          selected: false,
          selectDisabled: obj.selectDisabled,
        })),
      );
      onChangeStudentNamesIncluded(newValue);
    }
  };

  updateUser = () => {
    const { user } = this.props;
    const enabledPopups = _.cloneDeep(user.enabled_popups);
    enabledPopups.generic = false;
    this.props.updateCurrentUserRequest({
      data: { enabled_popups: enabledPopups },
      userId: user.id,
    });
    this.props.hideModal();
  };

  noStudentsModal = () => {
    this.props.showModal({
      title: <FormattedMessage {...messages.noStudentsFound} />,
      body: <NoStudentsModalBody hideModal={this.props.hideModal} />,
    });
  };

  renderDownloadBtn = (classes, color, status, user) => {
    const { intl, isModalActive, selectedClasses, studentNamesIncluded } = this.props;
    const enabledTutorials = getEnabledTutorials(user);
    const selectedAmount = selectedClasses.filter(obj => obj.selected === true);
    const downloadMessage =
      selectedAmount &&
      (selectedAmount.length > 1
        ? intl.formatMessage(messages.downloadFilesPlural, { amount: selectedAmount.length })
        : intl.formatMessage(messages.downloadSingleFile));
    const disabled =
      status === 'generating' || (selectedAmount && selectedAmount.length === 0 && studentNamesIncluded === true);
    const downloadButtonColor = disabled ? '#B7B6F3' : color;
    const isPreviewDownloadGenericAsEnabled = getPulseButtonValue(user, PULSE_PREVIEW_DOWNLOAD_GENERIC_AS);

    return (
      <div className={classes.download}>
        <Button
          id={GENERIC_PREVIEW_DOWNLOAD_BUTTON_ID}
          classes={{ label: classes.download_btn }}
          disabled={disabled}
          onClick={this.props.onDownload}
        >
          <IconDownload
            color={downloadButtonColor}
            style={{ height: 40, width: 40 }}
            className={
              isPreviewDownloadGenericAsEnabled &&
              !disabled &&
              !isModalActive &&
              !enabledTutorials[GENERIC_PREVIEW_PAGE_TUTORIAL]
                ? classes.pulse
                : null
            }
          />
          <div className={classes.download_btn_text} style={{ color }}>
            {((studentNamesIncluded === true && selectedAmount && selectedAmount.length > 0) ||
              studentNamesIncluded === false) &&
              downloadMessage}
          </div>
        </Button>
      </div>
    );
  };

  render() {
    const {
      answersAmount,
      classes,
      downloadClicked,
      fileFormat,
      genericPreview,
      groups,
      height,
      intl,
      isLoading,
      isLoadingPdf,
      lettersAmount,
      selectedClasses,
      studentNamesIncluded,
      sheetsPerPageAmount,
      sheetsPerPageDisbled,
      onChangeCheckboxValue,
      onChangeFileFormat,
      onChangeNumberOfAnswers,
      onChangeNumberOfLetters,
      onChangeSheetsPerPage,
      user,
    } = this.props;

    if (downloadClicked && isLoading) {
      // remove if unnecessary
      // const enabledTutorials = {
      //   ...user.enabled_tutorials,
      //   download_mc_as: true, // ???
      // };

      // this.props.updateCurrentUserRequest({
      //   // change place of the request
      //   data: { enabled_tutorials: enabledTutorials },
      //   userId: user.id,
      // });
      return (
        <div className={classes.loading}>
          <Loading />
        </div>
      );
    }

    return (
      <Grid alignItems="flex-start" container direction="row" justify="space-between" style={{ height: '100%' }}>
        <Grid xs={5} md={4} item style={{ height: '100%', overflowY: 'auto' }} className={classes.content}>
          <div className={classes.title}>
            <FormattedMessage {...messages.settings} />
          </div>
          <InputStudentNames
            studentNamesIncluded={studentNamesIncluded}
            onChangeStudentNamesIncluded={this.onChangeStudentNamesIncluded}
          />

          <div id={GENERIC_PREVIEW_CUSTOMIZE_ID} className={classes.customize_container}>
            <GenericASConfigSelector
              defaultValue={answersAmount}
              onChangeConfig={onChangeNumberOfAnswers}
              options={NUMBER_OF_ANSWERS}
              title={<FormattedMessage {...messages.numberOfAnswers} />}
            />
            <GenericASConfigSelector
              defaultValue={lettersAmount}
              onChangeConfig={onChangeNumberOfLetters}
              options={NUMBER_OF_LETTERS}
              title={<FormattedMessage {...messages.numberOfLetters} />}
            />
            <GenericASConfigSelector
              defaultValue={sheetsPerPageAmount}
              disabled={sheetsPerPageDisbled}
              onChangeConfig={onChangeSheetsPerPage}
              options={SHEETS_PER_PAGE}
              title={<FormattedMessage {...messages.sheetsPerPage} />}
            />
            {!studentNamesIncluded && (
              <GenericASConfigSelector
                defaultValue={fileFormat}
                onChangeConfig={onChangeFileFormat}
                options={FILE_FORMATS}
                title={<FormattedMessage {...messages.fileFormat} />}
              />
            )}
          </div>

          <SelectClassess
            groups={groups}
            height={height}
            intl={intl}
            selectedClasses={selectedClasses}
            studentNamesIncluded={studentNamesIncluded}
            onChangeCheckboxValue={onChangeCheckboxValue}
          />
          {this.renderDownloadBtn(classes, '#285EF4', 'preview', user)}
        </Grid>
        <Grid xs={7} md={8} item className={classes.pdf}>
          <PDFDisplay
            url={genericPreview.document_preview_url}
            isLoading={isLoadingPdf}
            genericPreview
            studentNamesIncluded={studentNamesIncluded}
            selectedClasses={selectedClasses}
          />
        </Grid>
      </Grid>
    );
  }
}

Content.propTypes = {
  answersAmount: PropTypes.number,
  fileFormat: PropTypes.string,
  groups: PropTypes.any,
  downloadClicked: PropTypes.bool,
  isLoading: PropTypes.bool,
  isLoadingPdf: PropTypes.bool,
  isModalActive: PropTypes.bool,
  studentNamesIncluded: PropTypes.bool,
  height: PropTypes.number,
  selectedClasses: PropTypes.array,
  classes: PropTypes.object,
  genericPreview: PropTypes.object,
  history: PropTypes.object,
  intl: PropTypes.object,
  lettersAmount: PropTypes.number,
  sheetsPerPageAmount: PropTypes.number,
  sheetsPerPageDisbled: PropTypes.bool,
  user: PropTypes.object,
  hideModal: PropTypes.func,
  onChangeCheckboxValue: PropTypes.func,
  onChangeFileFormat: PropTypes.func,
  onChangeNumberOfAnswers: PropTypes.func,
  onChangeNumberOfLetters: PropTypes.func,
  onDownload: PropTypes.func,
  onChangeSelectedClasses: PropTypes.func,
  onChangeSheetsPerPage: PropTypes.func,
  onChangeStudentNamesIncluded: PropTypes.func,
  setTutorialModalVisibility: PropTypes.func,
  showModal: PropTypes.func,
  updateCurrentUserRequest: PropTypes.func,
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
  injectIntl,
  withStyles(styles),
)(Content);
