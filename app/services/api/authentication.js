import _ from 'lodash';
import store from 'postman_sync/app/root/store';
import {createHttp} from 'postman_sync/app/util/rest';
import c from 'postman_sync/app/common/actionNames';


import appConfig from 'postman_sync/app/appConfig';

const rootUrl = _.get(appConfig, `rootUrl`, void 0);

const api_authentication = {
  createSession( email, password, extra ) {
    const payload = {
      email,
      password
    };

    if (__DEV__){
      console.log('xxxxxx in api_authentication.createSession', payload )
    }
    return createHttp
      // .post(`${rootUrl}/sessions/create`, payload) // for testing
      .post(`${rootUrl}/auth/session`, payload) // for testing
      .then(
        session => {
           if (__DEV__){
            console.log('session: ', session);
          }
          const token = _.get(session, `token`, void 0);
           if (__DEV__){
            console.log('token: ', token);
          }

          // @TODO calculate when user should be logged
          const token_expiry = _.get(session, `token_expiry`, void 0);
          const isLoggedIn = !!token;

          const user_loggedIn = _.get(session, `user`, void 0);

          store.dispatch( {
            type: c[`sessions_authenticate_createSession_success`],
            payload: {token, user_loggedIn, token_expiry, isLoggedIn}
          });
          return session;
        }
      );
  }
}


export default api_authentication;
