import React from 'react';
import PlusMinus from './PlusMinus';

const ProductCard = (props) => {
  const { id, name, price, photo, index } = props;

  return (
    <div>
      <section>
        <span data-testid={`${index}-product-price`}>{price}</span>
        <img data-testid={`${index}-product-img`} url={photo} alt="Cerveja" />
        <h4 data-testid={`${index}-product-name`}>{name}</h4>
        <PlusMinus index={index} id={id} />
      </section>
    </div>
  )
}

export default ProductCard;
