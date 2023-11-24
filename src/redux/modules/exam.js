import { takeEvery, put, call, select } from 'redux-saga/effects';
import { createActions, handleActions } from 'redux-actions';
import ExamService from '../../services/ExamService';
import { getTokenFromState, reducerUtils } from '../utils';

const options = {
  prefix: 'react/exam',
};

//액션 타입 정의
export const {
  examProvidersPending,
  examProvidersSuccess,
  examProvidersFail,
  examKeywordsPending,
  examKeywordsSuccess,
  examKeywordsFail,
  examTitlesPending,
  examTitlesSuccess,
  examTitlesFail,
  examStudyPending,
  examStudySuccess,
  examStudyFail,
  examSimulationPending,
  examSimulationSuccess,
  examSimulationFail,
  examGradePending,
  examGradeSuccess,
  examGradeFail,
} = createActions(
  'EXAM_PROVIDERS_PENDING',
  'EXAM_PROVIDERS_SUCCESS',
  'EXAM_PROVIDERS_FAIL',
  'EXAM_KEYWORDS_PENDING',
  'EXAM_KEYWORDS_SUCCESS',
  'EXAM_KEYWORDS_FAIL',
  'EXAM_TITLES_PENDING',
  'EXAM_TITLES_SUCCESS',
  'EXAM_TITLES_FAIL',
  'EXAM_STUDY_PENDING',
  'EXAM_STUDY_SUCCESS',
  'EXAM_STUDY_FAIL',
  'EXAM_SIMULATION_PENDING',
  'EXAM_SIMULATION_SUCCESS',
  'EXAM_SIMULATION_FAIL,',
  'EXAM_GRADE_PENDING',
  'EXAM_GRADE_SUCCESS',
  'EXAM_GRADE_FAIL',
  options
);

//초기 상태
const initialState = {
  providers: reducerUtils.initial(),
  titles: reducerUtils.initial(),
  study: reducerUtils.initial(),
  keywords: reducerUtils.initial(),
  simulation: reducerUtils.initial(),
  grade: reducerUtils.initial(),
};

//액션 생성 함수 및 리덕스 스토어 값 변경.
const reducer = handleActions(
  {
    EXAM_PROVIDERS_PENDING: state => ({
      ...state,
      providers: reducerUtils.pending(state.providers),
    }),
    EXAM_PROVIDERS_SUCCESS: (state, action) => ({
      ...state,
      providers: reducerUtils.success(action.payload),
    }),
    EXAM_PROVIDERS_FAIL: (state, action) => ({
      ...state,
      providers: reducerUtils.fail(action.payload),
    }),
    EXAM_KEYWORDS_PENDING: state => ({
      ...state,
      keywords: reducerUtils.pending(state.keywords),
    }),
    EXAM_KEYWORDS_SUCCESS: (state, action) => ({
      ...state,
      keywords: reducerUtils.success(action.payload),
    }),
    EXAM_KEYWORDS_FAIL: (state, action) => ({
      ...state,
      keywords: reducerUtils.fail(action.payload),
    }),
    EXAM_TITLES_PENDING: state => ({
      ...state,
      titles: reducerUtils.pending(state.titles),
    }),
    EXAM_TITLES_SUCCESS: (state, action) => ({
      ...state,
      titles: reducerUtils.success(action.payload),
    }),
    EXAM_TITLES_FAIL: (state, action) => ({
      ...state,
      titles: reducerUtils.fail(action.payload),
    }),
    EXAM_STUDY_PENDING: state => ({
      ...state,
      study: reducerUtils.pending(state.study),
    }),
    EXAM_STUDY_SUCCESS: (state, action) => ({
      ...state,
      study: reducerUtils.success(action.payload),
    }),
    EXAM_STUDY_FAIL: (state, action) => ({
      ...state,
      study: reducerUtils.fail(action.payload),
    }),
    EXAM_SIMULATION_PENDING: state => ({
      ...state,
      simulation: reducerUtils.pending(state.simulation),
    }),
    EXAM_SIMULATION_SUCCESS: (state, action) => ({
      ...state,
      simulation: reducerUtils.success(action.payload),
    }),
    EXAM_SIMULATION_FAIL: (state, action) => ({
      ...state,
      simulation: reducerUtils.fail(action.payload),
    }),
    EXAM_GRADE_PENDING: state => ({
      ...state,
      grade: reducerUtils.pending(state.grade),
    }),
    EXAM_GRADE_SUCCESS: (state, action) => ({
      ...state,
      grade: reducerUtils.success(action.payload),
    }),
    EXAM_GRADE_FAIL: (state, action) => ({
      grade: reducerUtils.fail(action.payload),
    }),
  },
  initialState,
  options
);

export default reducer;

function* getProvidersSaga() {
  try {
    yield put(examProvidersPending());
    const token = yield select(getTokenFromState);
    const providers = yield call(ExamService.getProviders, token);
    yield put(examProvidersSuccess(providers));
  } catch (error) {
    yield put(examProvidersFail(new Error(error?.response?.data?.message || 'UNKNOWN_ERROR')));
  }
}

function* getKeywordsSaga() {
  try {
    yield put(examKeywordsPending());
    const token = yield select(getTokenFromState);
    const keywords = yield call(ExamService.getKeywords, token);
    yield put(examKeywordsSuccess(keywords));
  } catch (error) {
    yield put(examKeywordsFail(new Error(error?.response?.data?.message || 'UNKNOWN_ERROR')));
  }
}

function* getExamTitleSaga(action) {
  try {
    yield put(examTitlesPending());
    const token = yield select(getTokenFromState);
    let titles = {};
    if (action.payload.providerCode !== '') {
      titles = yield call(ExamService.getExamTitles, token, action.payload);
    }
    yield put(examTitlesSuccess(titles));
  } catch (error) {
    yield put(examTitlesFail(new Error(error?.response?.data?.message || 'UNKNOWN_ERROR')));
  }
}

function* getStudySaga(action) {
  try {
    yield put(examStudyPending());
    const token = yield select(getTokenFromState);
    const study = yield call(ExamService.getStudy, token, action.payload);
    yield put(examStudySuccess(study));
  } catch (error) {
    yield put(examStudyFail(new Error(error?.response?.data?.message || 'UNKNOWN_ERROR')));
  }
}

function* getSimulationSaga(action) {
  try {
    yield put(examSimulationPending());
    const token = yield select(getTokenFromState);
    const simulation = yield call(ExamService.getSimulation, token, action.payload);
    yield put(examSimulationSuccess(simulation));
  } catch (error) {
    yield put(examSimulationFail(new Error(error?.response?.data?.message || 'UNKNOWN_ERROR')));
  }
}

function* getGradeSaga(action) {
  try {
    yield put(examGradePending());
    const token = yield select(getTokenFromState);
    const grade = yield call(ExamService.getGrade, token, action.payload);
    yield put(examGradeSuccess(grade));
  } catch (error) {
    yield put(examGradeFail(new Error(error?.response?.data?.message || 'UNKNOWN_ERROR')));
  }
}

export const { getProviders, getKeywords, getTitles, getStudy, getSimulation, getGrade } =
  createActions(
    'GET_PROVIDERS',
    'GET_KEYWORDS',
    'GET_TITLES',
    'GET_STUDY',
    'GET_SIMULATION',
    'GET_GRADE',
    options
  );

export function* sagas() {
  yield takeEvery(`${options.prefix}/GET_PROVIDERS`, getProvidersSaga);
  yield takeEvery(`${options.prefix}/GET_KEYWORDS`, getKeywordsSaga);
  yield takeEvery(`${options.prefix}/GET_TITLES`, getExamTitleSaga);
  yield takeEvery(`${options.prefix}/GET_STUDY`, getStudySaga);
  yield takeEvery(`${options.prefix}/GET_SIMULATION`, getSimulationSaga);
  yield takeEvery(`${options.prefix}/GET_GRADE`, getGradeSaga);
}
