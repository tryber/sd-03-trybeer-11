import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PlusMinus from './PlusMinus';

const ProductCard = ({ id, name, price, photo, index }) => {
  const [sellingQuantity, setSellingQuantity] = useState(0);
  const shoppingList = useSelector(state => state.shoppingListReducer.data);

  useEffect(() => {
    const { sellingQnt } = shoppingList.find((product) => product.id === id) || {};
    if (sellingQnt) setSellingQuantity(sellingQnt);
  }, [])

  return (
    <div className="products-card">
      <section className="products-global">
        <div className="card-img">
          <img className="image-photo" data-testid={`${index}-product-img`} src={photo} alt="Cerveja" />
        </div>
        <div>
          <div className="products-content">
            <h4 data-testid={`${index}-product-name`}>{name}</h4>
          </div>
          <div className="price-count">
            <PlusMinus
              id={id}
              name={name}
              price={price}
              photo={photo}
              index={index}
              sellingQuantity={sellingQuantity}
              setSellingQuantity={setSellingQuantity}
            />
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProductCard;
