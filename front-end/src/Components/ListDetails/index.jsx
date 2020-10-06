import React from 'react';
import './styles.css';

const ListDetails = ({info}) => {

  return (
    <div className="container-list">
      {
        info.products.map((x, index) => {
          return (<div className="products-info" key={info.id}>
            <div className="span">
              <span data-testid={`${index}-product-qtd`}>{x.quantity}</span>
              <span> - </span>
              <span datata-testid={`${index}-product-name`}>{x.name}</span>
            </div>
            <h3 data-testid={`${index}-order-unit-price`}>{x.price}</h3>
          </div>)
        })
      }
    </div>
  )
}

export default ListDetails;
