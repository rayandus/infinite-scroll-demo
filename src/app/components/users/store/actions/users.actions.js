/* eslint-disable import/no-unresolved */
import * as actionType from 'app/constants/users/users.actionTypes';
import { PAGE_SIZE } from 'app/constants/users/users.constants';
import UsersApi from '../../api/UsersApi';

export function getUsers(pageSize = PAGE_SIZE) {
  const params = `?per_page=${pageSize}`
               // Simulation to slow API response
               + '&delay=3'
               // Quick fix to caching
               + `&nocache=${new Date().getTime()}`;

  const request = UsersApi.getUsers(params);

  return (dispatch) => {
    return request.then((response) => {
      return dispatch({
        ok     : true,
        type   : actionType.USERS_GET_LIST,
        payload: {
          data: response,
        },
      });
    })
      .catch((error) => {
        return dispatch({
          ok   : false,
          type : actionType.USERS_ERROR,
          error: error.error,
        });
      });
  };
}

export function clearStore() {
  return {
    type: actionType.USERS_CLEAR_STORE,
  };
}
