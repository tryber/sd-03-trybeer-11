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

describe('/register', () => {
  test('should ', () => {
    renderWithRouter(<App />);


  });
});
