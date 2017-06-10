import _ from 'lodash';
import Action from './action';

const mapStoreToProps = store => {
  const isLoggedIn = _.get(store, `sessions.authentication.isLoggedIn`, false );
  const isLoading = _.get(store, `app.login.isLoading`, false);
  const loginError = _.get(store, `app.login.loginError`, '');
  return {
    isLoggedIn,
    isLoading,
    loginError,
  };
};

const mapDispatchToProps = dispatch => ({
  dispatch_init() {
    dispatch(Action.init());
  },
  dispatch_createSession(username, userpassword, extra) {
    dispatch(Action.createSession(username, userpassword, extra));
  }
});


export { mapStoreToProps, mapDispatchToProps };
