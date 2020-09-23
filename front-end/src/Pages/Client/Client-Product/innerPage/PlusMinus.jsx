import React, { useState, useEffect } from 'react';


const PlusMinus = ({ sellingQuantity, index, setSellingQuantity, setOperator }) => {

  const changeQuantity = (action) => {
    setOperator(action);
    setSellingQuantity(eval(`${sellingQuantity} ${action} ${1}`));
  }
  
  return (
    <div>
      <button onClick={() => changeQuantity('-')} data-testid={`${index}-product-minus`}>-</button>
      <button onClick={() => changeQuantity('+')} data-testid={`${index}-product-plus`}>+</button>
    </div>
  );
}

export default PlusMinus;
