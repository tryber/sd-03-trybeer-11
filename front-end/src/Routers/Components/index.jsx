import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({ component: Component, redPath = '/login', restrict = false, ...rest }) => {
  const token = localStorage.getItem('token');
  const user = JSON.parse(localStorage.getItem('user')) || {};

  const block = user.role !== 'administrator' && restrict;

  return (
    <Route  {...rest} render={(props) =>
      !token || block ? <Redirect to={token ? redPath : '/login'} /> : <Component {...props} />
    } />
  );
};

export default PrivateRoute;
