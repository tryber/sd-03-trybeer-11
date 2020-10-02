import React from "react";
import axios from 'axios';
import Routers from 'react-router-dom';
import { fireEvent, waitForDomChange } from "@testing-library/react";
import renderWithRouter from "./renderWithRouter";
import mocks from './mocks';
import App from "../App";

const mockPost = jest.spyOn(axios, 'post').mockImplementation(mocks.axios.post);
const mockGEt = jest.spyOn(axios, 'get').mockImplementation(mocks.axios.get);

const mockBrowserRouter = jest.spyOn(Routers, 'BrowserRouter')
  .mockImplementation(mocks.BrowserRouter);

describe("/login", () => {
  test("have all the object", async () => {
    const { getByTestId, history } = renderWithRouter(<App />);

    // const nameInput = getByTestId('signup-name');
    const emailInput = getByTestId("email-input");
    const passwordInput = getByTestId("password-input");
    const button = getByTestId("signin-btn");

    fireEvent.change(emailInput, { target: { value: "user@test.com" } });
    fireEvent.change(passwordInput, { target: { value: "test123" } });

    const emailValue = emailInput.value;
    const passwordValue = passwordInput.value;

    fireEvent.submit(button, {
      target: {
        email: { value: emailValue },
        password: { value: passwordValue },
      },
    });

    await waitForDomChange();

    expect(history.location.pathname).toBe('/products');
  });
});
