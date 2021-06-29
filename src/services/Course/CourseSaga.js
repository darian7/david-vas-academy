import { put, takeLatest, all } from 'redux-saga/effects';
import Api from '../../common/Api/Api'
import { course as courseActions } from "./CourseActions"
import { push } from 'react-router-redux';

function* getCourses({ payload }) {
  const response = yield Api.get("/course/get-all", payload.query)

  if (response.ok) {
    yield put(courseActions.getCoursesResponse(response.payload.courses));
  } else {
    const err = new TypeError(response?.payload?.error ? response.payload.error : 'ERROR_GET_COURSES')
    yield put(courseActions.getCoursesResponse(err))
  }
}

function* getCourse({ payload }) {
  const response = yield Api.get(`/course/get-progress-course/${payload.id}`)

  if (response.ok) {
    yield put(courseActions.getCourseResponse(response.payload));
  } else {
    const err = new TypeError(response?.payload?.error ? response.payload.error : 'ERROR_GET_COURSE')
    yield put(courseActions.getCourseResponse(err))
  }
}

function* courseStart({ payload }) {
  const response = yield Api.put(`/course/course-start/${payload?.course?.id}`)

  if (response.ok) {
    yield put(courseActions.courseStartResponse(response.payload));
    yield put(push('/course-progress', { course: payload?.course }));
  } else {
    payload.errorCallback()
    const err = new TypeError(response?.payload?.error || 'ERROR_COURSE_START')
    yield put(courseActions.courseStartResponse(err))
  }
}

function* ActionWatcher() {
  yield takeLatest(courseActions.getCourses, getCourses)
  yield takeLatest(courseActions.getCourse, getCourse)
  yield takeLatest(courseActions.courseStart, courseStart)
}

export default function* rootSaga() {
  yield all([
    ActionWatcher(),
  ]);
}