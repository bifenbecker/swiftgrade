import React from 'react';
import PropTypes from 'prop-types';
import { Route, Redirect } from 'react-router-dom';

const SIGN_IN_ROUTE = '/sign_in/';
const BASE_ROUTES = {
  student: '/student/',
  teacher: '/teacher/',
  admin: '/teacher/',
};

const UserDashboardRoute = ({ component: Component, ...rest }) => {
  const token = localStorage.getItem('auth_token');
  const role = localStorage.getItem('role');
  const isNew = localStorage.getItem('isNew');
  if (!token) {
    return <Route {...rest} render={() => <Redirect to={SIGN_IN_ROUTE} />} />;
  }
  if (token && isNew) {
    localStorage.removeItem('isNew');
    return <Route {...rest} render={() => <Redirect to="/teacher/new/" />} />;
  }
  if (token && role in BASE_ROUTES) {
    return <Route {...rest} render={() => <Redirect to={BASE_ROUTES[role]} />} />;
  }
  return <Route {...rest} render={props => <Component {...props} />} />;
};

UserDashboardRoute.propTypes = {
  component: PropTypes.func,
};

export default UserDashboardRoute;
