import { createActions } from 'redux-actions';

export const { userQuestion } = createActions({
  USER_QUESTION: {
    CREATE_USER_QUESTION: (userQuestion, succesCallback, callback) => ({ userQuestion, succesCallback, callback }),
    CREATE_USER_QUESTION_RESPONSE: (userQuestion) => ({ userQuestion }),

    DELETE_USER_QUESTION: (lessonId, courseId ,succesCallback, tryAgainLesson) => ({ lessonId, courseId, succesCallback, tryAgainLesson }),
    DELETE_USER_QUESTION_RESPONSE: () => ({ }),

    DELETE_USER_QUESTION_MODULE: (moduleId, courseId ,succesCallback, tryAgainLesson) => ({ moduleId, courseId, succesCallback, tryAgainLesson }),
    DELETE_USER_QUESTION_MODULE_RESPONSE: () => ({ }),
  }
})