import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AiOutlinePlusCircle,
  AiOutlineMinusCircle,
} from 'react-icons/ai';
import { shoppingListAction } from '../../../../Redux/action/shoppingListAction';
import convertBRL from '../../../../Services/BRLFunction';

const PlusMinus = ({ index, id, name, photo, price, sellingQuantity, setSellingQuantity }) => {
  const [disable, setDisable] = useState(false);
  const dispatch = useDispatch();
  const shoppingList = useSelector(state => state.shoppingListReducer.data);

  const changeReduxShoppingList = (value) => {
    if (shoppingList.length > 0) {
      if (value === 0) {
        return shoppingList.filter((product) => product.id !== id);
      };

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
    const shoppingListArray = changeReduxShoppingList(value);
    localStorage.setItem('sellingProducts', JSON.stringify(shoppingListArray));
    setSellingQuantity(value);
    dispatch(shoppingListAction(shoppingListArray));
  }

  useEffect(() => {
    sellingQuantity <= 0 ? setDisable(true) : setDisable(false);
  }, [sellingQuantity]);

  const brlPrice = convertBRL(price);


  return (
    <div className="plus-minus-buttons">
      <span onClick={()=> changeQuantity(sellingQuantity + 1)} data-testid={`${index}-product-price`}>{brlPrice}</span>
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
