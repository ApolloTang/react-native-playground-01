import _ from 'lodash';
import store from 'playground01/app/root/store';
import {createHttp} from 'playground01/app/util/rest';
import c from 'playground01/app/common/actionNames';


import appConfig from 'playground01/app/appConfig';

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
