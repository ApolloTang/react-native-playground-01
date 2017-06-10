import {combineReducers} from 'redux';

import collections from '../../containers/collections/reducer';
import login from '../../containers/login/reducer';

const reducer_app = combineReducers({
  collections,
  login,
});

export default reducer_app;
