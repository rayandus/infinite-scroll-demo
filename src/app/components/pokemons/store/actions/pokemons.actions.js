/* eslint-disable import/no-unresolved */
import { PAGE_OFFSET, PAGE_LIMIT } from 'app/constants/constants';
import * as actionType from './pokemons.action-types';
import PokemonsApi from '../../api/PokemonsApi';

export function getPokemons(pageOffset = PAGE_OFFSET, pageLimit = PAGE_LIMIT) {
  const params = `?offset=${pageOffset}`
               + `&limit=${pageLimit}`;

  const request = PokemonsApi.getList(params);

  return (dispatch) => {
    return request.then((response) => {
      dispatch({
        type   : actionType.POKEMONS_GET_LIST,
        payload: {
          data: response,
        },
      });
      return Promise.resolve();
    })
      .catch((error) => {
        return Promise.reject(new Error(error));
      });
  };
}

export function clearStore() {
  return {
    type: actionType.POKEMONS_CLEAR_STORE,
  };
}
