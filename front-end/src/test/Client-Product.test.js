import {
  fireEvent, screen, waitForDomChange,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import Routers from 'react-router-dom';
import App from '../App';
import mocks from './mocks';
import renderWithRouter from './renderWithRouter';

const getMock = jest.spyOn(axios, 'get').mockImplementation(mocks.axios.get);
jest.spyOn(Routers, 'BrowserRouter').mockImplementation(mocks.BrowserRouter);

const { token } = mocks;

describe('if no token user should to go to /login', () => {
  test('should go to login if no log', () => {
    const { history } = renderWithRouter(<App />, '/products');

    expect(history.location.pathname).toBe('/login');
  });
});

describe('/products', () => {
  beforeEach(() => {
    getMock.mockImplementation(mocks.axios.get);
    localStorage.setItem('token', token);
  });

  afterEach(() => {
    getMock.mockClear();
    localStorage.clear();
  });

  test('have all elements', async () => {
    const { history } = renderWithRouter(<App />, '/products');

    expect(history.location.pathname).toBe('/products');

    await waitForDomChange();

    const title = screen.getByRole('banner');

    expect(title).toHaveTextContent(/Trybeer/i);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith(
      'http://localhost:3001/products',
      { headers: { Authorization: token } },
    );

    screen.getByTestId('0-product-img');
    screen.getByTestId('0-product-name');
    screen.getByTestId('0-product-plus');
    screen.getByTestId('0-product-minus');

    screen.getByTestId('checkout-bottom-btn-value');
    screen.getByTestId('checkout-bottom-btn');
  });

  test('buttons funcionality', async () => {
    renderWithRouter(<App />, '/products');

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith(
      'http://localhost:3001/products',
      { headers: { Authorization: token } },
    );

    const firstPlusBtn = screen.getByTestId('0-product-plus');
    const firstMinusBtn = screen.getByTestId('0-product-minus');

    userEvent.click(firstPlusBtn);

    const valueSpan = screen.getByTestId('checkout-bottom-btn-value');

    expect(valueSpan).toHaveTextContent(mocks.products[0].price);

    userEvent.click(firstMinusBtn);

    expect(valueSpan).toHaveTextContent('0.00');

    const secondPlusBtn = screen.getByTestId('1-product-plus');
    fireEvent.click(firstPlusBtn);
    fireEvent.click(secondPlusBtn);

    expect(valueSpan).toHaveTextContent('9.7');
  });

  test('should go to /checkout', () => {
    const { history } = renderWithRouter(<App />, '/products');

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith(
      'http://localhost:3001/products',
      { headers: { Authorization: token } },
    );

    const firstPlusBtn = screen.getByTestId('0-product-plus');

    userEvent.click(firstPlusBtn);

    const checkoutBtn = screen.getByTestId('checkout-bottom-btn');

    userEvent.click(checkoutBtn);

    expect(history.location.pathname).toBe('/checkout');
  });
});
