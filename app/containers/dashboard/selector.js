import _ from 'lodash';
import Action_Collection from '../collections/action';
import Action_Details from '../details/action';

const mapStoreToProps = store=>{
  const res_collections = _.get(store, `resources.collections`, null);
  const isLoading = _.get(store, `app.collections.isLoading`, true);
  const ids_collection = _.get(store, `app.collections.ids_collection`, void 0);
  const httpError = _.get(store, `app.collections.httpError`, '');
  const navTab = _.get(store, `nav.routes[1].index`, void 0);
  const navStackIndex = _.get(store, `nav.index`, void 0);
  const user = _.get(store, `sessions.user_loggedIn`, void 0);
  const out = {
    res_collections,
    isLoading,
    ids_collection,
    navTab,
    navStackIndex,
    user,
    httpError,
  };
  return out;
};

const mapDispatchToProps = dispatch => ({
  // dispatch_init() {
  //   dispatch( Action.init())
  // },
  dispatch_fetchCollections_subscribed() {
    dispatch( Action_Collection.fetchCollections_filtered('subscribed'));
  },
  dispatch_toggleSubscribeCollections(id_collection) {
    dispatch(Action_Details.toggleSubscribeCollection(id_collection));
  },
});

export {mapStoreToProps, mapDispatchToProps};
