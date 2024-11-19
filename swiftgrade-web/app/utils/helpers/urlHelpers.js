import { stringify, parse } from 'qs';

export const makeQueryParams = params => stringify(params, { arrayFormat: 'repeat', encode: false });

export const parseQueryString = queryString => parse(queryString);

export const convertDataToFormData = data => {
  const formData = new FormData();

  if (data instanceof FormData) {
    return data;
  }

  Object.keys(data).forEach(key => {
    if (data[key] instanceof Blob) {
      formData.append(key, data[key], data[key].name);
    } else if (typeof data[key] === 'object') {
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);
    }
  });
  return formData;
};
