import { LightenDarkenColor } from 'lighten-darken-color';
import BarChartIcon from '@material-ui/icons/BarChart';
import PhotoCameraIcon from '@material-ui/icons/PhotoCamera';
import { FormattedMessage } from 'react-intl';
import _ from 'lodash';
import React from 'react';
import { IconAssignArrowUp, IconCustom, IconRocket, IconReadyForDownload } from 'components/Svgs';
import {
  PULSE_ASSESSMENTS_PRINT_AS,
  PULSE_ASSESSMENTS_RELEASE_ONLINE_AS,
  PULSE_ASSESSMENTS_DOWNLOAD_REGULAR_AS,
  PULSE_AVAILABLE_ASSESSMENTS_START,
} from 'globalConstants';
import { isTeacher } from 'utils/helpers/usersHelper';
import messages from './messages';

const GRADING_STYLES = color => {
  const index = ['#9ccc65', '#d4e157', '#bdbdbd', '#ffca28'].includes(color) ? 15 : 50;
  return { color: LightenDarkenColor(color, index) };
};

const ICONS = {
  assigned: BarChartIcon,
  completed_unassigned: BarChartIcon,
  generating: PhotoCameraIcon,
  ready_for_assignment: IconAssignArrowUp,
  ready_for_generation: IconCustom,
  ready_for_download: IconReadyForDownload,
  ready_for_scan: PhotoCameraIcon,
  ready_to_start: IconRocket,
  scanned: BarChartIcon,
  scanning: BarChartIcon,
};

const ICON_TEXT = {
  assigned: <FormattedMessage {...messages.released} />,
  scanned: <FormattedMessage {...messages.needsGrading} />,
  ready_for_download: <FormattedMessage {...messages.readyForDownload} />,
};

const ICON_TOOLTIP_TEXT = {
  assigned: <FormattedMessage {...messages.released} />,
  scanned: <FormattedMessage {...messages.removeNeedGrading} />,
  ready_for_download: <FormattedMessage {...messages.readyForDownload} />,
};

const DISABLED_TITLES = {
  assigned: <FormattedMessage {...messages.noResultsYet} />,
  scanned: <FormattedMessage {...messages.teacherNotReleasedResults} />,
};

const TOOLTIP_TEXT = (assessment, keyName, user) => {
  const assessmentStatus = _.has(assessment, 'status') ? assessment.status : keyName;

  return {
    assigned:
      isTeacher(user) && assessment.results_exist ? (
        <FormattedMessage {...messages.viewResults} />
      ) : (
        <FormattedMessage {...messages.startTest} />
      ),
    completed_unassigned: <FormattedMessage {...messages.removeNeedGrading} />,
    generating: <FormattedMessage {...messages.scanAnswerSheet} />,
    ready_for_assignment: assessment.results_exist ? (
      <FormattedMessage {...messages.viewResults} />
    ) : (
      <FormattedMessage {...messages.releaseAnswerSheet} />
    ),
    ready_for_generation: <FormattedMessage {...messages.printAnswerSheet} />,
    ready_for_download: <FormattedMessage {...messages.readyForDownload} />,
    ready_for_scan: <FormattedMessage {...messages.scanAnswerSheet} />,
    ready_to_start: 'IconRocket',
    scanned: <FormattedMessage {...messages.viewResults} />,
  }[assessmentStatus];
};

const checkIsDisabledIcon = (assessment, keyName, user) => {
  const { results_exist: resultsExist, score } = assessment;
  const disabled = {
    assigned: isTeacher(user) && !resultsExist,
    scanned: !isTeacher(user) && _.isNull(score),
  };
  return disabled[keyName];
};

const PULSE_BUTTONS_MAP = {
  ready_for_assignment: PULSE_ASSESSMENTS_RELEASE_ONLINE_AS,
  ready_for_download: PULSE_ASSESSMENTS_DOWNLOAD_REGULAR_AS,
  ready_for_generation: PULSE_ASSESSMENTS_PRINT_AS,
  ready_to_start: PULSE_AVAILABLE_ASSESSMENTS_START,
};

export {
  checkIsDisabledIcon,
  DISABLED_TITLES,
  GRADING_STYLES,
  ICON_TEXT,
  ICONS,
  TOOLTIP_TEXT,
  ICON_TOOLTIP_TEXT,
  PULSE_BUTTONS_MAP,
};
