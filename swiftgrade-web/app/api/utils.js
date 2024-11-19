import axios from 'axios';
import { convertDataToFormData, makeQueryParams } from 'utils/helpers/urlHelpers';
import { handleError } from './handleError';

export const axiosInstance = (needAuth = false, isBlob = false, isCacheControl = false) => {
  const { API_URL } = process.env;

  const authToken = needAuth ? localStorage.getItem('auth_token') : null;
  const tempAuthToken = needAuth ? localStorage.getItem('temp_auth_token') : null;
  const params = {
    baseURL: `${API_URL}`,
    timeout: 180000,
    headers: {
      Authorization: `${authToken || tempAuthToken}`,
    },
  };
  if (isBlob) {
    params.responseType = 'blob';
  }
  if (isCacheControl) {
    params.headers['Cache-Control'] = 'no-cache';
  }
  return axios.create(params);
};

export const get = (path, needAuth = false, params = null, isCacheControl = false) => {
  const instance = axiosInstance(needAuth, false, isCacheControl);

  if (params) {
    params = makeQueryParams(params);
    path = `${path}?${params}`;
  }

  return new Promise((resolve, reject) => {
    instance
      .get(path)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error.response));
      });
  });
};

export const getBlob = (path, needAuth = false, params = null) => {
  const instance = axiosInstance(needAuth, true);

  if (params) {
    params = makeQueryParams(params);
    path = `${path}?${params}`;
  }

  return new Promise((resolve, reject) => {
    instance
      .get(path)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error.response));
      });
  });
};

export const post = (path, needAuth = false, data, isBlob = false) => {
  const instance = axiosInstance(needAuth, isBlob);
  return new Promise((resolve, reject) => {
    instance
      .post(path, data)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error.response));
      });
  });
};

export const postFormData = (path, needAuth = false, data) => {
  const instance = axiosInstance(needAuth, false);
  const formData = convertDataToFormData(data);

  return new Promise((resolve, reject) => {
    instance
      .post(path, formData)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error.response));
      });
  });
};

export const put = (path, needAuth = false, data = null) => {
  const instance = axiosInstance(needAuth);

  return new Promise((resolve, reject) => {
    instance
      .put(path, data)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error.response));
      });
  });
};

export const patch = (path, needAuth = false, data = null) => {
  const instance = axiosInstance(needAuth);

  return new Promise((resolve, reject) => {
    instance
      .patch(path, data)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error.response));
      });
  });
};

export const putFormData = (path, needAuth = false, data) => {
  const instance = axiosInstance(needAuth);
  const formData = convertDataToFormData(data);

  return new Promise((resolve, reject) => {
    instance
      .put(path, formData)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error.response));
      });
  });
};

export const patchFormData = (path, needAuth = false, data) => {
  const instance = axiosInstance(needAuth);
  const formData = convertDataToFormData(data);

  return new Promise((resolve, reject) => {
    instance
      .patch(path, formData)
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error.response));
      });
  });
};

export const del = (path, needAuth = false, data = null) => {
  const instance = axiosInstance(needAuth);
  return new Promise((resolve, reject) => {
    instance
      .request({ method: 'delete', url: path, data })
      .then(response => {
        resolve(response);
      })
      .catch(error => {
        reject(handleError(error.response));
      });
  });
};
