//CREATES THE REDUX STORE, APPLIES MIDDLEWARES, AND HOLDS THE REDUCERS FOR THE APPLICATION

import { applyMiddleware, createStore } from 'redux';
import { promiseMiddleware, localStorageMiddleware } from './middleware';
import reducers from './reducers';

const middleware = applyMiddleware(promiseMiddleware, localStorageMiddleware);

const store = createStore(reducers, middleware);

export default store;
