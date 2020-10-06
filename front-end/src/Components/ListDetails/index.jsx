import React from 'react';
import './styles.css';
import convertBRL from '../../Services/BRLFunction';

const ListDetails = ({ info: { products } }) => {
  return (
    <div className="container-list">
      {
        products.map((product, index) => {
          return (<div className="products-info" key={product.id}>
            <div className="span">
              <span data-testid={`${index}-product-qtd`}>{product.quantity}</span>
              <span> - </span>
              <span data-testid={`${index}-product-name`}>{product.name}</span>
              <h3 data-testid={`${index}-order-unit-price`}>({convertBRL(product.price)})</h3>
            </div>
              <span data-testid={`${index}-product-total-value`}>{convertBRL(product.price * product.quantity)}</span>
          </div>)
        })
      }
    </div>
  )
}

export default ListDetails;
