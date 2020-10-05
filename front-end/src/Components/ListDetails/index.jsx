import React from 'react';
import './styles.css';

const ListDetails = ({info}) => {

  return (
    <div className="container-list">
      {
        info.products.map((x) => {
          return (<div className="products-info" key={info.id}>
            <div className="span">
              <span data-testid={`${x.id}-product-qtd`}>{x.quantity}</span>
              <span> - </span>
              <span datata-testid={`${x.id}-product-name`}>{x.name}</span>
            </div>
            <h3 data-testid={`${x.id}-order-unit-price`}>{x.price}</h3>
          </div>)
        })
      }
    </div>
  )
}

export default ListDetails;
