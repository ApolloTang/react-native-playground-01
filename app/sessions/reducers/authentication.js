import _ from 'lodash';

import c from 'postman_sync/app/common/actionNames';

import {array_to_IndexObj} from 'postman_sync/app/util/helper.js';

initialState = {
  token: void 0,
  token_expiry: null,
  isLoggedIn: false
};
const authentication = (state = initialState, action) => {
  switch (action.type) {
    case c[`sessions_authenticate_createSession_success`] : {
      const payload = action.payload
      const token = _.get( action, `payload.token`, void 0 );
      const token_expiry = _.get( action, `payload.token_expiry`, void 0 );
      const isLoggedIn = _.get( action, `payload.isLoggedIn`, void 0 );

      const state_prev = state;
      const state_next = {
        token,
        token_expiry,
        isLoggedIn
      }
      return state_next;
    }
    case c[`sessions_authenticate_destroySession`] : {
      const state_prev = state;
      const state_next = {
        ...initialState
      }
      return state_next;
    }
    default: {
      return state;
    }
  }
}


export default authentication;
