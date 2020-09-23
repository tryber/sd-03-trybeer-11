import axios from 'axios';

const NO_CONNECTIO = 'Conexao com o servidor não encontrada';

export const getUser = async () => {
  const { token } = JSON.parse(localStorage.getItem('user')) || {};
  if (!token) return Promise.reject({ error: 'Não possível pegar dados' });

  return axios.get('http://localhost:3001/user/', { headers: { Authorization: token } })
    .then((res = {}) => res.data || Promise.reject(NO_CONNECTIO))
    .catch((err) => {
      const { data } = err.response || {};
      const { message = NO_CONNECTIO } = data || {};
      return Promise.reject(message);
    });
};

export const changeName = async (name) => {
  const { token } = JSON.parse(localStorage.getItem('user')) || {};

  return axios.put('http://localhost:3001/user/profile', { name }, { headers: { Authorization: token } })
    .then((res = {}) => res.data || Promise.reject(NO_CONNECTIO))
    .catch((err) => {
      const { data } = err.response || {};
      const { message = NO_CONNECTIO } = data || {};
      return Promise.reject(message);
    });
};
