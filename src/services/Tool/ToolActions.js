import { createActions } from 'redux-actions';

export const { tool } = createActions({
  TOOL: {
    GET_TOOLS: () => ({}),
    SET_TOOLS: (tools) => ({ tools }),
  }
})