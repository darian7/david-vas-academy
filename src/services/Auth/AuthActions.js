import { createActions } from 'redux-actions';

export const { auth } = createActions({
  AUTH: {
    LOGIN: (email, password, metadata) => ({ email, password, metadata }),
    LOGIN_RESPONSE: (token) => ({ token }),

    SIGNUP: (data) => ({ data }),
    SIGNUP_RESPONSE: () => ({ }),

    RESET_PASSWORD: (email) => ({ email }),
    RESET_PASSWORD_RESPONSE: (success) => ({ success }),

    CHANGE_PASSWORD: (code) => ({ code }),
    CHANGE_PASSWORD_RESPONSE: (success) => ({ success }),

    NEW_PASSWORD: (code, password) => ({ code, password }),
    NEW_PASSWORD_RESPONSE: (success) => ({ success }),

    LOGOUT: (remove) => ({ remove }),

    IS_LOGGED: () => ({ }),
    SET_LOGGED: (auth) => ({ auth }),

    RESET_ERROR: () => ({})
  }
})