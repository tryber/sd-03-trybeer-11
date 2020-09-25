import axios from 'axios';
const URL = 'http://localhost:3001/products';

const apiProductsRequest = () => axios
  .get(URL, { headers: { Authorization: localStorage.getItem('token') }})
    .then(({ data }) => Promise.resolve(data))
    .catch(({ response }) => {
      if (!response) return Promise.reject('No connection');
      Promise.reject(response.data.message);
    });

export default apiProductsRequest;
