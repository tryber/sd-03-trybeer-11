import { combineReducers } from 'redux';
import apiProductsReducer from './apiProductsReducer';

const rootReducer = combineReducers({ apiProductsReducer });

export default rootReducer;
