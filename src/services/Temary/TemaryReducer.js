import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  temarys: [],
  loading: {
    getTemary: false,
    temary_start: false
  },
  success: {
    getTemary: false,
    temary_start: false
  },
  error: {
    getTemary: false,
    temary_start: false
  }
}

const reducer = handleActions({
  TEMARY: {

    GET_TEMARY: (state, { payload: { } }) => ({
      ...state,
      temarys: [],
      loading: { ...state.loading, getTemary: true },
      success: { ...state.success, getTemary: false },
      error: { ...state.error, getTemary: false }
    }),
    GET_TEMARY_RESPONSE: {
      next(state, { payload: { temarys } }) {
        return {
          ...state,
          temarys, 
          success: { ...state.success, getTemary: true },
          loading: { ...state.loading, getTemary: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, getTemary: message },
          loading: { ...state.loading, getTemary: false }
        }
      }
    },

    TEMARY_START: (state, { payload: { } }) => ({
      ...state,
      loading: { ...state.loading, temary_start: true },
      success: { ...state.success, temary_start: false },
      error: { ...state.error, temary_start: false }
    }),
    TEMARY_START_RESPONSE: {
      next(state, { payload: { } }) {
        return {
          ...state,
          success: { ...state.success, temary_start: true },
          loading: { ...state.loading, temary_start: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, temary_start: message },
          loading: { ...state.loading, temary_start: false }
        }
      }
    },
  }
},
  INITIAL_STATE
);

export default reducer;