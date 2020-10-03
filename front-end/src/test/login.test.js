import React from "react";
import axios from 'axios';
import Routers from 'react-router-dom';
import { fireEvent} from "@testing-library/react";
import { render, waitFor, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import renderWithRouter from "./renderWithRouter";
import mocks from './mocks';
import App from "../App";

const mockPost = jest.spyOn(axios, 'post').mockImplementation(mocks.axios.post);
const mockGEt = jest.spyOn(axios, 'get').mockImplementation(mocks.axios.get);
// mocking axios used's functions

jest.spyOn(Routers, 'BrowserRouter').mockImplementation(mocks.BrowserRouter);
// line to mock BrowserRouter in we render this in the test
// and useing renderWithRouter to substitute

describe("/login", () => {
  test("have all the object", async () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    // const nameInput = getByTestId('signup-name');
    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");
    const button = getByTestId("signin-btn");

    userEvent.type(emailInput, { target: { value: "user@test.com" } });
    userEvent.type(passwordInput, { target: { value: "test123" } });

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    fireEvent.submit(button, {
      target: {
        email: { value: emailValue },
        password: { value: passwordValue },
      },
    });

    await waitFor(() => expect(history.location.pathname).toBe('/products'));
  });
});
