import { handleActions } from 'redux-actions';
import { Token } from '../../common/Storage/Token';

export const INITIAL_STATE = {
  authentication: Token.isTokenValid(),
  loading: {
    login: undefined,
  },
  success: {
    login: undefined,
  },
  error: {
    login: undefined,
  }
}

const reducer = handleActions({
  AUTH: {
    LOGIN: (state, { payload: { } }) => ({
      ...state, 
      loading: { ...state.loading, login: true },
      success: { ...state.success, login: false },
      error: { ...state.error, login: false }
    }),
    LOGIN_RESPONSE: {
      next(state, { payload: { token } }) {
        return {
          ...state,
          token, 
          authentication: true,
          success: { ...state.success, login: true },
          loading: { ...state.loading, login: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, login: message },
          loading: { ...state.loading, login: false }
        }
      }
    },

    LOGOUT: (state, { payload: { } }) => ({ ...state, authentication: false }),
  }
},
  INITIAL_STATE
);

export default reducer;