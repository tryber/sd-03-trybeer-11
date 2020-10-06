import React from 'react';
import axios from 'axios';
import { cleanup, waitForDomChange } from '@testing-library/react';
import mocks from './mocks';
import saleOneMock from './mocks/saleOneMock';
import renderWithRouter from './renderWithRouter';
import { ListDetails, Details } from '../Components/index';
import AdminDetails from '../Pages/Admin/Admin-details/index';

const getSaleId = jest.spyOn(axios, 'get').mockImplementation(mocks.axios.get);

const { token } = mocks;

describe('testing Details and Details List Components', () => {
  beforeEach(() => {
    localStorage.setItem('token', token);
  });

  afterEach(() => {
    cleanup();
    getSaleId.mockClear();
  });

  it('testing Details List Component', () => {
    const { getByTestId } = renderWithRouter(<ListDetails info={ saleOneMock } />, '/sales/1');

    const productQnt = getByTestId('0-product-qtd');
    const productName = getByTestId('0-product-name');
    const productUnitPrice = getByTestId('0-order-unit-price');
    const productTotalValue = getByTestId('0-product-total-value');

    const magicNumberEsLint = 2;

    expect(productQnt).toBeInTheDocument();
    expect(productQnt).toHaveTextContent(magicNumberEsLint);

    expect(productName).toBeInTheDocument();
    expect(productName).toHaveTextContent('Skol Lata 250ml');

    expect(productUnitPrice).toBeInTheDocument();
    expect(productUnitPrice).toHaveTextContent('(R$ 2.20)');

    expect(productTotalValue).toBeInTheDocument();
    expect(productTotalValue).toHaveTextContent('R$ 4.40');
  });

  it('testing Details Component with Admin', () => {
    localStorage.setItem('role', 'administrator');
    const { getByTestId } = renderWithRouter(<Details
      info={ saleOneMock }
      id={ saleOneMock.id }
      total={ saleOneMock.totalPrice }
      numeroPedido={ saleOneMock.id }
      status={ saleOneMock.status }
      data={ saleOneMock.date }
    />, '/admin/orders/1');

    const deliveredBtn = getByTestId('mark-as-delivered-btn');
    const statusPedido = getByTestId('order-status');
    const totalValue = getByTestId('order-total-value');

    expect(deliveredBtn).toBeInTheDocument();
    expect(statusPedido).toBeInTheDocument();
    expect(totalValue).toBeInTheDocument();

    expect(statusPedido).toHaveTextContent('Pendente');
    expect(totalValue).toHaveTextContent('R$ 4.40');
  });

  it('Testing Admin-Details api request', async () => {
    renderWithRouter(<AdminDetails />, '/admin/orders/1', '/admin/orders/:id');
    await waitForDomChange();
  });
});
