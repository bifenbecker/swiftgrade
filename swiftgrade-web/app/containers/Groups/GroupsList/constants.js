import React from 'react';
import { FormattedMessage } from 'react-intl';
import { POPUP_CHECKLIST_CREATE_CLASS, POPUP_CHECKLIST_DASHBOARD, POPUP_CHECKLIST_GET_AS } from 'globalConstants';
import { GroupsRenameForm, GroupsCopyForm, GroupsCreateForm, CodeForm, VerifyEmailForm } from 'components/Forms';
import GroupsDelete from './GroupsDelete';
import messages from './messages';

export const CHECKLIST_DATA = {
  [POPUP_CHECKLIST_DASHBOARD]: {
    bodyTitle: <FormattedMessage {...messages.checklistDashboardBodyTitle} />,
    footerButtonTitle: <FormattedMessage {...messages.checklistDashboardFooterButtonTitle} />,
    footerTitle: <FormattedMessage {...messages.checklistDashboardFooterTitle} />,
    headerTitle: <FormattedMessage {...messages.checklistDashboardTitle} />,
  },
  [POPUP_CHECKLIST_CREATE_CLASS]: {
    bodyTitle: null,
    footerButtonTitle: <FormattedMessage {...messages.createClassFooterButtonTitle} />,
    footerTitle: <FormattedMessage {...messages.createClassFooterTitle} />,
    headerTitle: <FormattedMessage {...messages.createClassTitle} />,
  },
  [POPUP_CHECKLIST_GET_AS]: {
    bodyTitle: null,
    footerButtonTitle: <FormattedMessage {...messages.printASFooterButtonTitle} />,
    footerTitle: <FormattedMessage {...messages.printASFooterTitle} />,
    headerTitle: <FormattedMessage {...messages.printASTitle} />,
  },
};

export const FORMS = {
  player: {
    form: GroupsCreateForm,
    name: 'GroupsCreateForm',
    title: <FormattedMessage {...messages.playerClass} />,
  },
  create: {
    form: GroupsCreateForm,
    name: 'GroupsCreateForm',
    title: <FormattedMessage {...messages.createClasses} />,
  },
  join: {
    form: CodeForm,
    name: 'CodeForm',
    title: <FormattedMessage {...messages.enterClassCode} />,
  },
  rename: {
    form: GroupsRenameForm,
    name: 'GroupsRenameForm',
    title: <FormattedMessage {...messages.renameClass} />,
  },
  copy: {
    form: GroupsCopyForm,
    name: 'GroupsCopyForm',
    title: <FormattedMessage {...messages.copyClass} />,
  },
  delete: {
    form: GroupsDelete,
    name: 'GroupsDelete',
    title: <FormattedMessage {...messages.deleteClass} />,
  },
  verify: {
    form: VerifyEmailForm,
    name: 'VerifyEmailForm',
    title: <FormattedMessage {...messages.verifyEmail} />,
  },
};

export const GENERIC_ANSWER_SHEET_STATUS = {
  ready_for_generation: 'ready_for_generation',
  ready_for_download: 'ready_for_download',
  generating: 'generating',
};

export const HOW_TO_USE_MODAL_DATA = [
  {
    message: messages.questionFirst,
    path: 'https://help.goswiftgrade.com/help-topics/key-idea-topics/how-does-swiftgrade-work',
  },
  {
    message: messages.questionSecond,
    path: 'https://help.goswiftgrade.com/help-topics/key-idea-topics/differences-between-android',
  },
  {
    message: messages.questionThird,
    path: 'https://help.goswiftgrade.com/help-topics/key-idea-topics/do-i-need-to-upload',
  },
  {
    message: messages.questionFourth,
    path: 'https://help.goswiftgrade.com/help-topics/answer-sheet-topics/differences-multiple-choice',
  },
  {
    message: messages.questionFifth,
    path: 'https://help.goswiftgrade.com/help-topics/answer-sheet-topics/pre-input-student-name',
  },
];

export const VIDYARD_UUID_DASHBOARD = '5hUnb3NbwC8m2oyooHYcox';
export const MAX_CLASS_NAME_LENGTH = 50;
