import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import PrivateRoute from './Components';
import { Login, Register, ClientProduct } from '../Pages/index';

const Routers = () => {
  return (
    <Router>
      <Switch>
        <PrivateRoute exact path="/" />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <PrivateRoute path="/products" component={ClientProduct} />
      </Switch>
    </Router>
  );
};

export default Routers;
