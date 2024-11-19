import _ from 'lodash';
import { List, Map } from 'immutable';
import {
  ANSWER_BODY,
  FIB_ANSWER_BODY,
  FIB_ANSWER_MARKS,
  INIT_VALUES,
  MC_ANSWER_BODY,
  MC_ANSWER_MARKS,
  MF_ANSWER_BODY,
  MF_ANSWER_MARKS,
  NUMERIC_ANSWER_MARKS,
  SETTING,
} from './constants';

const fibAnswerFormat = List([Map({ body: FIB_ANSWER_BODY, marks: FIB_ANSWER_MARKS })]);
const mcAnswerFormat = List([Map({ body: MC_ANSWER_BODY, marks: MC_ANSWER_MARKS })]);
const mfAnswerFormat = List([Map({ body: MF_ANSWER_BODY, marks: MF_ANSWER_MARKS })]);
const numericAnswerFormat = List([
  Map({ body: ANSWER_BODY, marks: NUMERIC_ANSWER_MARKS, scientific_notation: 3, tolerance: 0 }),
]);

const formatAnswers = (data, kind, setting) => {
  if (kind === 'numeric') {
    return {
      answers: Map({
        fib: fibAnswerFormat,
        mc: mcAnswerFormat,
        mf: mfAnswerFormat,
        numeric: getAnswers(data, kind, setting),
      }),
    };
  }
  if (kind === 'fib') {
    return {
      answers: Map({
        fib: getAnswers(data, kind, setting),
        mc: mcAnswerFormat,
        mf: mfAnswerFormat,
        numeric: numericAnswerFormat,
      }),
    };
  }
  if (kind === 'mf') {
    return {
      answers: Map({
        fib: fibAnswerFormat,
        mc: mcAnswerFormat,
        mf: getAnswers(data, kind, setting),
        numeric: numericAnswerFormat,
      }),
    };
  }
  return {
    answers: Map({
      fib: fibAnswerFormat,
      mc: getAnswers(data, kind, setting),
      mf: mfAnswerFormat,
      numeric: numericAnswerFormat,
    }),
  };
};

export const getAnswers = (data, kind, setting) => {
  const answers = [];

  data.map(answer => {
    let item = null;

    const actualHeight = _.has(answer.body, 'actual_height') ? answer.body.actual_height : 30;
    const marks = [];
    answer.marks.map(mark => {
      delete mark.id;
      delete mark.answer_id;

      marks.push(Map(mark));
      return mark;
    });
    if (kind === 'numeric' && _.size(marks) < 3) {
      const absentSettings = ['unit', 'significant_figure'].filter(settingItem => !setting.includes(settingItem));
      absentSettings.forEach(settingItem => {
        marks.push(Map({ kind: settingItem, value: 0.25 }));
      });
    }

    if (kind === 'mf' && _.size(marks) < 2) {
      const absentSettings = ['unit'].filter(settingItem => !setting.includes(settingItem));
      absentSettings.forEach(settingItem => {
        marks.push(Map({ kind: settingItem, value: 0.25 }));
      });
    }

    if (kind === 'numeric') {
      const {
        answer: ans,
        value,
        height,
        width,
        evaluation_displayed: evaluationDisplayed,
        fraction_mode: fractionMode,
        valid,
      } = answer.body;

      item = Map({
        body: Map({
          actual_height: actualHeight,
          answer: ans,
          value,
          height,
          width,
          evaluation_displayed: evaluationDisplayed,
          fraction_mode: fractionMode,
          valid,
        }),
        marks: List(marks),
        scientific_notation: answer.scientific_notation,
        significant_figure: answer.significant_figure,
        tolerance: answer.tolerance,
        unit: answer.unit,
      });
    } else if (kind === 'mf') {
      const {
        answer: ans,
        value,
        height,
        width,
        evaluation_displayed: evaluationDisplayed,
        fraction_mode: fractionMode,
        valid,
      } = answer.body;
      item = Map({
        body: Map({
          actual_height: actualHeight,
          answer: ans,
          value,
          height,
          width,
          evaluation_displayed: evaluationDisplayed,
          fraction_mode: fractionMode,
          valid,
        }),
        marks: List(marks),
        unit: answer.unit,
      });
    } else if (kind === 'fib') {
      const { value, height, width } = answer.body;
      item = Map({
        body: Map({ actual_height: actualHeight, value, height, width }),
        marks: List(marks),
      });
    } else {
      const { value, height, width } = answer.body;
      item = Map({ body: Map({ actual_height: actualHeight, value, height, width }), marks: List(marks) });
    }
    answers.push(item);
    return answer;
  });
  return List(answers);
};

export const getSetting = (setting, kind) => {
  if (kind === 'numeric') {
    return Map({
      fib: List([]),
      mc: List([]),
      mf: List([]),
      numeric: List(setting),
    });
  }
  if (kind === 'fib') {
    return Map({
      fib: List(setting),
      mc: List([]),
      mf: List([]),
      numeric: List([]),
    });
  }
  if (kind === 'mf') {
    return Map({
      fib: List([]),
      mc: List([]),
      mf: List(setting),
      numeric: List([]),
    });
  }
  return SETTING;
};

export const getInitValuesAssessmentForm = ownProps => {
  let initialValues = {};

  if (_.has(ownProps, 'assessment') && _.isPlainObject(ownProps.assessment)) {
    const assessmentItems = [];
    const heights = {};

    ownProps.assessment.assessment_items.map((item, i) => {
      const { kind, setting, answers, number } = item;
      const data = formatAnswers(answers, kind, setting);
      const assessmentItem = {
        answers: data.answers,
        number,
        kind,
        setting: getSetting(setting, kind),
      };

      const actualHeight = _.has(answers[0].body, 'actual_height') ? answers[0].body.actual_height : 30;
      heights[i] = actualHeight;

      assessmentItems.push(assessmentItem);
      return item;
    });
    initialValues = INIT_VALUES({ assessmentItems, heights, name: ownProps.assessment.name });
  } else {
    const name = _.has(ownProps, 'assessmentDetails') ? ownProps.assessmentDetails.get('name') : null;
    const count = ownProps.group && _.has(ownProps.group, 'assessments_count') ? ownProps.group.assessments_count : 0;

    initialValues = INIT_VALUES({ count, name });
  }
  return initialValues;
};

const getAnswerBody = (kind, data) => {
  if (kind === 'fib') {
    return data.answer || '';
  }
  if (['mf', 'numeric'].includes(kind)) {
    const answer = data && data.answer ? data.answer : '';
    const unit = data && data.unit ? data.unit : '';
    return Map({ answer, unit });
  }
  return formatMCAnswer(data);
};

const formatMCAnswer = data => {
  if (data && _.isArray(data.answer)) {
    const options = ['A', 'B', 'C', 'D', 'E'];
    return data.answer
      .map((element, index) => (element === 1 ? options[index] : element))
      .filter(element => !_.isNumber(element));
  }
  return [];
};

export const getInitValueOnlineAssessmentForm = ownProps => {
  const assessmentItems = [];
  const heights = {};
  if (_.has(ownProps, 'assessment') && ownProps.assessment.assessment_items) {
    ownProps.assessment.assessment_items.map((item, i) => {
      const studentAnswer = ownProps.assessment.student_answers ? ownProps.assessment.student_answers[i] : null;

      const { kind, setting } = item;
      const body = getAnswerBody(kind, studentAnswer ? studentAnswer.body : null);

      const assessmentItem = Map({
        body,
        is_flag_checked: studentAnswer ? studentAnswer.is_flag_checked : false,
        kind,
        setting,
      });
      heights[i] = 30;

      assessmentItems.push(assessmentItem);
      return item;
    });
    return { assessment_items: assessmentItems, heights };
  }
};
