import { put, takeLatest, all } from 'redux-saga/effects';
import Api from '../../common/Api/Api'
import { auth } from "./AuthActions"
import { user as userActions } from "../User/UserActions"
import { push } from 'react-router-redux';
import { Token } from '../../common/Storage/Token';

function* login({ payload }) {
  const response = yield Api.post("/auth/login", payload.data)

  if (response.ok) {

    Token.setToken('local', response.payload.token)
    yield put(auth.loginResponse(response.payload.token));
    yield put(push('/courses'));
  } else {
    const err = new TypeError(response?.payload?.error ? response.payload.error : 'ERROR_LOGIN')
    yield put(auth.loginResponse(err))
  }
}

function* logout({ }) {
  localStorage.removeItem('token');
  yield put(push('/'));
}

function* ActionWatcher() {
  yield takeLatest(auth.login, login)
  yield takeLatest(auth.logout, logout)
}

export default function* rootSaga() {
  yield all([
    ActionWatcher(),
  ]);
}