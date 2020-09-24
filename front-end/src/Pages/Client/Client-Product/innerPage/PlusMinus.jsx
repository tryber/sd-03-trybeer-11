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

  const changeReduxShoppingList = (value) => {
    if (shoppingList.length > 0) {
      if (shoppingList.some((product) => product.id === id)) {
        return shoppingList.map((product) => {
          if (product.id === id) {
            return {
              id,
              name,
              price,
              photo,
              sellingQnt: value,
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
        sellingQnt: value,
      });
      return newList;
    }
    return [{
      id,
      name,
      price,
      photo,
      sellingQnt: value,
    }];
  }

  const changeQuantity = (value) => {
    setSellingQuantity(value);
    dispatch(shoppingListAction(changeReduxShoppingList(value)));
  }

  useEffect(() => {
    sellingQuantity <= 0 ? setDisable(true) : setDisable(false);
  }, [sellingQuantity])

  return (
    <div className="plus-minus-buttons">
      <AiOutlineMinusCircle
        className="plus-minus-icons"
        size="20"
        onClick={() => !disable && changeQuantity(sellingQuantity - 1)}
        data-testid={`${index}-product-minus`}
      >
        -
      </AiOutlineMinusCircle>
      <span data-testid={`${index}-product-qtd`}>{sellingQuantity}</span>
      <AiOutlinePlusCircle
        className="plus-minus-icons"
        size="20"
        onClick={() => changeQuantity(sellingQuantity + 1)}
        data-testid={`${index}-product-plus`}
      >
        +
      </AiOutlinePlusCircle>
    </div>
  );
}

export default PlusMinus;
