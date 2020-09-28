import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { TopMenu } from '../Components/index';
import PrivateRoute from './Components';
import { Login, Profile, Register, ClientProduct } from '../Pages/index';
import './styles.css';

const Routers = () => {
  return (
    <Router>
      {window.location.pathname === '/' && <Redirect to="/login" />}
      <Switch>
        <React.Fragment>
          <TopMenu />
          <div className="all-routes">
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/profile" component={Profile} />
            <Route path="/products">
              <PrivateRoute component={ClientProduct} />
            </Route>
            <Route path="/admin/profile">
              <PrivateRoute component={Profile} />
            </Route>
          </div>
        </React.Fragment>
      </Switch>
    </Router>
  );
};

export default Routers;
