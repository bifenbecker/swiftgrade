from textdistance import levenshtein

import re


ACCURACY_FOR_AC = 0.75


class CompareFibAnswerService:
    def __init__(self, teacher_answer, student_answer):
        self.teacher_answer = self._prepare_answer(teacher_answer)
        self.student_answer = self._prepare_answer(student_answer)

    def call(self, setting = []):
        """
        sa_without_spaces: student answer without spaces
        ta_without_spaces: teacher answer without spaces
        """
        sa_without_spaces, ta_without_spaces = self._remove_all_spaces()
        if 'autocorrection' not in setting:
            return self.student_answer == self.teacher_answer or ta_without_spaces == sa_without_spaces, False
        return self._check_answer_with_ac(sa_without_spaces, ta_without_spaces)

    def _check_answer_with_ac(self, sa_without_spaces, ta_without_spaces):
        if sa_without_spaces == ta_without_spaces:
            return True, False

        if self._get_distance_words(sa_without_spaces, ta_without_spaces) <= 1:
            return True, True

        student_answer_words = self._get_answer_by_words(self.student_answer)
        teacher_answer_words = self._get_answer_by_words(self.teacher_answer)

        if not self._is_valid_multi_word_answer(student_answer_words, teacher_answer_words):
            return False, False

        if len(student_answer_words) == 1:
            return self._check_one_word_answer(student_answer_words, teacher_answer_words)
        return self._check_multi_word_answer(student_answer_words, teacher_answer_words, True)

    def _check_one_word_answer(self, student_answer_words, teacher_answer_words):
        s_word, t_word = student_answer_words[0], teacher_answer_words[0]
        if self._get_distance_words(s_word, t_word) <= 1:
            return True,True
        if self._get_similarity_words(s_word, t_word) >= ACCURACY_FOR_AC:
            return True, True
        else:
            return False, False

    def _check_multi_word_answer(self, student_answer_words, teacher_answer_words, is_ac_applied):
        if self._get_distance_words(self.student_answer, self.teacher_answer) <= 1:
            return True, is_ac_applied

        is_correct_answer = True
        for i in range(len(student_answer_words)):
            s_word, t_word = student_answer_words[i], teacher_answer_words[i]
            similarity = self._get_similarity_words(s_word, t_word)

            if similarity < ACCURACY_FOR_AC:
                is_correct_answer = False
                is_ac_applied = False
                break
        return is_correct_answer, is_ac_applied

    @staticmethod
    def _is_valid_multi_word_answer(student_answer_words, teacher_answer_words):
        return student_answer_words and teacher_answer_words and \
                len(student_answer_words) == len(teacher_answer_words)

    @staticmethod
    def _get_similarity_words(student_answer, teacher_answer):
        try:
            student_answer = student_answer.lower()
            teacher_answer = teacher_answer.lower()
            return levenshtein.normalized_similarity(student_answer, teacher_answer)
        except AttributeError:
            return 0

    @staticmethod
    def _get_distance_words(student_answer, teacher_answer):
        return levenshtein.distance(student_answer, teacher_answer)

    @staticmethod
    def _get_answer_by_words(answer):
        return answer.split() if answer else []

    @staticmethod
    def _prepare_answer(answer):
        if isinstance(answer, str):
            return re.sub(r'[^a-zA-Z0-9\s\']', '', answer).strip().lower()
        return ''

    def _remove_all_spaces(self):
        return re.sub(r'\s+', '', self.student_answer), re.sub(r'\s+', '', self.teacher_answer)
