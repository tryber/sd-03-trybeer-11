import { CHANGE_QUANTITY } from '../action/shoppingListAction';

const INITIAL_STATE = {
  data: [],
};

const shoppingListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_QUANTITY:
      return {
        ...state,
        data: [...action.newData],
      };
    default:
      return state;
  }
};

export default shoppingListReducer;
