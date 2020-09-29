import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { shoppingListAction } from '../../../Redux/action/shoppingListAction';
import CheckoutProductCard from './innerPage/CheckoutProductCard';
import convertBRL from '../../../Services/BRLFunction';

const CheckoutPage = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [finishMessage, setFinishMessage] = useState('');
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');

  const reduxStoreProducts = useSelector(state => state.shoppingListReducer.data);

  const removeItem = (id) => reduxStoreProducts.filter((product) => product.id !== id)

  const arrayToSum = (productArray) => {
    const total = productArray
      .reduce((acc, { sellingQnt, price }) => acc + sellingQnt * price, 0);
    setTotalPrice(total)
  }

  const updateLocalStorage = (id) => {
    const shoppingListArray = removeItem(id);
    localStorage.setItem('sellingProducts', JSON.stringify(shoppingListArray));
    dispatch(shoppingListAction(shoppingListArray));
    arrayToSum(shoppingListArray);
  }

  useEffect(() => {
    const shoppingListLocalStorage = JSON.parse(localStorage.getItem('sellingProducts'));
    if (shoppingListLocalStorage) {
      dispatch(shoppingListAction(shoppingListLocalStorage))
      arrayToSum(shoppingListLocalStorage)
    };
  }, [])

  const submitPurchase = (event) => {
    event.preventDefault();

    return axios.post('http://localhost:3001/sales',
      {
        totalPrice,
        deliveryAddress: event.target.deliveryAddress.value,
        deliveryNumber: event.target.deliveryNumber.value,
        products: reduxStoreProducts,
      },
      {
        headers: { authorization: token }
      }
    )
    .then((response) => {
      console.log(response);
      localStorage.removeItem('sellingProducts');
      setFinishMessage('Compra Realizada com sucesso');
    })
    .catch(({ response }) => {
      setFinishMessage(response.data.message);
      console.log(response.data.message);
    })
  }

  return (
    <div>
      {reduxStoreProducts.map(({id, name, price, sellingQnt}, index) =>
        <CheckoutProductCard
          index={index}
          key={id}
          id={id}
          name={name}
          price={price}
          sellingQnt={sellingQnt}
          updateLocalStorage={updateLocalStorage}
        />
      )}
      <span data-testid="order-total-value">{`Total: ${convertBRL(totalPrice)}`}</span>
      <h3>Endereço</h3>
      <form onSubmit={(event) => submitPurchase(event)}>
        <label htmlFor="address">
          Rua:
          <input
          data-testid="checkout-street-input" type="text" id="address" name="deliveryAddress" />
        </label>
        <label htmlFor="address-number">
          Número da casa:
          <input
            data-testid="checkout-house-number-input"
            type="text"
            id="address-number"
            name="deliveryNumber"
          />
        </label>
        <button data-testid="checkout-finish-btn" type="submit">Finalizar Compra</button>
      </form>
    </div>
  );
};

export default CheckoutPage;
