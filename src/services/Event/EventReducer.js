import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  events: [],
  loading: {
    getQuestions: false
  },
  success: {
    getQuestions: false
  },
  error: {
    getQuestions: false
  }
}

const reducer = handleActions({
  EVENT: {
    GET_ALL: (state, { payload: { } }) => ({
      ...state,
      events: [],
      loading: { ...state.loading, getQuestions: true },
      success: { ...state.success, getQuestions: false },
      error: { ...state.error, getQuestions: false }
    }),
    GET_ALL_RESPONSE: {
      next(state, { payload: { events } }) {
        return {
          ...state,
          events,
          success: { ...state.success, getQuestions: true },
          loading: { ...state.loading, getQuestions: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, getQuestions: message },
          loading: { ...state.loading, getQuestions: false }
        }
      }
    },
  }
},
  INITIAL_STATE
);

export default reducer;