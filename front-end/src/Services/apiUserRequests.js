import axios from 'axios';

const mockToken = async () => {
  return axios.post('http://localhost:3001/user/login', { email: 'tryber@trybe.com.br', password: '123456' })
    .then(({ data }) => localStorage.setItem('user', JSON.stringify({ token: data.token })))
    .catch((err) => console.log('err', err));
};

export const getUser = async () => {
  await mockToken();
  const { token } = JSON.parse(localStorage.getItem('user')) || {};
  if (!token) return Promise.reject({ error: 'Não possível pegar dados' });

  return axios.get('http://localhost:3001/user/', { headers: { Authorization: token } })
    .then(({ data }) => data)
    .catch((err) => {
      const { response } = err;
      return response.data;
    });
};

export const changeName = async (name) => {
  const { token } = JSON.parse(localStorage.getItem('user')) || {};

  return axios.put('http://localhost:3001/user/profile', { name }, { headers: { Authorization: token } })
    .then(({ data }) => data)
    .catch((err) => {
      const { response: { data } = {} } = err;
      const { message } = data || {};
      return Promise.reject(message);
    });
};
