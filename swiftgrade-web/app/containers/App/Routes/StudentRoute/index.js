import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const SIGN_IN_ROUTE = '/sign_in/';
const BASE_ROUTE = '/';

const StudentRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('auth_token');
  const role = localStorage.getItem('role');

  if (!token) {
    return <Route {...rest} render={() => <Redirect to={SIGN_IN_ROUTE} />} />;
  }
  if (token && role !== 'student') {
    return <Route {...rest} render={() => <Redirect to={BASE_ROUTE} />} />;
  }
  return <Route {...rest} render={props => <Component {...props} />} />;
};

StudentRoute.propTypes = {
  component: PropTypes.func,
};

export default StudentRoute;
