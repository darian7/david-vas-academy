import { fork, all } from 'redux-saga/effects'

import AuthSaga from '../services/Auth/AuthSaga'
import CourseSaga from '../services/Course/CourseSaga'
import UserSaga from '../services/User/UserSaga'
import UserQuestionSaga from '../services/UserQuestion/UserQuestionSaga'
import TemarySaga from '../services/Temary/TemarySaga'
import VideoSaga from '../services/Video/VideoSaga'
import CategorySaga from '../services/Category/CategorySaga'
import QuestionSaga from '../services/Question/QuestionSaga'
import EventSaga from '../services/Event/EventSaga'
import TutorialSaga from '../services/Tutorial/TutorialSaga'
import ToolSaga from '../services/Tool/ToolSaga'

export default function* rootSaga() {
  yield all([
    fork(AuthSaga),
    fork(CourseSaga),
    fork(UserSaga),
    fork(UserQuestionSaga),
    fork(TemarySaga),
    fork(VideoSaga),
    fork(CategorySaga),
    fork(QuestionSaga),
    fork(EventSaga),
    fork(TutorialSaga),
    fork(ToolSaga),
  ]);
}