import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Login, ClientProduct } from '../Pages/index';

const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/products" component={ClientProduct} />
      </Switch>
    </Router>
  )
};

export default Routers;