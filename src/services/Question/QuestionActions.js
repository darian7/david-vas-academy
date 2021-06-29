import { createActions } from 'redux-actions';

export const { question } = createActions({
  QUESTION: {

    GET_QUESTIONS: () => ({ }),
    GET_QUESTIONS_RESPONSE: (themes) => ({ themes }),
  }
})