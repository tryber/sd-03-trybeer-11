import React from 'react';
import { render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import store from '../Redux/store';
import { Provider } from 'react-redux';

const putRedux = (ui) => <Provider store={store}>{ui}</Provider>;

const renderWithRouter = (
  ui,
  route = '/',
) => {
  const initialEntries = [route]
  const history = createMemoryHistory({ initialEntries });

  return {
    ...render(<Router history={history}>{putRedux(ui)}</Router>),
    history,
  };
};

export default renderWithRouter;
