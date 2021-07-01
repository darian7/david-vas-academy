import { handleActions } from 'redux-actions';

import { Token } from '../../common/Storage/Token';

export const INITIAL_STATE = {
  authentication: Token.isTokenValid(),
  subscrition: undefined,
  loading: false,
  error: {
    login: undefined,
    signup: undefined,
    ResetPassword: undefined,
    changePassword: undefined,
    newPassword: undefined
  },
  success: {
    ResetPassword: undefined,
    changePassword: undefined,
    newPassword: undefined
  }
}

const reducer = handleActions({
  AUTH: {
    LOGIN: (state, { payload: { } }) => ({
      ...state, loading: true, error: { ...state.error, login: false }
    }),
    LOGIN_RESPONSE: {
      next(state, { payload: { token, subscrition } }) {
        return { ...state, token, authentication: true, loading: false, subscrition }
      },
      throw(state, { payload: { message } }) {
        return { ...state, error: { ...state.error, login: message }, loading: false }
      }
    },

    SIGNUP: (state, { payload: { } }) => ({
      ...state, loading: true, error: { ...state.error, signup: false }
    }),
    SIGNUP_RESPONSE: {
      next(state, { payload: { } }) {
        return { ...state, authentication: true, loading: false }
      },
      throw(state, { payload: { message } }) {
        return { ...state, error: { ...state.error, signup: message }, loading: false }
      }
    },

    RESET_PASSWORD: (state, { payload: { } }) => ({
      ...state, loading: true, success: { ...state.success, ResetPassword: false }, error: { ...state.error, ResetPassword: false }
    }),
    RESET_PASSWORD_RESPONSE: {
      next(state, { payload: { } }) {
        return { ...state, success: { ...state.success, ResetPassword: true }, loading: false }
      },
      throw(state, { payload: { message } }) {
        return { ...state, loading: false, error: { ...state.error, ResetPassword: message } }
      }
    },

    CHANGE_PASSWORD: (state, { payload: { } }) => ({
      ...state, loading: true, success: { ...state.success, changePassword: false }, error: { ...state.error, changePassword: false }
    }),
    CHANGE_PASSWORD_RESPONSE: {
      next(state, { payload: { } }) {
        return { ...state, loading: false, success: { ...state.success, changePassword: true } }
      },
      throw(state, { payload: { message } }) {
        return { ...state, loading: false, error: { ...state.error, changePassword: message } }
      }
    },

    NEW_PASSWORD: (state, { payload: { } }) => ({
      ...state, loading: true, success: { ...state.success, newPassword: false }, error: { ...state.error, newPassword: false }
    }),
    NEW_PASSWORD_RESPONSE: {
      next(state, { payload: { } }) {
        return { ...state, loading: false, success: { ...state.success, newPassword: true } }
      },
      throw(state, { payload: { message } }) {
        return { ...state, loading: false, error: { ...state.error, newPassword: message } }
      }
    },

    LOGOUT: (state, { payload: { } }) => ({ ...state, authentication: false }),

    SET_LOGGED: (state, { payload: { auth } }) => ({ ...state, authentication: auth ? auth : false }),

    RESET_ERROR: (state, { payload: { } }) => ({
      ...state,
      error: {
        login: undefined,
        signup: undefined,
        ResetPassword: undefined,
        changePassword: undefined,
        newPassword: undefined
      }
    })

  }
},
  INITIAL_STATE
);

export default reducer;