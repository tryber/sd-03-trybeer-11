import axios from 'axios';

const NO_CONNECTIO = 'Conexao com o servidor não encontrada';

const catchErr = (err) => {
  const { data } = err.response || {};
  const { message = NO_CONNECTIO } = data || {};
  return Promise.reject(message);
};

export const getUser = async () => {
  const token = localStorage.getItem('token');

  return axios.get('http://localhost:3001/user/', { headers: { Authorization: token } })
    .then((res = {}) => res.data || Promise.reject(NO_CONNECTIO))
    .catch(catchErr);
};

export const changeName = async (name) => {
  const token = localStorage.getItem('token');

  return axios.put('http://localhost:3001/user/profile', { name }, { headers: { Authorization: token } })
    .then((res = {}) => res.data || Promise.reject(NO_CONNECTIO))
    .catch(catchErr);
};
