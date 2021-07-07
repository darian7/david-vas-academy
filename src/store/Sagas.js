import { fork, all } from 'redux-saga/effects'

import AuthSaga from '../services/Auth/AuthSaga'
import CourseSaga from '../services/Course/CourseSaga'
import UserSaga from '../services/User/UserSaga'
import VideoSaga from '../services/Video/VideoSaga'

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(CourseSaga),
    fork(UserSaga),
    fork(VideoSaga),

  ]);
}