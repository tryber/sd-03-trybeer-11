import { CHANGE_QUANTITY, SUCCESSFUL_PURCHASE } from '../action/shoppingListAction';

const INITIAL_STATE = {
  data: [],
  message: '',
};

const shoppingListReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CHANGE_QUANTITY:
      return {
        ...state,
        data: [...action.newData],
      };
    case SUCCESSFUL_PURCHASE:
      return {
        ...state,
        message: action.message,
      };
    default:
      return state;
  }
};

export default shoppingListReducer;
