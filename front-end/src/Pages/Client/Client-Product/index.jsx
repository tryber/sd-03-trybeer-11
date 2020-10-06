import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getApiData } from '../../../Redux/action/apiProductsAction';
import ProductCard from './innerPage/ProductCard';
import convertBRL from '../../../Services/BRLFunction';
import { shoppingListAction } from '../../../Redux/action/shoppingListAction';
import { TopMenu } from '../../../Components';
import './styles.css';

const ClientProduct = () => {
  const { data: products, error: requestError } = useSelector(state => state.apiProductsReducer);
  const shoppingList = useSelector(state => state.shoppingListReducer.data);
  const successfulMessage = useSelector(state => state.shoppingListReducer.message);
  const dispatch = useDispatch();

  const totalPrice = shoppingList.reduce((acc, { price, sellingQnt }) => acc + price * sellingQnt, 0);

  const totalPriceBRL = convertBRL(totalPrice);

  useEffect(() => {
    dispatch(getApiData());
    const shoppingListLocalStorage = JSON.parse(localStorage.getItem('sellingProducts'));
    if (shoppingListLocalStorage) dispatch(shoppingListAction(shoppingListLocalStorage));
  }, []);

  if (requestError === 'No connection') return <h1>Sem conexão com o servidor</h1>;
  if (requestError) return <Redirect to="/login" />;

  return (
    <>
      <TopMenu />
      <div className="general-container all">
        <div>{successfulMessage !== '' ? successfulMessage : null}</div>
        <div className="cards-button">
          <div className="cards-container">
            {products.map(({ id, name, price, urlImage }, index) => (
              <ProductCard key={id} id={id} photo={urlImage} name={name} price={price} index={index} />
            ))}
          </div>
          <Link to="/checkout">
            <button
              type="button"
              className="checkout-button"
              disabled={totalPrice === 0}
              data-testid="checkout-bottom-btn"
            >
              Ver Carrinho
            </button>
          </Link>
        </div>
        <span data-testid="checkout-bottom-btn-value">{`Total: ${totalPriceBRL}`}</span>
      </div>
    </>
  );
}


export default ClientProduct;
