import _ from 'lodash';
import Action_Collection from '../collections/action';

const mapStoreToProps = store => {
  const isLoading = false
  const out = {
    store,
    isLoading,
  };
  return out;
};

const mapDispatchToProps = dispatch => ({
  dispatch_someAction(id_collection) {
    dispatch(()=>{ console.log('dispatched')});
  },
});

export {mapStoreToProps, mapDispatchToProps};
