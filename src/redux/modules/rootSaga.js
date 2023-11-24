import { all } from 'redux-saga/effects';

import { sagas as authSagas } from './auth';
import { sagas as commonSagas } from './common';
import { sagas as examSagas } from './exam';

export default function* rootSaga() {
  yield all([authSagas(), commonSagas(), examSagas()]);
}
