import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';

import { Login, Register, ClientProduct } from '../Pages/index';

const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/Register" component={ Register } />
        <Route path="/products" component={ClientProduct} />
      </Switch>
    </Router>
  );
};

export default Routers;
