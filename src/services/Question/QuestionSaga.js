import { put, takeLatest, all } from 'redux-saga/effects';
import Api from '../../common/Api/Api'
import { question as questionActions } from './QuestionActions';

function* getQuestions({ payload }) {
  const response = yield Api.get(`/question/get-questions-themes`)

  if (response.ok) {
    yield put(questionActions.getQuestionsResponse(response.payload));
  } else {
    const err = new TypeError(response?.payload?.error || 'ERROR_GET_QUESTIONS')
    yield put(questionActions.getQuestionsResponse(err))
  }
}

function* ActionWatcher() {
  yield takeLatest(questionActions.getQuestions, getQuestions)
}

export default function* rootSaga() {
  yield all([
    ActionWatcher(),
  ]);
}