import { put, takeLatest, all } from 'redux-saga/effects'
import Api from '../../common/Api/Api'
import { tutorial as tutorialActions } from "./TutorialActions"
import { stringToJson } from '../../common/utilities/stringToJson'

function* getTutorials({ payload }) {
  const response = yield Api.get(`/video/app/tutorial`, undefined, true)
  if (response.ok) {
    const data = response.payload.map(level => ({
      ...level,
      name: stringToJson(level.name),
      videos: level.videos?.map((video) => ({
        ...video,
        title: stringToJson(video.title),
        description: stringToJson(video.description)
      }))
    }))
    yield put(tutorialActions.setTutorials(data));
  } else {
    const err = new TypeError(response?.payload?.error || 'ERROR_GET_TEMARY')
    yield put(tutorialActions.setTutorials(err))
  }
}

function* ActionWatcher() {
  yield takeLatest(tutorialActions.getTutorials, getTutorials)
}

export default function* rootSaga() {
  yield all([
    ActionWatcher(),
  ]);
}