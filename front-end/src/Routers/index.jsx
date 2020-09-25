import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { TopMenu } from '../Components';
import { Login, Profile } from '../Pages/index'; 
import PrivateRoute from './Components';
import { Login, Register, ClientProduct } from '../Pages/index';

const Routers = () => {
  return (
    <Router>
      {window.location.pathname === '/' && <Redirect to="/login" />}
      <Switch>
        <TopMenu />
        <Route path="/login" component={Login} />
        <Route path="/profile" component={Profile} />
        <Route path="/login" component={ Login } />
        <Route path="/register" component={ Register } />
        <PrivateRoute path="/products" component={ClientProduct} />
      </Switch>
    </Router>
  );
};

export default Routers;
