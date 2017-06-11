import _ from 'lodash';

import c from 'playground01/app/common/actionNames';

import {array_to_IndexObj} from 'playground01/app/util/helper.js';

const collections = (state = {}, action) => {
  switch (action.type) {
    case c[`resources_collections_update`] : {
      const payload = action.payload
      const collections_payload = _.get(action, `payload.collections`, [] );
      const collections_prev = state;
      const collections_next = {
        ...collections_prev,
        ...array_to_IndexObj(collections_payload)
      }
      return collections_next;
    }
    // case c[`resources_userCatelog_delete`] : {
    //   const payload = action.payload
    //
    //   let id_deletedUser;
    //   if (payload.hasOwnProperty('deletedUser')) {
    //     // payload receive a single user object
    //     id_deletedUser = payload.deletedUser._id;
    //   }
    //   if (payload.hasOwnProperty('deletedUsers')) {
    //     // payload receive a collection of users object in array
    //     // ... not implimented
    //   }
    //
    //   console.log('state; ', state);
    //   const users_next = _.cloneDeep(state.users);
    //   delete users_next[id_deletedUser]
    //   return users_next;
    // }
    default: {
      return state;
    }
  }
}

export default collections;
