import { createActions } from 'redux-actions';

export const { user } = createActions({
  USER: {
    GET_USER: () => ({ }),
    GET_USER_RESPONSE: (user) => ({ user }),
  }
})