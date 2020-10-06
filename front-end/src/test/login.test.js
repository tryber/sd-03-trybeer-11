import { fireEvent, screen, waitForDomChange } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import Routers from 'react-router-dom';
import App from '../App';
import mocks from './mocks';
import renderWithRouter from './renderWithRouter';

jest.spyOn(axios, 'post').mockImplementation(mocks.axios.post);
jest.spyOn(axios, 'get').mockImplementation(mocks.axios.get);
// mocking axios used's functions

jest.spyOn(Routers, 'BrowserRouter').mockImplementation(mocks.BrowserRouter);
// line to mock BrowserRouter in we render this in the test
// and useing renderWithRouter to substitute

describe('/login', () => {
  test('have all the object', async () => {
    renderWithRouter(<App />, '/login');

    screen.getByRole('textbox', { name: /email/i });
    screen.getByLabelText(/Password/i);
    screen.getByRole('button', { name: /ENTRAR/i });
    screen.getByRole('link', { name: /Registrar/i });
  });

  test('possible to go to /register', () => {
    const { history } = renderWithRouter(<App />, '/login');

    userEvent.click(screen.getByRole('link', { name: /Registrar/i }));

    expect(history.location.pathname).toBe('/register');
  });
  test('can submit and go to /products', async () => {
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByRole('button', { name: /ENTRAR/i });

    const email = 'user@test.com';
    const password = 'test123';

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    expect(emailInput).toHaveValue(email);
    expect(passwordInput).toHaveValue(password);

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    expect(button).toBeEnabled();

    fireEvent.submit(button, {
      target: {
        email: { value: emailValue },
        password: { value: passwordValue },
      },
    });

    await waitForDomChange();

    expect(history.location.pathname).toBe('/products');
  });

  test('can submit of an admin and go to /admin/orders', async () => {
    jest.spyOn(axios, 'post').mockImplementation(mocks.axios.postAdmin);
    const { history } = renderWithRouter(<App />);

    const emailInput = screen.getByRole('textbox');
    const passwordInput = screen.getByLabelText(/Password/i);
    const button = screen.getByRole('button', { name: /ENTRAR/i });

    const email = 'user@test.com';
    const password = 'test123';

    userEvent.type(emailInput, email);
    userEvent.type(passwordInput, password);

    expect(emailInput).toHaveValue(email);
    expect(passwordInput).toHaveValue(password);

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    expect(button).toBeEnabled();

    fireEvent.submit(button, {
      target: {
        email: { value: emailValue },
        password: { value: passwordValue },
      },
    });

    await waitForDomChange();

    expect(history.location.pathname).toBe('/admin/orders');
  });
});
