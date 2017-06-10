import _ from 'lodash';
import c from '../../common/actionNames';

const initialState = {
  isLoading: true,
  httpError: null,
  ids_collection: []
}

const reducer_collections = (state = {...initialState}, action) => {
  switch (action.type) {
    case c[`collections__init`]: {
      return { ...state, }
    }


    case c[`collections__fetch_begin`]: {
      const state_prev = state;
      const state_next = {
        ...state_prev,
        isLoading:true
      };
      return state_next;
    }
    case c[`collections__fetch_success`]: {
      const payload = action.payload;
      const ids_collection = _.get(payload, `ids_collection`, [] );

      const state_prev = state;
      const state_next = {
        ...state,
        ids_collection,
        isLoading: false,
      };
      return state_next;
    }
    case c[`collections__fetch_fail`] : {
      const payload = action.payload;
      const state_prev = {...state};
      const state_next = {
        ...state,
        isLoading: false,
        httpError: payload.error
      };
      return state_next;
    }


    case c[`collections__filtered__fetch_begin`]: {
      const state_prev = state;
      const state_next = {
        ...state_prev,
        isLoading:true
      };
      return state_next;
    }
    case c[`collections__filtered__fetch_success`]: {
      const payload = action.payload;
      const ids_collection = _.get(payload, `ids_collection`, [] );

      const state_prev = state;
      const state_next = {
        ...state,
        ids_collection,
        isLoading: false,
      };
      return state_next;
    }
    case c[`collections__filtered__fetch_fail`] : {
      const payload = action.payload;
      const state_prev = {...state};
      const state_next = {
        ...state,
        isLoading: false,
        httpError: payload.error
      };
      return state_next;
    }


    case c[`collections__teardown`]: {
      return { ...state, }
    }
    default: {
      return state
    }
  }
}

export default reducer_collections;
