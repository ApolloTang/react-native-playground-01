import c from 'playground01/app/common/actionNames';
import API from 'playground01/app/services/api';

const Action_login = {
  init() {
    return (dispatch, getState) => {
      dispatch({
        type: c[`login__init`],
      });
    };
  },
  createSession(email, password, extra) {
    return (dispatch, getState) => {
      dispatch({
        type: c[`login__createSession_begin`],
      });
      return API.authentication.createSession(email, password, extra).then(
        session => {
          session.httpError
            ?
          dispatch({
            type: c[`login__createSession_fail`],
            error: 'The username and password combination is incorrect.',
          })
            :
          dispatch({
            type: c[`login__createSession_success`],
            payload: session,
          })
        }
      );
    }
  },
  destroySession () {
    return (dispatch, getState) => {
      dispatch( {type: c[`login__destroySession`]} );
      dispatch( {type: c[`sessions_authenticate_destroySession`]} );
    }
  }
}

export default Action_login;
