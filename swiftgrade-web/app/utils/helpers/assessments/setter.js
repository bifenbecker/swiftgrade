import _ from 'lodash';
import { List } from 'immutable';
import { ANSWER_BODY_BY_KIND, MF_ANSWER_MARKS, NUMERIC_ANSWER_MARKS, SETTING } from './constants';
import { calculationSigFig } from './calculation';

const getDefaultValues = (assessmentItems, index, kind) => {
  let item = null;

  _.reverse(_.slice(assessmentItems, 0, index)).map(i => {
    if (!_.isNull(item)) {
      return true;
    }
    if (i.kind === kind) {
      item = i;
    }
    return i;
  });
  return item;
};

const getIndexMarkByKey = (item, key) => item.findIndex(i => i.get('kind') === key);
const getMarkByKey = (item, key) => item.find(i => i.get('kind') === key).get('value');
const getSum = data => data.reduce((s, x) => s + x.get('value'), 0);
const getMarksForRegularRow = (prevKindMark, mathOrNumericMarks) =>
  mathOrNumericMarks.update(0, j => (j.get('kind') === 'answer' ? j.set('value', prevKindMark) : j));

const getAnswers = (kind, prevKind, answers, setting, defaultValue = null, isAddRow = true) => {
  const answersByKey = answers.get(kind).update(0, i => {
    const answersMarks = getMarks(kind, prevKind, answers, setting, defaultValue, isAddRow);
    const body = ANSWER_BODY_BY_KIND[kind];

    const updatedAnswer = i.set('body', body).set('marks', answersMarks);
    if (!isAddRow && !_.isNull(defaultValue)) {
      if (kind === 'numeric') {
        const { scientific_notation: sn, unit, tolerance } = defaultValue.answers[kind][0];
        return updatedAnswer
          .set('scientific_notation', sn)
          .set('tolerance', tolerance)
          .set('unit', unit);
      }
      if (kind === 'mf') {
        return updatedAnswer.set('unit', defaultValue.answers[kind][0].unit);
      }
      if (kind === 'fib') {
        return updatedAnswer;
      }
    }
    return updatedAnswer.set('significant_figure', null);
  });
  return answers.set(kind, List([answersByKey.get(0)]));
};

const getAnswersAfterToggleChanges = (answers, kind, key, isNew) => {
  const answersByKind = answers.get(kind).map(i => {
    const marks = getMarksAfterToggleChanges(i.get('marks'), kind, key, isNew);

    if (isNew && key === 'significant_figure') {
      const body = i.get('body');
      const value = calculationSigFig(body.get('value'));
      return i.set(key, value).set('marks', marks);
    }
    if (isNew && key === 'scientific_notation' && i.get(key) === null) {
      return i.set(key, 3).set('marks', marks);
    }
    if (key !== 'scientific_notation' && key !== 'autocorrection') {
      return i.set(key, null).set('marks', marks);
    }
    return i.set('marks', marks);
  });
  return answers.set(kind, answersByKind);
};

const getMarksAfterToggleChanges = (marks, kind, key, isNew) => {
  if (['scientific_notation', 'autocorrection'].includes(key)) {
    return marks;
  }

  if (isNew) {
    const answerMarks = marks.map(j => {
      const answerKind = j.get('kind');
      const value = j.get('value');

      if (answerKind === 'answer') {
        return j.set('value', value >= 0.5 ? value - 0.25 : 0.25);
      }
      if (answerKind === key) {
        return j.set('value', 0.25);
      }
      return j;
    });
    return answerMarks;
  }

  const keyMark = getMarkByKey(marks, key);
  const answerMarks = marks.update(getIndexMarkByKey(marks, 'answer'), j => {
    const value = j.get('value');
    return j.set('value', value + keyMark > 10 ? 10 : value + keyMark);
  });
  return answerMarks;
};

const getMathNumericMarksAfterKindChanges = (kind, lastMaxMark, marks, setting) => {
  const answerIndex = getIndexMarkByKey(marks, 'answer');
  const unitIndex = getIndexMarkByKey(marks, 'unit');

  let answerMark = lastMaxMark;
  let newMarks = marks;
  if (setting.get(kind).includes('unit')) {
    answerMark -= 0.25;
    newMarks = marks.update(unitIndex, j => j.set('value', 0.25));
  }
  if (setting.get(kind).includes('significant_figure')) {
    const sfIndex = getIndexMarkByKey(marks, 'significant_figure');
    answerMark -= 0.25;
    newMarks = newMarks.update(sfIndex, j => j.set('value', 0.25));
  }
  newMarks = newMarks.update(answerIndex, j => j.set('value', answerMark));
  return newMarks;
};

const getKindMarks = (answers, kind) =>
  (answers &&
    answers
      .get(kind)
      .get(0)
      .get('marks')) ||
  [];

const getMarks = (kind, prevKind, answers, setting, defaultValue = null, isAddRow = true) => {
  const fibMarks = getKindMarks(answers, 'fib');
  const mcMarks = getKindMarks(answers, 'mc');
  const mfMarks = getKindMarks(answers, 'mf');
  const numericMarks = getKindMarks(answers, 'numeric');

  const isMathNumericPrevKind = ['mf', 'numeric'].includes(prevKind);
  const prevNonNumericMark = !isMathNumericPrevKind ? getSum(getKindMarks(answers, prevKind)) : null;
  const prevMathMarks = prevKind === 'numeric' ? numericMarks : mfMarks;
  const prevMathNumericMark = isMathNumericPrevKind
    ? getSum(prevMathMarks.filter(i => i.get('kind') === 'answer' || setting.get(prevKind).includes(i.get('kind'))))
    : null;

  if (kind === 'mc') {
    return mcMarks.update(0, j =>
      !isMathNumericPrevKind
        ? j.set('value', prevNonNumericMark)
        : j.set('value', prevMathNumericMark > 10 ? 10 : prevMathNumericMark),
    );
  }
  if (kind === 'fib') {
    return fibMarks.update(0, j =>
      !isMathNumericPrevKind
        ? j.set('value', prevNonNumericMark)
        : j.set('value', prevMathNumericMark > 10 ? 10 : prevMathNumericMark),
    );
  }

  const currentKindMarks = kind === 'numeric' ? numericMarks : mfMarks;
  const prevKindMark = isMathNumericPrevKind ? prevMathNumericMark : prevNonNumericMark;
  if (!isAddRow) {
    if (_.isNull(defaultValue)) {
      return getMarksForRegularRow(prevKindMark, currentKindMarks);
    }
    let defaultValueMarksSum = 0;
    defaultValue.answers[kind][0].marks.forEach(item => {
      if (item.kind === 'answer' || setting.get(kind).includes(item.kind)) {
        defaultValueMarksSum += item.value;
      }
    });
    if (defaultValueMarksSum === prevKindMark) {
      let newMarks = currentKindMarks;
      defaultValue.answers[kind][0].marks.forEach(item => {
        newMarks = newMarks.update(getIndexMarkByKey(currentKindMarks, item.kind), j => j.set('value', item.value));
      });

      return newMarks;
    }
  }

  const currentMathNumericMark = getSum(
    currentKindMarks.filter(i => i.get('kind') === 'answer' || setting.get(kind).includes(i.get('kind'))),
  );
  if (prevKindMark > currentMathNumericMark) {
    const newMathNumericMarks = getMathNumericMarksAfterKindChanges(kind, prevKindMark, currentKindMarks, setting);
    return newMathNumericMarks;
  }

  if (prevKindMark < currentMathNumericMark) {
    if (prevKindMark <= 1) {
      let answerMark = prevKindMark;
      const sfMark = setting.get(kind).includes('significant_figure') ? 0.25 : 0;
      const unitMark = setting.get(kind).includes('unit') ? 0.25 : 0;

      if (answerMark - sfMark - unitMark <= 0) {
        answerMark = 1 - sfMark - unitMark;
        const mathKindMarks = kind === 'numeric' ? NUMERIC_ANSWER_MARKS : MF_ANSWER_MARKS;
        return mathKindMarks.update(getIndexMarkByKey(mathKindMarks, 'answer'), j => j.set('value', answerMark));
      }
    }

    const newMathNumericMarks = getMathNumericMarksAfterKindChanges(kind, prevKindMark, currentKindMarks, setting);
    return newMathNumericMarks;
  }
  if (kind === 'fib') {
    return fibMarks;
  }
  if (kind === 'mf') {
    return mfMarks;
  }
  return kind === 'numeric' ? numericMarks : mcMarks;
};

export const setAnswerAfterKindChanges = (kind, prevKind, props) => {
  const { assessmentItems, index: assessmentIndex, changeFormValue } = props;
  if (_.isNumber(assessmentIndex) && assessmentItems) {
    let defaultValue = null;

    if (['fib', 'mc', 'mf', 'numeric'].includes(kind)) {
      defaultValue = getDefaultValues(assessmentItems.toJS(), assessmentIndex, kind);
    }

    const items = assessmentItems.update(assessmentIndex, i => {
      let setting = i.get('setting');
      setting = !_.isNull(defaultValue)
        ? setting.set(kind, List(defaultValue.setting[kind]))
        : setting.set(kind, SETTING.get(kind));

      const itemAnswers = getAnswers(kind, prevKind, i.get('answers'), setting, defaultValue, false);
      return i.set('answers', itemAnswers).set('setting', setting);
    });
    changeFormValue('assessment_items', items);
  } else {
    const { answers, setting } = props;
    const answersItems = getAnswers(kind, prevKind, answers, setting);
    changeFormValue('answers', answersItems);
  }
};

export const setAnswerAndMarksAfterSettingChanges = (key, kind, isNew, props) => {
  const { answers, assessmentItems, index: assessmentIndex, changeFormValue } = props;

  if (_.isNumber(assessmentIndex) && assessmentItems) {
    const items = assessmentItems.update(assessmentIndex, i => {
      const itemAnswers = getAnswersAfterToggleChanges(i.get('answers'), kind, key, isNew);
      return i.set('answers', itemAnswers);
    });
    changeFormValue('assessment_items', items);
  } else {
    const answersItems = getAnswersAfterToggleChanges(answers, kind, key, isNew);
    changeFormValue('answers', answersItems);
  }
};
