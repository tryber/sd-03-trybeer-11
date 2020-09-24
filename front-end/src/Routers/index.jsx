import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import PrivateRoute from './Components';
import { Login, Register, ClientProduct } from '../Pages/index';

const Routers = () => {
  return (
    <Router>
      {window.location.pathname === '/' && <Redirect to="/login" />}
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <PrivateRoute path="/products" component={ClientProduct} />
      </Switch>
    </Router>
  );
};

export default Routers;
