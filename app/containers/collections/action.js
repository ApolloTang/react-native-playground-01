import _ from 'lodash';
import c from 'postman_sync/app/common/actionNames';

import API from 'postman_sync/app/services/api';

// const mockData = {
//   ids_collection: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
// };

const Action_collections = {
  init() {
    return (dispatch, getState) => {
      dispatch({
        type: c[`collections__init`],
      });
    };
  },
  fetchCollections() {
    return (dispatch, getState) => {
      dispatch({
        type: c[`collections__fetch_begin`],
      });
      return API.collections.getAll().then(
        collection=>{
          const ids_collection = _(collection).map(item => item.id).filter( item => item).value();
          dispatch({
            type: c[`collections__fetch_success`],
            payload: {ids_collection},
          });
        },
        err=>{
          dispatch({
            type: c[`userCatelog_fetch_fail`],
            error: err
          });
        },
      );
    }
  },
  fetchCollections_filtered(filterType) {
    // Construct filter here
    let searchParams = 'filter=subscribed';

    return (dispatch, getState) => {
      dispatch({
        type: c[`collections__filtered__fetch_begin`],
      });
      return API.collections.getAll(searchParams).then(
        collection=>{
          const ids_collection_subset = _(collection).map(item => item.id).filter( item => item).value();
          dispatch({
            type: c[`collections__filtered__fetch_success`],
            payload: {ids_collection: ids_collection_subset},
          });
        },
        err=>{
          dispatch({
            type: c[`userCatelog_fetch_fail`],
            error: err
          });
        },
      );
    }
  },
}

export default Action_collections;


