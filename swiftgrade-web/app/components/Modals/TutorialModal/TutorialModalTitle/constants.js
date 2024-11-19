import messages from './messages';
import {
  AFTER_RELEASE_TUTORIAL_KEY,
  ASK_TO_WRITE_NEATLY_TUTORIAL_KEY,
  // CREATE_ASSESSMENT_TUTORIAL_KEY,
  CUSTOM_TUTORIAL_KEY,
  DISTRIBUTE_GENERIC_AS_TUTORIAL_KEY,
  DISTRIBUTE_REGULAR_AS_TUTRIAL_KEY,
  GENERIC_TUTORIAL_KEY,
  NO_STUDENTS_TUTORIAL_KEY,
  ONLINE_TUTORIAL_KEY,
  SCAN_WRITTEN_AS_TUTORIAL_KEY,
  SCAN_WRITTEN_GENERIC_AS_TUTORIAL_KEY,
  STUDENT_INSTRUCTIONS_TUTORIAL_KEY,
  STUDENTS_MUST_FILL_CIRCLES_TUTORIAL_KEY,
  VIEW_RESULTS_TUTORIAL_KEY,
  TEACHER_RESULTS_TUTORIAL_KEY,
} from '../constants';

const TUTORIAL_MODAL_TITLES = {
  [AFTER_RELEASE_TUTORIAL_KEY]: {
    message: messages.afterReleaseOASTutorialTitle,
    style: { textAlign: 'center', width: '70%' },
  },
  [ASK_TO_WRITE_NEATLY_TUTORIAL_KEY]: { message: messages.askToWriteNeatlyTutorialTitle },
  // [CREATE_ASSESSMENT_TUTORIAL_KEY]: { message: messages.createAssessmentTutorialTitle, },
  [CUSTOM_TUTORIAL_KEY]: { message: messages.printRegularASTutorialTitle },
  [DISTRIBUTE_GENERIC_AS_TUTORIAL_KEY]: {
    message: messages.distributeGenericASTitle,
    style: { textAlign: 'center', width: '70%' },
  },
  [DISTRIBUTE_REGULAR_AS_TUTRIAL_KEY]: {
    message: messages.distributeRegularASTitle,
    style: { textAlign: 'center', width: '70%' },
  },
  [GENERIC_TUTORIAL_KEY]: { message: messages.printMCASTutorialTitle },
  [NO_STUDENTS_TUTORIAL_KEY]: { message: messages.addStudentsTutorialTitle },
  [ONLINE_TUTORIAL_KEY]: { message: messages.releaseOASTurorialTitle },
  [SCAN_WRITTEN_AS_TUTORIAL_KEY]: {
    message: messages.downloadAppFirstTimeTitle,
    style: { textAlign: 'center', width: '70%' },
  },
  [SCAN_WRITTEN_GENERIC_AS_TUTORIAL_KEY]: {
    message: messages.scanWrittenGenericASTitle,
    style: { textAlign: 'center' },
  },
  [STUDENT_INSTRUCTIONS_TUTORIAL_KEY]: { message: messages.studentInstructionsTutorialTitle },
  [STUDENTS_MUST_FILL_CIRCLES_TUTORIAL_KEY]: { message: messages.studentsMustFillCirclesTutorialTitle },
  [VIEW_RESULTS_TUTORIAL_KEY]: { message: messages.viewResultsInstructionsTutorialTitle },
  [TEACHER_RESULTS_TUTORIAL_KEY]: { message: messages.viewResultsInstructionsTutorialTeacherTitle },
};

export { TUTORIAL_MODAL_TITLES };
