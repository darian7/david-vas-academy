import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  tutorials: [],
  loading: {
    getTutorial: false,
    tutorial_start: false
  },
  success: {
    getTutorial: false,
    tutorial_start: false
  },
  error: {
    getTutorial: false,
    tutorial_start: false
  }
}

const reducer = handleActions({
  TUTORIAL: {

    GET_TUTORIALS: (state, { payload: { } }) => ({
      ...state,
      tutorials: [],
      loading: { ...state.loading, getTutorial: true },
      success: { ...state.success, getTutorial: false },
      error: { ...state.error, getTutorial: false }
    }),
    SET_TUTORIALS: {
      next(state, { payload: { tutorials } }) {
        return {
          ...state,
          tutorials,
          success: { ...state.success, getTutorial: true },
          loading: { ...state.loading, getTutorial: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, getTutorial: message },
          loading: { ...state.loading, getTutorial: false }
        }
      }
    },
  }
},
  INITIAL_STATE
);

export default reducer;