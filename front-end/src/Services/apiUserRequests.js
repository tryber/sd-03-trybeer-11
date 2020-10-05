import axios from 'axios';
import { catchRequestErr, NO_CONNECTIO } from './catchRequest';

export const getUser = async () => {
  const token = localStorage.getItem('token');

  return axios.get('http://localhost:3001/user/', { headers: { Authorization: token } })
    .then((res = {}) => res.data || Promise.reject(NO_CONNECTIO))
    .catch(catchRequestErr);
};

export const changeName = async (name) => {
  const token = localStorage.getItem('token');

  return axios.put('http://localhost:3001/user/profile', { name }, { headers: { Authorization: token } })
    .then((res = {}) => res.data || Promise.reject(NO_CONNECTIO))
    .catch(catchRequestErr);
};
