export const CHANGE_QUANTITY = 'CHANGE_QUANTITY';
export const SUCCESSFUL_PURCHASE = 'SUCCESSFUL_PURCHASE';

export const shoppingListAction = (productsArr) => ({
  type: CHANGE_QUANTITY,
  newData: productsArr,
});

export const successfulMessageAction = () => ({
  type: SUCCESSFUL_PURCHASE,
  message: 'Compra realizada com sucesso!',
});
