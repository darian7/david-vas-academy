import { createActions } from 'redux-actions';

export const { video } = createActions({
  VIDEO: {
    VIDEO_START: (video, courseId, callback, lesson) => ({ video, courseId, callback, lesson }),
    VIDEO_START_RESPONSE: () => ({}),

    GET_VIDEOS_CATEGORYS: (categoryId, reload) => ({ categoryId, reload }),
    GET_VIDEOS_CATEGORYS_RESPONSE: (videosDate) => ({ videosDate }),

    VIDEO_EVENT_END: (videoId) => ({ videoId }),

    GET_VIDEO_LIVE: () => ({}),
    GET_VIDEO_LIVE_RESPONSE: (videoLive) => ({ videoLive }),
  }
})