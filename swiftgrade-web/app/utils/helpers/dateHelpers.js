import { DATE_FORMAT, DATE_TIME_FORMAT_RESULTS, TIME_FORMAT } from 'globalConstants';
import moment from 'moment/moment';

export const getFormattedDate = dateString => {
  const momentDate = moment(dateString);

  if (momentDate.isValid()) {
    return momentDate.format(DATE_FORMAT);
  }

  return '';
};

export const getFormattedDateTime = dateString => {
  const momentDate = moment(dateString);

  if (momentDate.isValid()) {
    return { date: momentDate.format(DATE_FORMAT), time: momentDate.format(TIME_FORMAT) };
  }

  return '';
};

export const getFormattedDateTimeResults = dateString => {
  const momentDate = moment(dateString);
  if (momentDate.isValid()) {
    return momentDate.format(DATE_TIME_FORMAT_RESULTS);
  }

  return '';
};
