import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import { auth } from '../services/Auth/AuthActions'

import reducerAuth from '../services/Auth/AuthReducer'
import reducerCourse from '../services/Course/CourseReducer'
import reducerUser from '../services/User/UserReducer'
import reducerUserQuestion from '../services/UserQuestion/UserQuestionReducer'
import reducerTemary from '../services/Temary/TemaryReducer'
import reducerVideo from '../services/Video/VideoReducer'
import reducerCategory from '../services/Category/CategoryReducer'
import reducerQuestion from '../services/Question/QuestionReducer'
import reducerEvent from '../services/Event/EventReducer'
import reducerTutorial from '../services/Tutorial/TutorialReducer'
import toolReducer from '../services/Tool/ToolReducer'

const appReducer = (history) => combineReducers({
  router: connectRouter(history),
  auth: reducerAuth,
  course: reducerCourse,
  user: reducerUser,
  userQuestion: reducerUserQuestion,
  temary: reducerTemary,
  video: reducerVideo,
  category: reducerCategory,
  question: reducerQuestion,
  event: reducerEvent,
  tutorial: reducerTutorial,
  tool: toolReducer,
})

const rootReducer = (history) => {
  return (state, action) => {
    if (action.type == auth.logout) state = undefined
    return appReducer(history)(state, action);
  }
}
export default rootReducer;