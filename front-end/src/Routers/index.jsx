import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import { Login } from '../Pages/index';
import { TopMenu } from '../Components';

const Routers = () => {
  return (
    <Router>
      <Switch>
        <TopMenu />
        <Route path="/login" component={Login} />
      </Switch>
    </Router>
  );
};

export default Routers;