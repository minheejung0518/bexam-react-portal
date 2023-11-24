import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import ThemeOptions from './ThemeOptions';
import auth from './auth';
import common from './common';
import exam from './exam';

const rootReducer = history =>
  combineReducers({
    ThemeOptions,
    auth,
    common,
    exam,
    router: connectRouter(history),
  });

export default rootReducer;
