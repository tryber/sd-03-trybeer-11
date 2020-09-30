import React from 'react';
import convertBRL from '../../../../Services/BRLFunction'
import { MdDelete } from 'react-icons/md';

const CheckoutProductCard = ({ index, id, name, price, sellingQnt, updateLocalStorage }) => {
  return (
    <div className="checkout-card">
      <span data-testid={`${index}-product-qtd-input`}>{sellingQnt}</span>
      <h4 data-testid={`${index}-product-name`}>{name}</h4>
      <span data-testid={`${index}-product-total-value`}>{convertBRL(price * sellingQnt)}</span>
      <span data-testid={`${index}-product-unit-price`}>{`(${convertBRL(price)} un)`}</span>
      <MdDelete
        className="trash-icon-delete"
        data-testid={`${index}-removal-button`}
        onClick={() => updateLocalStorage(id)}
      />
    </div>
  );
};

export default CheckoutProductCard;
