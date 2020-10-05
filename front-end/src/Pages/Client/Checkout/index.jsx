import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';
import { shoppingListAction, successfulMessageAction } from '../../../Redux/action/shoppingListAction';
import CheckoutProductCard from './innerPage/CheckoutProductCard';
import CheckoutFrom from './innerPage/CheckoutForm';
import convertBRL from '../../../Services/BRLFunction';
import { TopMenu } from '../../../Components/index';
import './styles.css';

const CheckoutPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [totalPrice, setTotalPrice] = useState(0);
  const [finishMessage, setFinishMessage] = useState('');
  const [street, setStreet] = useState('');
  const [number, setNumber] = useState('');
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
      .then(() => {
        localStorage.removeItem('sellingProducts');
        dispatch(successfulMessageAction());
        dispatch(shoppingListAction([]));
        history.push('/products');
      })
      .catch(({ response = {} }) => {
        const { data: { message: msn } = {} } = response;
        setFinishMessage(msn || 'Algo deu errado, verifique sua conexao');
      });
  };

  const onChangeStreet = (event) => setStreet(event.target.value);

  const onChangeNumber = (event) => setNumber(event.target.value);

  const disableButton = () => {
    if (street !== '' && number !== '' && reduxStoreProducts.length > 0) return false;
    return true;
  }

  return (
    <div>
      <TopMenu />
      <div className="checkout-general-container all">
        <div className="checkout-content">
          <span>{reduxStoreProducts.length === 0 ? 'Não há produtos no carrinho' : null}</span>
          {reduxStoreProducts.map(({ id, name, price, sellingQnt }, index) =>
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
          <div className="address-checkout-container">
            <div className="address-checkout-content">
              <h3>Endereço</h3>
              <CheckoutFrom
                submitPurchase={submitPurchase}
                onChangeStreet={onChangeStreet}
                onChangeNumber={onChangeNumber}
                disableButton={disableButton}
              />
            </div>
          </div>
          <span>{finishMessage}</span>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
