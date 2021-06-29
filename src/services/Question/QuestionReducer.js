import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  themes: [],
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
  QUESTION: {
    GET_QUESTIONS: (state, { payload: { } }) => ({
      ...state,
      themes: [],
      loading: { ...state.loading, getQuestions: true },
      success: { ...state.success, getQuestions: false },
      error: { ...state.error, getQuestions: false }
    }),
    GET_QUESTIONS_RESPONSE: {
      next(state, { payload: { themes } }) {
        return {
          ...state,
          themes,
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