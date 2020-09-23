export const ADD_QUANTITY = 'ADD_QUANTITY';

export const quantityAction = (productsArr) => ({
  type: ADD_QUANTITY,
  newProductArr: productsArr,
});
