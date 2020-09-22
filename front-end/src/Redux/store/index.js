import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/index.js'

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
