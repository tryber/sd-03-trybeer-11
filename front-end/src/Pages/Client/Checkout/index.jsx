import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { shoppingListAction, successfulMessageAction } from '../../../Redux/action/shoppingListAction';
import CheckoutProductCard from './innerPage/CheckoutProductCard';
// import convertBRL from '../../../Services/BRLFunction';

const CheckoutPage = () => {
  const history = useHistory();
  const [totalPrice, setTotalPrice] = useState(0);
  const [finishMessage, setFinishMessage] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
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
      dispatch(successfulMessageAction());
      dispatch(shoppingListAction([]));
      history.push('/products');
    })
    .catch(({ response }) => {
      setFinishMessage(response.data.message);
      console.log(response.data.message);
    })
  }

  const onChangeStreet = (event) => setStreet(event.target.value);

  const onChangeNumber = (event) => setNumber(event.target.value);

  const disableButton = () => {
    if (street !== '' && number !== '' && reduxStoreProducts.length > 0) return false;
    return true;
  }

  return (
    <div>
      <span>{reduxStoreProducts.length === 0 ? 'Não há produtos no carrinho': null}</span>
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
      <span data-testid="order-total-value">{`Total: R$ ${totalPrice.toFixed(2).replace('.', ',')}`}</span>
      <h3>Endereço</h3>
      <form onSubmit={(event) => submitPurchase(event)}>
        <label htmlFor="address">
          Rua:
          <input
            onChange={(event) => onChangeStreet(event)}
            data-testid="checkout-street-input"
            type="text"
            id="address"
            name="deliveryAddress"
          />
        </label>
        <label htmlFor="address-number">
          Número da casa:
          <input
            onChange={(event) => onChangeNumber(event)}
            data-testid="checkout-house-number-input"
            type="text"
            id="address-number"
            name="deliveryNumber"
          />
        </label>
        <button
          disabled={disableButton()}
          data-testid="checkout-finish-btn"
          type="submit"
        >
          Finalizar Compra
        </button>
      </form>
      <span>{finishMessage}</span>
    </div>
  );
};

export default CheckoutPage;
