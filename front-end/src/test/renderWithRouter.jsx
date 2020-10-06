import React from 'react';
import { Provider } from 'react-redux';
import { render } from '@testing-library/react';
import { Router, Route } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import store from '../Redux/store';

const putRedux = (ui) => <Provider store={ store }>{ui}</Provider>;

const renderWithRouter = (ui, route = '/', path) => {
  const initialEntries = [route];
  const history = createMemoryHistory({ initialEntries });

  return {
    ...render(<Router history={ history }><Route path={ path }>{putRedux(ui)}</Route></Router>),
    history,
  };
};

export default renderWithRouter;
