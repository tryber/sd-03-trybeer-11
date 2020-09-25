export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';

export const shoppingListAction = (productsArr) => ({
  type: CHANGE_QUANTITY,
  newData: productsArr,
});
