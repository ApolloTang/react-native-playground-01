import _ from 'lodash';
import store from 'postman_sync/app/root/store';

function getToken() {
  const storeState = store.getState();
  const _token = _.get(storeState, 'sessions.authentication.token', void 0);
  if (__DEV__){
    console.log('xxxxxxxxxxxxxxxxxx token in store: ', _token)
  }
  return _token;
}

function getSharedHeaders() {
  const token = getToken();

  let headers_share = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  if (token) {
    const credential  = `Bearer ${token}`;
    const logInUserId = '1'  // id of user that is login
    headers_share = {
      ...headers_share,
      'Authorization': credential, // only include credential and logInUserId when token is available
      'user-id': logInUserId       // userid will be embeded in token eventually
    };
  }

  return headers_share;
}

const get = (url, /* params = {} */ ) => {
  const headers = {
    ...getSharedHeaders()
  };
  if (__DEV__){
    console.log('xxxxxxxx: headers: ', headers)
  }

  const opts = {
    method: 'GET',
    headers: headers,
    // cache: 'default'
  };

  return fetch(url, opts).then(
    response => {
      if (__DEV__){
        console.log('oooooooooooooooo: createHttp response ', response)
      }
      // if (!response.ok) {
      if ( (!response.status !== 200) && (!response.ok) ) {
        return { httpError: response };
      }
      if (__DEV__){
        console.log('no http Error');
      }
      return response.json()
    }
  );
};

const post = (url, payload, /* opts */ ) => {
  const headers = {
    ...getSharedHeaders()
  };
  if (__DEV__){
    console.log('xxxxxxxx: headers: ', headers)
  }

  const requestBody = JSON.stringify(payload);

  const init = {
    method: 'POST',
    headers: headers,
    // cache: 'default',
    body: requestBody
  };

  return fetch(url, init).then(
    response => {
      if (__DEV__){
        console.log('oooooooooooooooo: createHttp response ', response)
      }
      if ( (!response.status !== 200) && (!response.ok) ) {
        return { httpError: response };
      }
      if (__DEV__){
        console.log('no http Error');
      }
      return response.json();
    }
  );
};

const put = (url, payload, /* opts */ ) => {
  const headers = {
    ...getSharedHeaders()
  };

  if (__DEV__){
    console.log('xxxxxxxx Put: headers: ', headers)
  }

  const requestBody = JSON.stringify(payload);

  if (__DEV__){
    console.log('xxxxxxxx Put: body: ', JSON.stringify(payload, null, 4));
  }

  const init = {
    method: 'PUT',
    headers: headers,
    // cache: 'default',
    body: requestBody
  };

  return fetch(url, init).then(
    response => {
      if (__DEV__){
        console.log('oooooooooooooooo: createHttp response ', response)
      }
      if ( (!response.status !== 200) && (!response.ok) ) {
        return { httpError: response };
      }
      if (__DEV__){
        console.log('no http Error');
      }
      return response.json();
    }
  );
};

// const del = (url) => {
//   const headers = {
//     ...hearders_shared
//   };
//
//   const init = {
//     method: 'DELETE',
//     headers: headers,
//     mode: 'cors',
//     cache: 'default',
//   };
//
//   return fetch(url, init).then(
//     response => response.json()
//   );
// };

export default { get, post, put /*, del */ };
