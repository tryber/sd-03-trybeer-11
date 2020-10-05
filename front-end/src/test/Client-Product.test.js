import { fireEvent, screen, waitForDomChange, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import Routers from 'react-router-dom';
import App from '../App';
import mocks from './mocks';
import renderWithRouter from './renderWithRouter';

const getMock = jest.spyOn(axios, 'get').mockImplementation(mocks.axios.get);
jest.spyOn(Routers, 'BrowserRouter').mockImplementation(mocks.BrowserRouter);

describe('if no token user should to go to /login', () => {
  test('should go to login if no log', () => {
    const { history } = renderWithRouter(<App />, '/products');

    expect(history.location.pathname).toBe('/login');
  });
});

describe('Name of the group', () => {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwibmFtZSI6InRlc3R1c2VyIiwiZW1haW'
    + 'wiOiJ1c2VyQHRlc3QuY29tIiwicm9sZSI6ImNsaWVudCIsImlhdCI6MTYwMTkxNDMxOCwiZXhwIjoxNjAyMDAwNzE4'
    + 'fQ.CZldkMAO_vcvmBp8JO0FXYCXXo1qK9XPDkJs4-8Nwhg';

  beforeEach(() => {
    getMock.mockClear();
    getMock.mockImplementation(mocks.axios.get);
    localStorage.clear();
    localStorage.setItem('token', token);
  });

  afterEach(cleanup);

  test('have all elements', async () => {
    const { history } = renderWithRouter(<App />, '/products');

    expect(history.location.pathname).toBe('/products');

    const title = screen.getByRole('banner');

    expect(title).toHaveTextContent(/Trybeer/i);

    expect(getMock).toHaveBeenCalledTimes(1);
    expect(getMock).toHaveBeenCalledWith(
      'http://localhost:3001/products',
      { headers: { Authorization: token } },
    );

    await waitForDomChange();

    for (let i = 0; i < 10; i += 1) {
      screen.getByTestId(`${i}-product-img`);
      screen.getByTestId(`${i}-product-name`);
      screen.getByTestId(`${i}-product-plus`);
      screen.getByTestId(`${i}-product-minus`);
    }

    screen.getByTestId('checkout-bottom-btn-value');
    screen.getByTestId('checkout-bottom-btn');
  });

  test('buttons funcionality', async () => {
    const { history } = renderWithRouter(<App />, '/products');

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
