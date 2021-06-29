import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  categorys: [],
  loading: {
    getCategorys: false
  },
  success: {
    getCategorys: false
  },
  error: {
    getCategorys: false
  }
}

const reducer = handleActions({
  CATEGORY: {
    GET_CATEGORYS: (state, { payload: {  } }) => ({
      ...state,
      loading: { ...state.loading, getCategorys: true },
      success: { ...state.success, getCategorys: false },
      error: { ...state.error, getCategorys: false }
    }),
    GET_CATEGORYS_RESPONSE: {
      next(state, { payload: { categorys } }) {
        return {
          ...state,
          categorys,
          success: { ...state.success, getCategorys: true },
          loading: { ...state.loading, getCategorys: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, getCategorys: message },
          loading: { ...state.loading, getCategorys: false }
        }
      }
    },
  }
},
  INITIAL_STATE
);

export default reducer;