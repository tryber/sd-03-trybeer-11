import { combineReducers } from 'redux';
import apiProductsReducer from './apiProductsReducer';
import shoppingListReducer from './shoppingListReducer';

const rootReducer = combineReducers({ apiProductsReducer, shoppingListReducer });

export default rootReducer;
