import React, { useState } from 'react';
import axios from 'axios';

const CheckoutPage = () => {
  const [totalPrice, setTotalPrice] = useState(10);
  const products = JSON.parse(localStorage.getItem('sellingProducts'));
  const token = localStorage.getItem('token');
  console.log(products);

  const submitPurchase = (event) => {
    event.preventDefault();

    return axios.post('http://localhost:3001/sales',
      {
        userId: 1,
        totalPrice,
        deliveryAddress: event.target.deliveryAddress.value,
        deliveryNumber: event.target.deliveryNumber.value,
        saleDate: Date.now(),
        products: [{ id: 1, sellingQnt: 3 }],
      })
    .then((response) => console.log(response))
    .catch((error) => console.log(error))
  }

  return (
    <form onSubmit={(event) => submitPurchase(event)}>
      <label htmlFor="address">
        Rua:
        <input type="text" id="address" name="deliveryAddress"></input>
      </label>
      <label htmlFor="address-number">
        Número da casa:
        <input type="text" id="address-number" name="deliveryNumber"></input>
      </label>
      <button type="submit">Finalizar Compra</button>
    </form>
  );
};

export default CheckoutPage;
