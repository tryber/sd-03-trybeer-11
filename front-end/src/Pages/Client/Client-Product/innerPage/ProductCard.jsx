import React, { useState } from 'react';
import PlusMinus from './PlusMinus';
import img from './imgTest.jpg'
import convertBRL from '../../../../Services/BRLFunction';

const ProductCard = (props) => {
  const [sellingQuantity, setSellingQuantity] = useState(0);

  const { id, name, price, photo, index } = props;

  const brlPrice = convertBRL(price);

  return (
    <div className="products-card">
      <section className="products-global">
        <div className="card-img">
          <img className="image-photo" data-testid={`${index}-product-img`} src={img} alt="Cerveja" />
        </div>
        <div>
          <div className="products-content">
            <h4 data-testid={`${index}-product-name`}>{name}</h4>
          </div>
          <div className="price-count">
            <span data-testid={`${index}-product-price`}>{brlPrice}</span>
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
