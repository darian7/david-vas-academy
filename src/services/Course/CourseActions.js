import { createActions } from 'redux-actions';

export const { course } = createActions({
  COURSE: {
    GET_COURSES: (query) => ({ query }),
    GET_COURSES_RESPONSE: (courses) => ({ courses }),

    GET_COURSE: (id) => ({ id }),
    GET_COURSE_RESPONSE: (course) => ({ course }),

    COURSE_START: (course, callback) => ({ course, callback }),
    COURSE_START_RESPONSE: (courseId, user) => ({ courseId, user }),
  }
})