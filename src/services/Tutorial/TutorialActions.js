import { createActions } from 'redux-actions';

export const { tutorial } = createActions({
  TUTORIAL: {
    GET_TUTORIALS: () => ({}),
    SET_TUTORIALS: (tutorials) => ({ tutorials }),
  }
})