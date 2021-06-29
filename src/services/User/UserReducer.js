import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  user: undefined,
  loading: {
    getUser: false,
  },
  success: {
    getUser: false,
  },
  error: {
    getUser: false,
  }
}

const reducer = handleActions({
  USER: {
    GET_USER: (state, { payload: { } }) => ({
      ...state, 
      loading: { ...state.loading, getUser: true },
      success: { ...state.success, getUser: false },
      error: { ...state.error, getUser: false }
    }),
    GET_USER_RESPONSE: {
      next(state, { payload: { user } }) {
        return {
          ...state,
          user, 
          success: { ...state.success, getUser: true },
          loading: { ...state.loading, getUser: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, getUser: message },
          loading: { ...state.loading, getUser: false }
        }
      }
    }
  }
},
  INITIAL_STATE
);

export default reducer;