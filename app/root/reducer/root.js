import {combineReducers} from 'redux';

import nav from './nav';
import app from './app';
import resources from 'postman_sync/app/resources/reducers/';
import sessions from 'postman_sync/app/sessions/reducers/';

const reducer_root = combineReducers({
  nav,
  app,
  resources,
  sessions
})

export default reducer_root;




