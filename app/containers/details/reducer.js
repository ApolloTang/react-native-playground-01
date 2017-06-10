import _ from 'lodash';
import c from '../../common/actionNames';

const initialState = {
  isLoading: false,
  httpError: null,
  ids_collection: []
}

const reducer_collections = (state = {...initialState}, action) => {
  switch (action.type) {
    case c[`details__init`]: {
      return { ...state, }
    }

    case c[`details__fetch_begin`]: {
      const state_prev = state;
      const state_next = {
        ...state_prev,
        isLoading:true
      };
      return state_next;
    }
    case c[`details__fetch_success`]: {
      const payload = action.payload;
      const id_collection = _.get(payload, `id_collection`, void 0 );

      const state_prev = state;
      const state_next = {
        ...state,
        id_collection,
        isLoading: false,
      };
      return state_next;
    }
    case c[`details__fetch_fail`] : {
      const payload = action.payload;
      const state_prev = {...state};
      const state_next = {
        ...state,
        isLoading: false,
        httpError: payload.error
      };
      return state_next;
    }

    case c[`details__teardown`]: {
      return { ...state, }
    }
    default: {
      return state
    }
  }
}

export default reducer_collections;
