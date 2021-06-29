import { createActions } from 'redux-actions';

export const { event } = createActions({
  EVENT: {

    GET_ALL: () => ({}),
    GET_ALL_RESPONSE: (events) => ({ events }),
  }
})