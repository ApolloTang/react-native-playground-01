import _ from 'lodash';

import appConfig from 'playground01/app/appConfig';
import store from 'playground01/app/root/store';
import {createHttp} from 'playground01/app/util/rest';
import c from 'playground01/app/common/actionNames';

const rootUrl = _.get(appConfig, `rootUrl`, void 0);

const api_details = {
  update(id_collection, payload) {
    // payload = {
    //   "user_id":"1",
    //   "subscribe":true,
    //   "communication_email":true,
    //   "communication_push":true
    // }

    if (__DEV__) {
      console.log('before createHttp.put: ', id_collection, payload )
    }
    return createHttp
      .put(`${rootUrl}/devtools/postman/collections/${id_collection}`, payload)
      .then(
        collectionItem => {
          console.log('yyyyyy in service/api/collections: collections:', collectionItem )
          const collections = [collectionItem];
          store.dispatch( {
            type: c[`resources_collections_update`],
            payload: {collections}
          });
          return collections;
        }
      );
  },
  get(id_collection) {
    return createHttp
      .get(`${rootUrl}/devtools/postman/collections/${id_collection}`)
      .then(
        collectionItem => {
          if (__DEV__) {
            console.log('yyyyyy in service/api/collections: get one collection:', collectionItem )
          }
          const collections = [collectionItem];
          store.dispatch( {
            type: c[`resources_collections_update`],
            payload: {collections}
          });
          return collections;
        }
      );
  }
}


export default api_details;
