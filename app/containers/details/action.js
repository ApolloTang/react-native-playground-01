import _ from 'lodash';
import c from 'playground01/app/common/actionNames';

import API from 'playground01/app/services/api';

const Action_details = {
  init() {
    return (dispatch, getState) => {
      dispatch({
        type: c[`details__init`],
      });
    };
  },

  fetchDetails ( id_collection ) {
    return (dispatch, getState) => {
      dispatch({
        type: c[`details__fetch_begin`],
      });
      return API.details.get(id_collection).then(
        details=>{
          dispatch({
            type: c[`details__fetch_success`],
            payload: {id_collection: details[0].id },
          });
        },
        err=>{
          dispatch({
            type: c[`details__fetch_fail`],
            error: err
          });
        },
      );
    }
  },

  toggleSubscribeCollection( id_collection ) {
    return (dispatch, getState) => {
      dispatch({
        type: c[`details__update_begin`],
      });

      // Clone properties
      const user_id = "1";    //@TODO id is not available right now
      const is_subscribed = (_.get(getState(), `resources.collections.${id_collection}.is_subscribed`, void 0));
      const email_notification = _.get(getState(), `resources.collections.${id_collection}.email_notification`, void 0);
      const push_notification = _.get(getState(), `resources.collections.${id_collection}.push_notification`, void 0);

      // Only proceed if all properties are available
      if ( !user_id ) return;

      // Compose payload
      const payload = {
        user_id,
        subscribe: !is_subscribed,
        communication_email: email_notification,
        communication_push: push_notification
      };

      return API.details.update(id_collection, payload).then(
        collection_updated => {
          dispatch({
            type: c[`details__update_succcess`],
            payload: {id_collection: collection_updated[0].id},
          });
        },
        err=>{
          dispatch({
            type: c[`details__fetch_fail`],
            error: err
          });
        },

      );
    }
  },
}

export default Action_details;


