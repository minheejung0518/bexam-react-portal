import { createStore, applyMiddleware, compose } from 'redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';
import TokenService from '../services/TokenService';

const devTools =
  process.env.LOCAL_STATE === 'development' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;
const composeEnhancer = devTools || compose;

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

const token = TokenService.get();
const initialState = {
  auth: {
    token,
    loading: false,
    error: null,
  },
};

const store = createStore(
  rootReducer(history),
  initialState,
  composeEnhancer(applyMiddleware(routerMiddleware(history), sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

//console.log("create store", store.getState());

export default store;
