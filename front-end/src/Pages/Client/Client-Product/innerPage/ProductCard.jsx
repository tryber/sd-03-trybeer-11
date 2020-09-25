import React, { useState } from 'react';
import PlusMinus from './PlusMinus';

const ProductCard = (props) => {
  const [sellingQuantity, setSellingQuantity] = useState(0);

  const { id, name, price, photo, index } = props;

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
