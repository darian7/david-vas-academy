import { handleActions } from 'redux-actions';

export const INITIAL_STATE = {
  videosDate: [],
  videoLive: undefined,
  loading: {
    video_start: false,
    getVideosDate: false,
    getVideoLive: false
  },
  success: {
    video_start: false,
    getVideosDate: false,
    getVideoLive: false
  },
  error: {
    video_start: false,
    getVideosDate: false,
    getVideoLive: false
  }
}

const reducer = handleActions({
  VIDEO: {
    VIDEO_START: (state, { payload: { } }) => ({
      ...state,
      loading: { ...state.loading, video_start: true },
      success: { ...state.success, video_start: false },
      error: { ...state.error, video_start: false }
    }),
    VIDEO_START_RESPONSE: {
      next(state, { payload: { } }) {
        return {
          ...state,
          success: { ...state.success, video_start: true },
          loading: { ...state.loading, video_start: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, video_start: message },
          loading: { ...state.loading, video_start: false }
        }
      }
    },

    GET_VIDEOS_CATEGORYS: (state, { payload: { reload } }) => ({
      ...state,
      videosDate: reload ? state.videosDate : [],
      loading: { ...state.loading, getVideosDate: true },
      success: { ...state.success, getVideosDate: false },
      error: { ...state.error, getVideosDate: false }
    }),
    GET_VIDEOS_CATEGORYS_RESPONSE: {
      next(state, { payload: { videosDate } }) {
        return {
          ...state,
          videosDate,
          success: { ...state.success, getVideosDate: true },
          loading: { ...state.loading, getVideosDate: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, getVideosDate: message },
          loading: { ...state.loading, getVideosDate: false }
        }
      }
    },

    VIDEO_EVENT_END: (state, { payload: { videoId } }) => ({
      ...state,
      videosDate: state.videosDate.map((item) => ({ ...item, videos: item?.videos?.map((video) => video.id == videoId ? { ...video, live: false } : video) })),
      loading: { ...state.loading, getVideosDate: true },
      success: { ...state.success, getVideosDate: false },
      error: { ...state.error, getVideosDate: false }
    }),

    GET_VIDEO_LIVE: (state, { payload: { } }) => ({
      ...state,
      loading: { ...state.loading, getVideoLive: true },
      success: { ...state.success, getVideoLive: false },
      error: { ...state.error, getVideoLive: false }
    }),
    GET_VIDEO_LIVE_RESPONSE: {
      next(state, { payload: { videoLive } }) {
        return {
          ...state,
          videoLive,
          success: { ...state.success, getVideoLive: true },
          loading: { ...state.loading, getVideoLive: false }
        }
      },
      throw(state, { error, payload: { message } }) {
        return {
          ...state,
          error: { ...state.error, getVideoLive: message },
          loading: { ...state.loading, getVideoLive: false }
        }
      }
    },
  }
},
  INITIAL_STATE
);

export default reducer;