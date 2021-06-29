import { createActions } from 'redux-actions';

export const { course } = createActions({
  COURSE: {
    GET_COURSES: (query) => ({ query }),
    GET_COURSES_RESPONSE: (courses) => ({ courses }),

    GET_COURSE: (id) => ({ id }),
    GET_COURSE_RESPONSE: (course) => ({ course }),

    COURSE_START: (course, errorCallback) => ({ course, errorCallback }),
    COURSE_START_RESPONSE: () => ({ }),
  }
})