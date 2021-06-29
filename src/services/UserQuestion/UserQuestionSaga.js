import { put, takeLatest, all } from 'redux-saga/effects';
import Api from '../../common/Api/Api'
import { userQuestion } from './UserQuestionActions';
import { temary as temaryActions } from '../Temary/TemaryActions';

function* createUserQuestion({ payload }) {
  const response = yield Api.post("/user-question/save-answer-user", payload.userQuestion)

  if (response.ok) {
    payload.succesCallback(true)
    payload.callback(3000)
    yield put(userQuestion.createUserQuestionResponse(response.payload.userQuestion));
    yield put(temaryActions.getTemaryResponse(response.payload.temarys))
  } else {
    const err = new TypeError(response?.payload?.error || 'ERROR_CREATE_QUESTION_USER')
    yield put(userQuestion.createUserQuestionResponse(err))
  }
}

function* deleteUserQuestion({ payload }) {
  const response = yield Api.put(`/user-question/delete-answer-lesson/${payload.lessonId}`, { courseId: payload?.courseId })

  if (response.ok) {
    payload.succesCallback(payload.tryAgainLesson)
    yield put(userQuestion.deleteUserQuestionResponse());
    yield put(temaryActions.getTemaryResponse(response.payload.temarys))
  } else {
    const err = new TypeError(response?.payload?.error || 'ERROR_DELETE_QUESTION_USER')
    yield put(userQuestion.deleteUserQuestionResponse(err))
  }
}

function* deleteUserQuestionModule({ payload }) {
  const response = yield Api.put(`/user-question/delete-answer-module/${payload.moduleId}`, { courseId: payload?.courseId })

  if (response.ok) {
    payload.succesCallback(payload.tryAgainLesson)
    yield put(userQuestion.deleteUserQuestionModuleResponse());
    yield put(temaryActions.getTemaryResponse(response.payload.temarys))
  } else {
    const err = new TypeError(response?.payload?.error || 'ERROR_DELETE_QUESTION_USER_MODULE')
    yield put(userQuestion.deleteUserQuestionModuleResponse(err))
  }
}

function* ActionWatcher() {
  yield takeLatest(userQuestion.createUserQuestion, createUserQuestion)
  yield takeLatest(userQuestion.deleteUserQuestion, deleteUserQuestion)
  yield takeLatest(userQuestion.deleteUserQuestionModule, deleteUserQuestionModule)
}

export default function* rootSaga() {
  yield all([
    ActionWatcher(),
  ]);
}