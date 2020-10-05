import axios from 'axios';
import { catchRequestErr, NO_CONNECTIO } from './catchRequest';

const URL_BASE = 'http://localhost:3001';

const makeHeaders = () => {
  const token = localStorage.getItem('token');
  return { authorization: token };
};

const takeSales = async () => {
  const headers = makeHeaders();
  return axios.get(`${URL_BASE}/sales`, { headers })
    .then(({ data }) => (data ? data.sales : Promise.reject(NO_CONNECTIO)))
    .catch(catchRequestErr);
};

export default takeSales;
