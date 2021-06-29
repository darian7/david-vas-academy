import { createActions } from 'redux-actions';

export const { category } = createActions({
  CATEGORY: {
    GET_CATEGORYS: () => ({ }),
    GET_CATEGORYS_RESPONSE: (categorys) => ({ categorys }),
  }
})