export const handleError = error => {
  switch (error.status) {
    case 401:
      localStorage.clear();
      window.location.replace('/sign_in');
      break;
    case 403:
      window.location.replace('/denied');
      break;
    case 404:
      window.location.replace('/not_found');
      break;
    case 500:
      window.location.replace('/internal_error');
      break;
    default:
      return error;
  }
  return error;
};
