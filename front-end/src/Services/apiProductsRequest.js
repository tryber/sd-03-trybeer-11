import axios from 'axios';
const URL = 'http://localhost:3001/products';

const apiProductsRequest = () => fetch(URL).then((response) => (
  response.json()
    .then((prodData) => Promise.resolve(prodData))
    .catch(({ response }) => {
      if (!response) return Promise.reject('No connection');
      Promise.reject(response.data.message);
    })
));

export default apiProductsRequest;
