import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { quantityAction } from '../../../../Redux/action/plusMinusActions';

const PlusMinus = ({ id, index }) => {
  const products = useSelector(state => state.apiProductsReducer.data);
  const [quantity, setQuantity] = useState(0);
  const dispatch = useDispatch();

  const product = products.find((product) => product.id === id); 

  const qntAlter = (action) => {
    setQuantity(eval(`${quantity} ${action} ${1}`))
    product.quantity = quantity;
    dispatch()
  }
  
  return (
    <div>
      <button onClick={() => qntAlter('-')}data-testid={`${index}-product-minus`}>-</button>
      <button onClick={() => qntAlter('+')} data-testid={`${index}-product-plus`}>+</button>
    </div>
  );
}

export default PlusMinus;
