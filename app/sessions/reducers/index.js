import {combineReducers} from 'redux';

import authentication from './authentication';
import user_loggedIn from './user_loggedIn';

const resources = combineReducers( {
  authentication,
  user_loggedIn
});


export default resources;

