/* eslint-disable import/no-unresolved */
import * as actionType from 'app/constants/users/users.actionTypes';
import _ from 'lodash';

const initialState = {
  list      : [],
  total     : 0,
  isLastPage: false,
};

const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.USERS_GET_LIST:
    {
      const d = action.payload.data;

      return {
        ...state,
        list      : _.keyBy(d.data, 'id'),
        total     : d.total,
        isLastPage: d.page >= d.total_pages,
      };
    }
    case actionType.USERS_CLEAR_STORE:
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
