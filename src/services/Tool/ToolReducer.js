import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  tools: [],
  loading: {
    getTool: false,
    tool_start: false
  },
  success: {
    getTool: false,
    tool_start: false
  },
  error: {
    getTool: false,
    tool_start: false
  }
}

const reducer = handleActions({
  TOOL: {

    GET_TOOLS: (state, { payload: { } }) => ({
      ...state,
      loading: { ...state.loading, getTool: true },
      success: { ...state.success, getTool: false },
      error: { ...state.error, getTool: false }
    }),
    SET_TOOLS: {
      next(state, { payload: { tools } }) {
        return {
          ...state,
          tools,
          success: { ...state.success, getTool: true },
          loading: { ...state.loading, getTool: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, getTool: message },
          loading: { ...state.loading, getTool: false }
        }
      }
    },
  }
},
  INITIAL_STATE
);

export default reducer;