import { createActions } from 'redux-actions';

export const { temary } = createActions({
  TEMARY: {
    GET_TEMARY: (id) => ({ id }),
    GET_TEMARY_RESPONSE: (temarys) => ({ temarys }),

    TEMARY_START: (temary, courseId, errorCallback) => ({ temary, courseId, errorCallback }),
    TEMARY_START_RESPONSE: () => ({ }),
  }
})