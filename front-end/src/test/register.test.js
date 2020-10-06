import { fireEvent, screen, waitForDomChange } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import axios from 'axios';
import React from 'react';
import Routers from 'react-router-dom';
import App from '../App';
import mocks from './mocks';
import renderWithRouter from './renderWithRouter';

let mockPost = jest.spyOn(axios, 'post').mockImplementation(mocks.axios.post);
jest.spyOn(axios, 'get').mockImplementation(mocks.axios.get);
// mocking axios used's functions

jest.spyOn(Routers, 'BrowserRouter').mockImplementation(mocks.BrowserRouter);
// line to mock BrowserRouter in we render this in the test
// and useing renderWithRouter to substitute

describe('/register', () => {
  test('should have all main elements with correct roles', () => {
    afterEach(() => mockPost.mockRestore());

    const { history } = renderWithRouter(<App />, '/register');

    expect(history.location.pathname).toBe('/register');

    const magicNumber = 2;

    const inputs = screen.getAllByRole('textbox');
    expect(inputs.length).toBe(magicNumber);

    const emailInput = screen.getByLabelText(/Email/i);
    const nameInput = screen.getByLabelText(/Nome/i);

    expect(emailInput).toBeInTheDocument();
    expect(nameInput).toBeInTheDocument();

    expect(inputs).toContain(emailInput);
    expect(inputs).toContain(nameInput);

    const checkboxs = screen.getAllByRole('checkbox');
    const adminCheckbox = screen.getByLabelText(/Quero vender/i);
    expect(adminCheckbox).toBeInTheDocument();

    expect(checkboxs).toContain(adminCheckbox);

    const passwordInput = screen.getByLabelText(/Password/i);
    expect(passwordInput).toBeInTheDocument();

    const btn = screen.getByRole('button');

    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();

    expect(form).toContainElement(emailInput);
    expect(form).toContainElement(nameInput);
    expect(form).toContainElement(passwordInput);
    expect(form).toContainElement(adminCheckbox);
    expect(form).toContainElement(btn);
  });

  test('should be possible register an client and go to /products', async () => {
    const { history } = renderWithRouter(<App />, '/register');

    const emailInput = screen.getByLabelText(/Email/i);
    const nameInput = screen.getByLabelText(/N[a, o]me/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const submitButton = screen.getByRole('button');

    expect(submitButton).toBeDisabled();

    const email = 'client@test.com';
    const name = 'Nome Qualquer';
    const password = 'test123';

    userEvent.type(emailInput, email);

    userEvent.type(nameInput, name);

    userEvent.type(passwordInput, password);

    expect(submitButton).toBeEnabled();

    fireEvent.submit(submitButton, {
      target: {
        email: { value: email },
        password: { value: password },
        nome: { value: name },
        role: { checked: false },
      },
    });

    await waitForDomChange();

    expect(history.location.pathname).toBe('/products');

    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(mockPost).toHaveBeenCalledWith('http://localhost:3001/user', {
      email,
      password,
      name,
      role: false,
    });
  });

  test('should be possible register an administrator and go to /admin/orders', async () => {
    mockPost = jest.spyOn(axios, 'post').mockImplementation(mocks.axios.postAdmin);
    const { history } = renderWithRouter(<App />, '/register');

    const emailInput = screen.getByLabelText(/Email/i);
    const nameInput = screen.getByLabelText(/N[a, o]me/i);
    const passwordInput = screen.getByLabelText(/Password/i);
    const adminCheckbox = screen.getByLabelText(/Quero vender/i);
    const submitButton = screen.getByRole('button');
    const form = screen.getByRole('form');

    expect(submitButton).toBeDisabled();

    const email = 'client@test.com';
    const name = 'Nome Qualquer';
    const password = 'test123';

    userEvent.type(emailInput, email);

    userEvent.type(nameInput, name);

    userEvent.type(passwordInput, password);

    userEvent.click(adminCheckbox);

    expect(form).toHaveFormValues({
      email, password, nome: name, role: true,
    });

    expect(submitButton).toBeEnabled();

    fireEvent.submit(submitButton, {
      target: {
        email: { value: email },
        password: { value: password },
        nome: { value: name },
        role: { checked: true },
      },
    });

    await waitForDomChange();

    expect(history.location.pathname).toBe('/admin/orders');

    expect(mockPost).toHaveBeenCalledTimes(1);
    expect(mockPost).toHaveBeenCalledWith('http://localhost:3001/user', {
      email, password, name, role: true,
    });
  });
});
