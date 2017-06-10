import _ from 'lodash';

import appConfig from 'postman_sync/app/appConfig';
import store from 'postman_sync/app/root/store';
import {createHttp} from 'postman_sync/app/util/rest';
import c from 'postman_sync/app/common/actionNames';

const rootUrl = _.get(appConfig, `rootUrl`, void 0);

const api_collections = {
  getAll(searchParams) {
    if (!searchParams) {
      return createHttp
        .get(`${rootUrl}/devtools/postman/collections`)
        .then(
          collections => {
            if (__DEV__){
              console.log('yyyyyy in service/api/collections: collections:', collections)
            }
            store.dispatch( {
              type: c[`resources_collections_update`],
              payload: {collections}
            });
            return collections;
          }
        );
    } else {
      return createHttp
        .get(`${rootUrl}/devtools/postman/collections?${searchParams}`)
        .then(
          collections => {
            if (__DEV__){
              console.log('yyyyyy in service/api/collections: filtered collections:', collections)
            }
            store.dispatch( {
              type: c[`resources_collections_update`],
              payload: {collections}
            });
            return collections;
          }
        );
    }
  }
}


export default api_collections;
