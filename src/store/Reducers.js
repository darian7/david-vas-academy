import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { auth } from '../services/Auth/AuthActions'

import reducerAuth from '../services/Auth/AuthReducer'
import reducerCourse from '../services/Course/CourseReducer'
import reducerUser from '../services/User/UserReducer'
import reducerVideo from '../services/Video/VideoReducer'

const appReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: reducerAuth,
  course: reducerCourse,
  user: reducerUser,
  video: reducerVideo,
})

const rootReducer = (history) => {
  return (state, action) => {
    if (action.type == auth.logout) state = undefined
    return appReducer(history)(state, action);
  }
}
export default rootReducer;