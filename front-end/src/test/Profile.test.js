import { fireEvent, screen, waitForDomChange, cleanup } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import Routers from 'react-router-dom';
import App from '../App';
import mocks from './mocks';
import renderWithRouter from './renderWithRouter';

const { token } = mocks;
const getMock = jest.spyOn(axios, 'get').mockImplementation(mocks.axios.get);
jest.spyOn(Routers, 'BrowserRouter').mockImplementation(mocks.BrowserRouter);

describe('/profile', () => {
  beforeEach(() => {
    localStorage.setItem('token', token);
  });

  afterEach(() => {
    getMock.mockClear();
    localStorage.clear();
  });

  test('should go to login if no log', () => {
    localStorage.clear();
    const { history } = renderWithRouter(<App />, '/profile');

    expect(history.location.pathname).toBe('/login');
  });

  test('make an get user and have all base elements', async () => {
    const { history } = renderWithRouter(<App />, '/profile');

    await waitForDomChange();

    expect(getMock).toHaveBeenCalledWith(
      'http://localhost:3001/user/',
      { headers: { Authorization: token } },
    );

    const title = screen.getByRole('banner');
    expect(title).toHaveTextContent(/Meu Perfil/i);

    screen.getByRole('textbox', { name: 'name' });
    screen.getByRole('button');
  });
});
