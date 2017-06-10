import _ from 'lodash';
import Action from './action';

const mapStoreToProps = store=>{
  const res_collections = _.get(store, `resources.collections`, null);
  const isLoading = _.get(store, `app.collections.isLoading`, true);
  const out = {
    res_collections,
    isLoading,
  };
  return out;
};

const mapDispatchToProps = dispatch => ({
/*  dispatch_init() {
    dispatch(Action.init());
  },*/
  dispatch_fetchDetails(id_collection) {
    dispatch(Action.fetchDetails(id_collection));
  },
  dispatch_toggleSubscribeCollections(id_collection) {
    dispatch(Action.toggleSubscribeCollection(id_collection));
  },
});

export {mapStoreToProps, mapDispatchToProps};
