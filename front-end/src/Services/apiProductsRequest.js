import axios from 'axios';

const URL = 'http://localhost:3001/products';

const apiProductsRequest = () => axios
  .get(URL, { headers: { Authorization: localStorage.getItem('token') } })
  .then(({ data }) => Promise.resolve(data))
  .catch(({ response }) => {
    if (!response) return Promise.reject(new Error('No connection'));
    return Promise.reject(new Error(response.data.message));
  });

export default apiProductsRequest;
