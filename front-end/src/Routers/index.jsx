import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { Login, Register } from '../Pages/index';

const Routers = () => {
  return (
    <Router>
      <Switch>
        <Route path="/login" component={ Login } />
        <Route path="/Register" component={ Register } />
      </Switch>
    </Router>
  );
};

export default Routers;
