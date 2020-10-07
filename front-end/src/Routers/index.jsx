import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

import PrivateRoute from './Components';

import {
  Login,
  Profile,
  Register,
  ClientProduct,
  AdminOrders,
  AdminDetails,
  MySales,
  CheckoutPage
} from '../Pages/index';

const Routers = () => (
  <Router>
    <Switch>
      <Route path="/register" component={Register} />
      <Route path="/login" component={Login} />
      <Route path="/profile">
        <PrivateRoute component={Profile} />
      </Route>
      <Route path="/checkout">
        <PrivateRoute component={CheckoutPage} />
      </Route>
      <Route path="/products">
        <PrivateRoute component={ClientProduct} />
      </Route>
      <Route path="/admin/profile">
        <PrivateRoute component={Profile} />
      </Route>
      <Route exact path="/admin/orders">
        <PrivateRoute component={AdminOrders} />
      </Route>
      <Route path="/admin/orders/:id">
        <PrivateRoute component={AdminDetails} />
      </Route>
      <Route exact path="/orders">
        <PrivateRoute component={MySales} />
      </Route>
      <Route path="/orders/:id">
          <PrivateRoute component={AdminDetails} />
      </Route>
      <Route path="*" render={() => <Redirect to="/login" />} />
    </Switch>
  </Router>
);

export default Routers;
