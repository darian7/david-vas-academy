import { put, takeLatest, all, select } from 'redux-saga/effects';
import Api from '../../common/Api/Api'
import { course as courseActions } from "./CourseActions"

function* getCourses({ payload }) {
  const response = yield Api.get("/course/get-all", payload.query, undefined)

  if (response.ok) {
    yield put(courseActions.getCoursesResponse(response.payload.courses));
  } else {
    const err = new TypeError(response?.payload?.error ? response.payload.error : 'ERROR_GET_COURSES')
    yield put(courseActions.getCoursesResponse(err))
  }
}

function* getCourse({ payload }) {
  const response = yield Api.get(`/course/get-progress-course/${payload.id}`, undefined, undefined)

  if (response.ok) {

    let responseTem = []
    yield Promise.all(response?.payload?.lessons?.map(async (lesson, index) => {

      if (lesson?.video?.urlVimeo) {

        const responseVimeo = await fetch(
          `https://player.vimeo.com/video/${lesson?.video?.urlVimeo?.replace("https://vimeo.com/", "")}/config`
        )

        const data = await responseVimeo.json()
        let urlVimeo = data?.request?.files?.hls?.cdns?.akfire_interconnect_quic?.url

        responseTem[index] = {
          ...lesson,
          video: {
            ...lesson?.video,
            url: urlVimeo || lesson?.video?.urlVimeo
          }
        }
      } else {
        responseTem[index] = {
          ...lesson,
          video: {
            ...lesson?.video,
            url: lesson?.video?.urlVimeo
          }
        }
      }
    }))

    yield put(courseActions.getCourseResponse({ ...response.payload, lessons: responseTem }));
  } else {
    const err = new TypeError(response?.payload?.error ? response.payload.error : 'ERROR_GET_COURSE')
    yield put(courseActions.getCourseResponse(err))
  }
}

function* courseStart({ payload }) {
  const response = yield Api.put(`/course/course-start/${payload?.course?.id}`, undefined, undefined)

  if (response.ok) {

    const profile = yield select((state) => state.user.profile)
    yield put(courseActions.courseStartResponse(payload?.course?.id, profile))

    payload.callback && payload.callback()

  } else {
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