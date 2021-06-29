import { put, takeLatest, all } from 'redux-saga/effects';
import Api from '../../common/Api/Api'
import { user as userActions } from "./UserActions"

function* getUser({ payload }) {

  const response = yield Api.get("/user/get-user")

  if (response.ok) {
    yield put(userActions.getUserResponse(response.payload.user));
  } else {
    const err = new TypeError(response?.payload?.error ? response.payload.error : 'ERROR_GET_USER')
    yield put(userActions.getUserResponse(err))
  }
}

function* ActionWatcher() {
  yield takeLatest(userActions.getUser, getUser)
}

export default function* rootSaga() {
  yield all([
    ActionWatcher(),
  ]);
}