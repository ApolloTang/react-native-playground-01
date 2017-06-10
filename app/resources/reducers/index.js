import {combineReducers} from 'redux';

import collections from './collections';

const resources = combineReducers( {
  collections,
});


export default resources;

