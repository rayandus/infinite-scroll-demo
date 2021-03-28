import { combineReducers } from 'redux';
import routes from './routes.reducer';

const createReducer = (asyncReducers) => {
  return combineReducers({
    routes,
    ...asyncReducers,
  });
};

export default createReducer;
