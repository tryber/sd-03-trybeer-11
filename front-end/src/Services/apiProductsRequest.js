const URL = 'http://localhost:3001/products';

const apiProductsRequest = () => fetch(URL).then((response) => (
  response.json()
    .then((prodData) => (response.ok ? Promise.resolve(prodData) : Promise.reject(prodData)))
));

export default apiProductsRequest;
