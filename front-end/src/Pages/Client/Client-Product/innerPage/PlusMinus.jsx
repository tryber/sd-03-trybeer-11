import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from 'react-icons/ai';
import { shoppingListAction } from '../../../../Redux/action/shoppingListAction';

const PlusMinus = ({ index, id, name, photo, price, sellingQuantity, setSellingQuantity }) => {
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const shoppingList = useSelector(state => state.shoppingListReducer.data);

  const changeReduxShoppingList = (operator) => {
    if (shoppingList.length > 0) {
      if (shoppingList.some((product) => product.id === id)) {
        return shoppingList.map((product) => {
          if (product.id === id) {
            return {
              id,
              name,
              price,
              photo,
              sellingQnt: eval(`${product.sellingQnt} ${operator} ${1}`),
            };
          }
          return product;
        })
      }
      const newList = [...shoppingList];
      newList.push({
        id,
        name,
        price,
        photo,
        sellingQnt: eval(`${sellingQuantity} ${operator} ${1}`),
      });
      return newList;
    }
    return [{
      id,
      name,
      price,
      photo,
      sellingQnt: eval(`${sellingQuantity} ${operator} ${1}`),
    }];
  }

  const changeQuantity = (operator) => {
    setSellingQuantity(eval(`${sellingQuantity} ${operator} ${1}`));
    dispatch(shoppingListAction(changeReduxShoppingList(operator)))
  }

  useEffect(() => {
    if (sellingQuantity <= 0) return setDisable(true);
    setDisable(false);
  }, [sellingQuantity])

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
      <span data-testid={`${index}-product-qtd`}>{sellingQuantity}</span>
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
