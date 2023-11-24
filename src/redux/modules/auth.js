import { createActions, handleActions } from 'redux-actions';
import { takeEvery, put, call, select } from 'redux-saga/effects';
import Swal from 'sweetalert2';

import AuthService from '../../services/AuthService';
import TokenService from '../../services/TokenService';

import { getTokenFromState } from '../utils';

const options = {
  prefix: 'react/auth',
};

export const { success, pending, fail } = createActions('SUCCESS', 'PENDING', 'FAIL', options);

const initialState = {
  token: null,
  loading: false,
  error: null,
};

const reducer = handleActions(
  {
    PENDING: state => ({
      ...state,
      loading: true,
      error: null,
    }),
    SUCCESS: (state, action) => ({
      ...state,
      token: action.payload,
      loading: false,
      error: null,
    }),
    FAIL: (state, action) => ({
      ...state,
      loading: false,
      error: action.payload,
    }),
  },
  initialState,
  options
);

export default reducer;

function* loginSaga(action) {
  try {
    // const data = {
    //   accessToken:
    //     'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiIxIiwiaWF0IjoxNjY3OTU4NTEzLCJleHAiOjE2Njc5NjIxMTN9.SaRC_UNDXpavpJE_D',
    // };
    yield put(pending());
    const data = yield call(AuthService.login, action.payload);
    TokenService.set(data.accessToken);

    yield put(success(data.accessToken));
    // yield put(push('/'));
  } catch (error) {
    yield put(fail(new Error(error?.response?.data?.message || 'UNKNOWN_ERROR')));
  }
}

function* logoutSaga() {
  try {
    yield put(pending());
    const token = yield select(getTokenFromState);
    yield call(AuthService.logout, token);
  } catch (error) {
    console.log(error);
  } finally {
    TokenService.remove();
    yield put(success(null));
  }
}

function* signupSaga(action) {
  try {
    yield put(pending());
    yield call(AuthService.signup, action.payload);
    Swal.fire({
      icon: 'success',
      type: 'success',
      text: `회원가입에 성공하였습니다.`,
    }).then(result => {
      window.location.href = '/login';
    });
  } catch (error) {
    yield put(fail(new Error(error?.response?.data?.message || 'UNKNOWN_ERROR')));
  }
}

export const { login, logout, signup } = createActions('LOGIN', 'LOGOUT', 'SIGNUP', options);

export function* sagas() {
  yield takeEvery(`${options.prefix}/LOGIN`, loginSaga);
  yield takeEvery(`${options.prefix}/LOGOUT`, logoutSaga);
  yield takeEvery(`${options.prefix}/SIGNUP`, signupSaga);
}
