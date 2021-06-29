import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  courses: [],
  course: undefined,
  loading: {
    getCourses: false,
    getCourse: false,
    course_start: false
  },
  success: {
    getCourses: false,
    getCourse: false,
    course_start: false
  },
  error: {
    getCourses: false,
    getCourse: false,
    course_start: false
  }
}

const reducer = handleActions({
  COURSE: {
    GET_COURSES: (state, { payload: { } }) => ({
      ...state, 
      loading: { ...state.loading, getCourses: true },
      success: { ...state.success, getCourses: false },
      error: { ...state.error, getCourses: false }
    }),
    GET_COURSES_RESPONSE: {
      next(state, { payload: { courses } }) {
        return {
          ...state,
          courses, 
          success: { ...state.success, getCourses: true },
          loading: { ...state.loading, getCourses: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, getCourses: message },
          loading: { ...state.loading, getCourses: false }
        }
      }
    },

    GET_COURSE: (state, { payload: { } }) => ({
      ...state,
      course: undefined,
      loading: { ...state.loading, getCourse: true },
      success: { ...state.success, getCourse: false },
      error: { ...state.error, getCourse: false }
    }),
    GET_COURSE_RESPONSE: {
      next(state, { payload: { course } }) {
        return {
          ...state,
          course, 
          success: { ...state.success, getCourse: true },
          loading: { ...state.loading, getCourse: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, getCourse: message },
          loading: { ...state.loading, getCourse: false }
        }
      }
    },

    COURSE_START: (state, { payload: { } }) => ({
      ...state,
      loading: { ...state.loading, course_start: true },
      success: { ...state.success, course_start: false },
      error: { ...state.error, course_start: false }
    }),
    COURSE_START_RESPONSE: {
      next(state, { payload: { } }) {
        return {
          ...state,
          success: { ...state.success, course_start: true },
          loading: { ...state.loading, course_start: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, course_start: message },
          loading: { ...state.loading, course_start: false }
        }
      }
    },
  }
},
  INITIAL_STATE
);

export default reducer;