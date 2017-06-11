import {combineReducers} from 'redux';

import nav from './nav';
import app from './app';
import resources from 'playground01/app/resources/reducers/';
import sessions from 'playground01/app/sessions/reducers/';

const reducer_root = combineReducers({
  nav,
  app,
  resources,
  sessions
})

export default reducer_root;




