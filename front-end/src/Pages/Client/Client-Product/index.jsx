import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getApiData } from '../../../Redux/action/apiProductsAction';
import ProductCard from './innerPage/ProductCard';
import './styles.css';

const ClientProduct = () => {
  const products = useSelector(state => state.apiProductsReducer.data);
  const shoppingList = useSelector(state => state.shoppingListReducer.data);
  const dispatch = useDispatch();
  
  const totalPrice = shoppingList.reduce((acc, { price, sellingQnt }) => acc + price * sellingQnt, 0);

  const totalPriceBRL = totalPrice.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}); 
  // https://pt.stackoverflow.com/questions/181922/formatar-moeda-brasileira-em-javascript/186798

  const goCart = () => {
    localStorage.setItem('sellingProducts', JSON.stringify(shoppingList));
  };

  useEffect(() => {
    dispatch(getApiData());
  }, []);

  return (
    <div className="general-container">
      <div>
        <div className="cards-container">
          {products.map(({ id, name, price, urlImage }, index) => (
            <ProductCard key={id} id={id} photo={urlImage} name={name} price={price} index={index} />
          ))}
        </div>
        <Link to="/checkout">
          <button
            className="checkout-button"
            onClick={goCart}
            data-testid="checkout-bottom-btn"
          >
            Ver Carrinho
          </button>
        </Link>
      </div>
      <span data-testid="checkout-bottom-btn-value">{`Total: ${totalPriceBRL}`}</span>
    </div>
  )
}


export default ClientProduct
