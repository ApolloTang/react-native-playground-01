import _ from 'lodash';
import Action_login from '../login/action';

const mapStoreToProps = store=>{
  const user = _.get(store, `sessions.user_loggedIn`, void 0);
  const out = {
    user
  };
  return out;
};

const mapDispatchToProps = dispatch => ({
  // dispatch_init() {
  //   dispatch( Action.init() )
  // },
  dispatch_destroySession() {
    dispatch( Action_login.destroySession() )
  }
});
export {mapStoreToProps, mapDispatchToProps};
