import { put, takeLatest, all } from 'redux-saga/effects';
import Api from '../../common/Api/Api'
import { auth } from "./AuthActions"
import { push } from 'react-router-redux';
import { Token } from '../../common/Storage/Token';

function* login({ payload }) {
  
  const { payload: response, ok } = yield Api.post("/auth/login", payload, undefined)

  if (ok) {
    Token.setToken('local', response.payload)
    yield put(auth.loginResponse(response.payload))
    yield put(push('/courses'))

  } else {
    const err = new TypeError(response?.error || 'ERROR_LOGIN')
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