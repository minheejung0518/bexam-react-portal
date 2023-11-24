import { createActions, handleActions } from 'redux-actions';
import { takeEvery, put, call, select } from 'redux-saga/effects';

import CommonService from '../../services/CommonService';
import { getTokenFromState, reducerUtils } from '../utils';

const options = {
  prefix: 'react/common',
};

export const { success, pending, fail } = createActions('SUCCESS', 'PENDING', 'FAIL', options);

const initialState = {
  my: reducerUtils.initial(),
};

const reducer = handleActions(
  {
    PENDING: state => ({
      ...state,
      my: reducerUtils.pending(state.my),
    }),
    SUCCESS: (state, action) => ({
      ...state,
      my: reducerUtils.success(action.payload),
    }),
    FAIL: (state, action) => ({
      ...state,
      my: reducerUtils.fail(action.payload),
    }),
  },
  initialState,
  options
);

export default reducer;

function* getMyInfoSaga() {
  try {
    yield put(pending());
    const token = yield select(getTokenFromState);
    const myInfo = yield call(CommonService.getMyInfo, token);
    yield put(success(myInfo));
  } catch (error) {
    yield put(fail(new Error(error?.response?.data?.message || 'UNKNOWN_ERROR')));
  }
}

function* editMyInfoSaga(action) {
  try {
    yield put(pending());
    const token = yield select(getTokenFromState);
    const newMyInfo = yield call(CommonService.editMyInfo, token, action.payload.myInfo);
    yield put(success(action.payload.myInfo));
  } catch (error) {
    yield put(fail(new Error(error?.response?.data?.message || 'UNKNOWN_ERROR')));
  }
}

export const { getMyInfo, editMyInfo } = createActions(
  {
    EDIT_MY_INFO: myInfo => ({
      myInfo,
    }),
  },
  'GET_MY_INFO',
  options
);

export function* sagas() {
  yield takeEvery(`${options.prefix}/GET_MY_INFO`, getMyInfoSaga);
  yield takeEvery(`${options.prefix}/EDIT_MY_INFO`, editMyInfoSaga);
}
