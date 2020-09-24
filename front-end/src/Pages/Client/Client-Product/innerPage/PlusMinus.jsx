import React, { useState, useEffect } from 'react';
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from 'react-icons/ai';

const PlusMinus = ({ sellingQuantity, index, setSellingQuantity, setOperator, zeroQuantity }) => {
  const [disable, setDisable] = useState(false);

  const changeQuantity = (action) => {
    setOperator(action);
    setSellingQuantity(eval(`${sellingQuantity} ${action} ${1}`));
  }

  useEffect(() => {
    if (zeroQuantity <= 0) return setDisable(true);
    setDisable(false);
  }, [zeroQuantity])

  return (
    <div className="plus-minus-buttons">
      <AiOutlineMinusCircle
        className="plus-minus-icons"
        size="20"
        onClick={() => !disable && changeQuantity('-')}
        data-testid={`${index}-product-minus`}
      >
        -
      </AiOutlineMinusCircle>
      <span data-testid={`${index}-product-qtd`}>{zeroQuantity}</span>
      <AiOutlinePlusCircle
        className="plus-minus-icons"
        size="20"
        onClick={() => changeQuantity('+')}
        data-testid={`${index}-product-plus`}
      >
        +
      </AiOutlinePlusCircle>
    </div>
  );
}

export default PlusMinus;
