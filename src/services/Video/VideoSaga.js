import { put, takeLatest, all } from 'redux-saga/effects';
import Api from '../../common/Api/Api'
import { video as videoActions } from './VideoActions';

function* videoStart({ payload }) {
  const response = yield Api.put(`/video/video-start/${payload?.video?.id}`, undefined, undefined)

  if (response.ok) {
    yield put(videoActions.videoStartResponse());

    payload.callback(payload?.lesson)
  } else {
    const err = new TypeError(response?.payload?.error || 'ERROR_VIDEO_START')
    yield put(videoActions.videoStartResponse(err))
  }
}

function* getVideosCategorys({ payload }) {
  const response = yield Api.get(`/video/get-video-date/${payload?.categoryId}`, undefined, undefined)

  if (response.ok) {
    yield put(videoActions.getVideosCategorysResponse(response.payload));
  } else {
    const err = new TypeError(response?.payload?.error || 'ERROR_GET_VIDEO_DATE')
    yield put(videoActions.getVideosCategorysResponse(err))
  }
}

function* getVideoLive({ payload }) {
  const response = yield Api.get(`/video/get-video-live`, undefined, undefined)

  if (response.ok) {
    yield put(videoActions.getVideoLiveResponse(response.payload));
  } else {
    const err = new TypeError(response?.payload?.error || 'ERROR_GET_VIDEO_LIVE')
    yield put(videoActions.getVideoLiveResponse(err))
  }
}

function* videoEventEnd({ payload }) {
  yield put(videoActions.getVideoLive());
}

function* ActionWatcher() {
  yield takeLatest(videoActions.videoStart, videoStart)
  yield takeLatest(videoActions.getVideosCategorys, getVideosCategorys)
  yield takeLatest(videoActions.getVideoLive, getVideoLive)
  yield takeLatest(videoActions.videoEventEnd, videoEventEnd)
}

export default function* rootSaga() {
  yield all([
    ActionWatcher(),
  ]);
}