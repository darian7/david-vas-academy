import { put, takeLatest, all } from 'redux-saga/effects';
import Api from '../../common/Api/Api'
import { temary as temaryActions } from "./TemaryActions"

function* getTemary({ payload }) {
  const response = yield Api.get(`/temary/get-progress-temarys-course/${payload.id}`)

  if (response.ok) {
    yield put(temaryActions.getTemaryResponse(response.payload));
  } else {
    const err = new TypeError(response?.payload?.error || 'ERROR_GET_TEMARY')
    yield put(temaryActions.getTemaryResponse(err))
  }
}

function* temaryStart({ payload }) {
  const response = yield Api.put(`/temary/temary-start/${payload?.temary?.id}`, { courseId: payload.courseId })

  if (response.ok) {
    yield put(temaryActions.temaryStartResponse());
    yield put(temaryActions.getTemaryResponse(response.payload.temarys))
  } else {
    payload.errorCallback()
    const err = new TypeError(response?.payload?.error || 'ERROR_TEMARY_START')
    yield put(temaryActions.temaryStartResponse(err))
  }
}

function* ActionWatcher() {
  yield takeLatest(temaryActions.getTemary, getTemary)
  yield takeLatest(temaryActions.temaryStart, temaryStart)
}

export default function* rootSaga() {
  yield all([
    ActionWatcher(),
  ]);
}