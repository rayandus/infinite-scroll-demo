/* eslint-disable import/no-unresolved */
import keyBy from 'lodash/keyBy';
import * as actionType from '../actions/pokemons.action-types';

const initialState = {
  list      : [],
  total     : 0,
  isLastPage: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.POKEMONS_GET_LIST:
    {
      const result = action.payload.data;

      return {
        ...state,
        list      : keyBy(result.results, 'name'),
        total     : result.count,
        isLastPage: result.next === null,
      };
    }
    case actionType.POKEMONS_CLEAR_STORE:
    {
      return {
        ...state,
        ...initialState,
      };
    }
    default:
    {
      return state;
    }
  }
};

export default usersReducer;
