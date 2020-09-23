export const ADD_QUANTITY = 'ADD_QUANTITY';

export const quantiyAction = (productObj) => ({
  type: ADD_QUANTITY,
  newProductObj: productObj
})
