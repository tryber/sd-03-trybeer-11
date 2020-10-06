import React from 'react';
import axios from 'axios';
import { fireEvent, waitForDomChange, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import mocks from './mocks';
import MySales from '../Pages/MySales/index';

const mockGetSales = jest.spyOn(axios, 'get').mockImplementation(mocks.axios.get);

describe('Testing /orders', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmNzc1NTliYzEzNTU2NGIwMThjOGEyYiIsImZpcnN0TmFtZSI6IkphZmV0IEhlbnJpcXVlIiwibGFzdE5hbWUiOiJHdWVycmEgRmFndW5kZXMiLCJlbWFpbCI6ImphZmV0QGphZmV0LmNvbS5iciIsImJpcnRoRGF0ZSI6IjAyLzA3LzE5OTQifSwiaWF0IjoxNjAxNjc0MDk5LCJleHAiOjE2MDE2Nzc2OTl9.C_EyhF2mwVpH5Q8BJuU2Gkp4IIwGylI2G4MsVvlN39k');
  });

  beforeEach(() => {
    cleanup();
    mockGetSales.mockClear();
  });

  it('testing if elements exists', async () => {
    const { getByTestId } = renderWithRouter(<MySales />, '/orders');
    await waitForDomChange();

    const saleContainer = getByTestId('0-order-card-container');
    expect(saleContainer).toBeInTheDocument();

    const orderNumber = getByTestId('0-order-number');
    expect(orderNumber).toHaveTextContent('Pedido 1');

    const orderDate = getByTestId('0-order-date');
    expect(orderDate).toHaveTextContent('05/10');

    const orderTotalValue = getByTestId('0-order-total-value');
    expect(orderTotalValue).toHaveTextContent('26.9');
  });

  it('testing if redirect to orders details', async () => {
    const { getByTestId, history } = renderWithRouter(<MySales />, '/orders');
    await waitForDomChange();

    const order = getByTestId('0-order-number');
    fireEvent.click(order);

    expect(history.location.pathname).toBe('/orders/1');
  });
});
