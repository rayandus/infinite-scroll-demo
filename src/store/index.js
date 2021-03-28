/* eslint-disable import/extensions */
import * as reduxModule from 'redux';
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import createReducer from './reducers';

/*
Fix for Firefox redux dev tools extension
https://github.com/zalmoxisus/redux-devtools-instrument/pull/19#issuecomment-400637274
 */
// eslint-disable-next-line no-underscore-dangle
reduxModule.__DO_NOT_USE__ActionTypes.REPLACE = '@@redux/INIT';

const store = createStore(createReducer(), applyMiddleware(thunk));

store.asyncReducers = {};

export const injectReducer = (key, reducer) => {
  if (store.asyncReducers[key]) {
    return;
  }
  store.asyncReducers[key] = reducer;
  store.replaceReducer(createReducer(store.asyncReducers));

  // eslint-disable-next-line consistent-return
  return store;
};

export default store;
