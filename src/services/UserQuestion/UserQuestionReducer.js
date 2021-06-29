import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  userQuestion: undefined,
  loading: {
    createQuestionUser: false,
    deleteQuestionUser: false,
  },
  success: {
    createQuestionUser: false,
    deleteQuestionUser: false,
  },
  error: {
    createQuestionUser: false,
    deleteQuestionUser: false,
  }
}

const reducer = handleActions({
  USER_QUESTION: {
    CREATE_USER_QUESTION: (state, { payload: { } }) => ({
      ...state, 
      loading: { ...state.loading, createQuestionUser: true },
      success: { ...state.success, createQuestionUser: false },
      error: { ...state.error, createQuestionUser: false }
    }),
    CREATE_USER_QUESTION_RESPONSE: {
      next(state, { payload: { userQuestion } }) {
        return {
          ...state,
          userQuestion,
          success: { ...state.success, createQuestionUser: true },
          loading: { ...state.loading, createQuestionUser: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, createQuestionUser: message },
          loading: { ...state.loading, createQuestionUser: false }
        }
      }
    },

    DELETE_USER_QUESTION: (state, { payload: { } }) => ({
      ...state, 
      loading: { ...state.loading, deleteQuestionUser: true },
      success: { ...state.success, deleteQuestionUser: false },
      error: { ...state.error, deleteQuestionUser: false }
    }),
    DELETE_USER_QUESTION_RESPONSE: {
      next(state, { payload: { } }) {
        return {
          ...state,
          success: { ...state.success, deleteQuestionUser: true },
          loading: { ...state.loading, deleteQuestionUser: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, deleteQuestionUser: message },
          loading: { ...state.loading, deleteQuestionUser: false }
        }
      }
    },

    DELETE_USER_QUESTION_MODULE: (state, { payload: { } }) => ({
      ...state, 
      loading: { ...state.loading, deleteQuestionUser: true },
      success: { ...state.success, deleteQuestionUser: false },
      error: { ...state.error, deleteQuestionUser: false }
    }),
    DELETE_USER_QUESTION_MODULE_RESPONSE: {
      next(state, { payload: { } }) {
        return {
          ...state,
          success: { ...state.success, deleteQuestionUser: true },
          loading: { ...state.loading, deleteQuestionUser: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, deleteQuestionUser: message },
          loading: { ...state.loading, deleteQuestionUser: false }
        }
      }
    },
  }
},
  INITIAL_STATE
);

export default reducer;