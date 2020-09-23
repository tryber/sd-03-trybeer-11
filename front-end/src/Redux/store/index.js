import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
<<<<<<< HEAD
import rootReducer from '../reducers/index.js';
=======
import rootReducer from '../reducers/index';
>>>>>>> ec51d7f0627d2d8ede04201bd99d0b18d23d3ba9

const store = createStore(rootReducer, applyMiddleware(thunk, logger));

export default store;
