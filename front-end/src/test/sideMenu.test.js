import React from 'react';
import axios from 'axios';
import { fireEvent, waitForDomChange, cleanup } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import mocks from './mocks';
import MySales from '../Pages/MySales/index';

const mockGetSales = jest.spyOn(axios, 'get').mockImplementation(mocks.axios.get);

describe('testing Side Menu bar', () => {
  beforeEach(() => {
    localStorage.clear();
    localStorage.setItem('token', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjVmNzc1NTliYzEzNTU2NGIwMThjOGEyYiIsImZpcnN0TmFtZSI6IkphZmV0IEhlbnJpcXVlIiwibGFzdE5hbWUiOiJHdWVycmEgRmFndW5kZXMiLCJlbWFpbCI6ImphZmV0QGphZmV0LmNvbS5iciIsImJpcnRoRGF0ZSI6IjAyLzA3LzE5OTQifSwiaWF0IjoxNjAxNjc0MDk5LCJleHAiOjE2MDE2Nzc2OTl9.C_EyhF2mwVpH5Q8BJuU2Gkp4IIwGylI2G4MsVvlN39k');
  });

  beforeEach(() => {
    cleanup();
    mockGetSales.mockClear();
  });

  it('testing side menu logout functionality', async () => {
    const { getByTestId, history } = renderWithRouter(<MySales />, '/orders');
    await waitForDomChange();

    const menuHamburguer = getByTestId('top-hamburguer');

    fireEvent.click(menuHamburguer);

    const logoutButton = getByTestId('side-menu-item-logout');
    const token = localStorage.getItem('token');

    expect(typeof token).toBe('string');

    fireEvent.click(logoutButton);
    const tokenAfter = localStorage.getItem('token');

    expect(tokenAfter).toBe(null);
    expect(history.location.pathname).toBe('/login');
  });

  it('testing side menu open/close functionality', async () => {
    const { getByTestId } = renderWithRouter(<MySales />, '/orders');
    await waitForDomChange();

    const menuHamburguer = getByTestId('top-hamburguer');
    fireEvent.click(menuHamburguer);

    const productsLink = getByTestId('side-menu-item-products');
    const ordersLink = getByTestId('side-menu-item-my-orders');
    const profileLink = getByTestId('side-menu-item-my-profile');

    expect(productsLink).toBeInTheDocument();
    expect(ordersLink).toBeInTheDocument();
    expect(profileLink).toBeInTheDocument();

    fireEvent.click(menuHamburguer);

    expect(productsLink).not.toBeInTheDocument();
    expect(ordersLink).not.toBeInTheDocument();
    expect(profileLink).not.toBeInTheDocument();

    fireEvent.click(menuHamburguer);
  });

  it('testing side menu admin buttons', async () => {
    localStorage.setItem('role', 'administrator');
    const { getByTestId, history } = renderWithRouter(<MySales />, '/admin/orders');
    await waitForDomChange();

    const profileLink = getByTestId('side-menu-item-profile');
    const ordersLink = getByTestId('side-menu-item-orders');

    expect(ordersLink).toBeInTheDocument();
    expect(profileLink).toBeInTheDocument();

    fireEvent.click(profileLink);
    expect(history.location.pathname).toBe('/admin/profile');

    renderWithRouter(<MySales />, '/admin/orders');
    await waitForDomChange();

    fireEvent.click(ordersLink);
    expect(history.location.pathname).toBe('/admin/orders');
  });
});
