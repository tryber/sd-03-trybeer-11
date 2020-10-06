import { fireEvent, screen, waitForDomChange } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import Routers from 'react-router-dom';
import App from '../App';
import mocks from './mocks';
import renderWithRouter from './renderWithRouter';

const { token } = mocks;
const getMock = jest.spyOn(axios, 'get').mockImplementation(mocks.axios.get);
const putMock = jest.spyOn(axios, 'put').mockImplementation(mocks.axios.put);
jest.spyOn(Routers, 'BrowserRouter').mockImplementation(mocks.BrowserRouter);
describe('/profile', () => {
  beforeEach(() => {
    localStorage.setItem('token', token);
  });
  afterEach(() => {
    getMock.mockClear();
    putMock.mockClear();
    localStorage.clear();
  });
  test('should go to login if no log', () => {
    localStorage.clear();
    const { history } = renderWithRouter(<App />, '/profile');
    expect(history.location.pathname).toBe('/login');
  });
  test('have all client base elements', async () => {
    renderWithRouter(<App />, '/profile');
    await waitForDomChange();
    expect(getMock).toHaveBeenCalledWith(
      'http://localhost:3001/user/',
      { headers: { Authorization: token } },
    );
    const title = screen.getByRole('banner');
    expect(title).toHaveTextContent(/Meu Perfil/i);
    screen.getByRole('textbox', { name: 'change name' });
    screen.getByRole('textbox', { name: 'read email' });
    screen.getByRole('form', { name: 'change name input' });
    screen.getByRole('button');
  });
  test('have all admin base elements', async () => {
    localStorage.setItem('role', 'administrator');
    renderWithRouter(<App />, '/profile');
    await waitForDomChange();
    expect(getMock).toHaveBeenCalledWith(
      'http://localhost:3001/user/',
      { headers: { Authorization: token } },
    );
    const title = screen.getByRole('banner');
    expect(title).toHaveTextContent(/Meu Perfil/i);
    const nameInput = screen.getByRole('textbox', { name: 'change name' });
    const emailInput = screen.getByRole('textbox', { name: 'read email' });
    screen.getByRole('form', { name: 'change name input' });
    screen.getByRole('button', { name: /Salvar/i });
    expect(nameInput).toHaveAttribute('readOnly');
    expect(emailInput).toHaveAttribute('readOnly');
  });
  test('should can make an request to change name of client', async () => {
    const { history } = renderWithRouter(<App />, '/profile');
    await waitForDomChange();
    const nameInput = screen.getByRole('textbox', { name: 'change name' });
    const emailInput = screen.getByRole('textbox', { name: 'read email' });
    expect(nameInput).not.toHaveAttribute('readOnly');
    expect(emailInput).toHaveAttribute('readOnly');
    const name = 'Outro Nome Qualquer';
    const email = 'alguma@coisa';
    userEvent.type(nameInput, name);
    userEvent.type(emailInput, email);
    expect(nameInput).toHaveValue(name);
    expect(emailInput).not.toHaveValue(email);
    const button = screen.getByRole('button', { name: 'Salvar' });
    fireEvent.click(button);
    await waitForDomChange();
    expect(history.location.pathname).toBe('/profile');
    screen.getByText('Atualização concluída com sucesso');
  });
});
