import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { LessonItemCard } from '../components/Cards/LessonItemCard/LessonItemCard';
import { ProfileModule } from './components/ProfileModule/ProfileModule';
import { ProfileLesson } from './components/ProfileLesson/ProfileLesson';
import { Quiz } from './components/Quiz/Quiz';
import i18n from '../../../i18n/i18n';
import { temary as temaryActions } from '../../../services/Temary/TemaryActions';
import { Modal } from '../components/Modals/Modal';
import { Files } from '../components/Files/Files';
import { ReactComponent as NextIcon } from '../../../assets/icons/next.svg';
import { ModuleSkeleton } from '../components/SkeletonScreens/ModuleSkeleton/ModuleSkeleton';

export const Module = ({ location, history }) => {

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { loading, temarys } = useSelector(state => state.temary)

  const [isModule, setModule] = useState(undefined)
  const [isLesson, setLesson] = useState()
  const [isQuestion, setQuestion] = useState()

  const [isVisibleProfileModule, setVisibleProfileModule] = useState(false)
  const [isVisibleProfileLesson, setVisibleProfileLesson] = useState(false)
  const [isVisibleQuiz, setVisibleQuiz] = useState(false)
  const [isVideoView, setVideoView] = useState(false);
  const [isQuestionOfModule, setQuestionOfModule] = useState(false);
  const [isTryAgainLesson, setTryAgainLesson] = useState(false);
  const [isResumen, setResumen] = useState(false);
  const [openModal, toggleModal] = useState(false)

  const [isModulesResponsiveHidden, setModulesResponsiveHidden] = useState(true);
  const [answerCorrect, setAnswerCorrect] = useState([]);
  const [answerError, setAnswerError] = useState([])
  const [isReadyVideo, setReadyVideo] = useState(false)

  useEffect(() => {
    if (location?.state?.course?.id)
      dispatch(temaryActions.getTemary(location?.state?.course?.id))

    return () =>
      dispatch(temaryActions.getTemaryResponse([]))

  }, [])

  useEffect(() => {
    if (!location?.state?.moduleId)
      setModuleByProgress()
    else {
      let temary = temarys?.find((temary) => temary.id == location?.state?.moduleId)
      if (temary?.questions[0]?.userQuestions?.length > 0 && countAnswerSummary(temary.lessons[temary.lessons.length - 1].questions)?.answerCorrect?.length == temary.lessons[temary.lessons.length - 1].questions.length) {
        setQuestionOfModule(true)
      }
      setModule(temary)
    }

  }, [temarys])

  useEffect(() => {
    if (isModule?.questions[0]?.userQuestions?.length > 0 && countAnswerSummary(isModule.questions)?.answerCorrect?.length < isModule.questions.length)
      setQuestionOfModule(true)

    if (!isModule)
      return

    if (!isQuestionOfModule)
      setLessonProgress()
    else
      startQuestionsModule()

  }, [isModule])

  useEffect(() => {
    setQuizProgress()
  }, [isLesson])

  useEffect(() => {
    if (isQuestion)
      viewQuiz(true)
    else
      viewQuiz(false)

    if (!isQuestionOfModule)
      succesResumen(null)

    if (isQuestionOfModule)
      succesResumen(null)

  }, [isQuestion])

  useEffect(() => {
    if (isModule?.users?.length == 0)
      setVisibleProfileModule(true)
    else
      setVisibleProfileModule(false)

  }, [isModule?.users?.length])

  const viewQuiz = (view) => {
    setVisibleQuiz(view)
    setVisibleProfileLesson(!view)
  }

  const nextLesson = () => {
    setReadyVideo(false)
    setLesson({ ...isModule?.lessons?.find((lesson) => lesson?.order == (parseInt(isLesson.order) + 1)), temary: { id: isModule?.id } })
    setQuestion(undefined)
    setVideoView(false)
    setResumen(false)
  }

  const nextModule = () => history.push('/course-progress', { course: location?.state?.course })

  const finishCourse = () => history.push('/courses')

  const startQuestionsLessons = () => {
    setQuestionOfModule(false)
    return setQuiz(isLesson?.questions)
  }

  const startQuestionsModule = () => {
    setLesson(undefined)
    setResumen(false)
    setQuestionOfModule(true)
    if (setQuiz(isModule?.questions))
      setQuiz(isModule?.questions)
    else
      setQuestion(isModule?.questions[0])

    viewQuiz(true)
  }

  const setQuiz = (questions = []) => {
    let arrayQuestion, questionExist
    if (questions)
      arrayQuestion = questions?.map((question) => {
        if (isQuestion?.id == question?.id) {
          questionExist = question
          setQuestion(question)
        } else if (question?.userQuestions?.length > 0) {
          questionExist = question
          setQuestion(question)
        }
      })

    return questionExist
  }

  const setModuleByProgress = () => {
    setModule(temarys?.find((module) => {
      if (isModule?.id == module?.id) {
        return module
      } else if (module?.questions[0]?.userQuestions?.length > 0 && countAnswerSummary(module.questions)?.answerCorrect?.length < module.questions.length) {
        setQuestionOfModule(true)
        return module
      } else if (module.progress == 100 && countAnswerSummary(module?.lessons[module.lessons.length - 1]?.questions)?.answerCorrect?.length < module?.lessons[module.lessons.length - 1]?.questions.length) {
        return module
      } else if (module.progress < 100) {
        return module
      } else if (temarys[temarys.length - 1]?.id == module.id) {
        return module
      }
    }))
  }

  const setLessonProgress = () => {
    setLesson(isModule?.lessons?.find((lesson) => {
      if (isLesson?.id == lesson?.id) {
        return lesson
      } else if (lesson.progress < 100 || (lesson.progress == 100 && countAnswerSummary(lesson.questions)?.answerCorrect?.length < lesson.questions.length)) {
        return lesson
      } else if (isModule?.lessons[isModule?.lessons?.length - 1]?.id == lesson.id) {
        return lesson
      }
    }))
  }

  const setQuizProgress = () => {
    let arrayQuestion = isLesson?.questions?.map((question) => {
      if (isQuestion?.id == question?.id) {
        setQuestion(question)
      } else if (question?.userQuestions?.length > 0) {
        setQuestion(question)
      } else if (isTryAgainLesson) {
        setTryAgainLesson(false)
        setQuestion(isLesson?.questions[0])
      }
    })
  }

  const succesResumen = (time) => {
    if (isQuestion?.userQuestions?.length > 0 && isQuestion?.order == (!isQuestionOfModule ? isLesson?.questions?.length : isModule?.questions?.length)) {
      setResumen(true)
      if (!isQuestionOfModule)
        answerSuccesLesson()
      else
        answerSuccesModule()
    }
  }

  let answerSuccesLesson = () => {
    const { answerCorrect, answerError } = countAnswerSummary(isLesson?.questions)
    setAnswerCorrect(answerCorrect)
    setAnswerError(answerError)
  }

  let answerSuccesModule = () => {
    const { answerCorrect, answerError } = countAnswerSummary(isModule?.questions)
    setAnswerCorrect(answerCorrect)
    setAnswerError(answerError)
  }

  const countAnswerSummary = (questions) => {
    let answerCorrect = [], answerError = []

    let test = questions?.map((question) => {
      let answer = question?.answers?.find((answer) => answer?.correct)
      if (question?.userQuestions[0]?.answer?.id == answer?.id)
        answerCorrect = [...answerCorrect, question]
      else
        answerError = [...answerError, question]
    })

    return { answerCorrect, answerError }
  }

  return (
    <div className="module">
      {openModal && <Modal visible={openModal} modal={<Files files={isLesson?.files} />} hideModal={toggleModal} />}
      {!isModule ?
        <ModuleSkeleton />
        :
        <div className="module-container">
          <div className="module-header">
            <h2>{isModule?.course?.title[i18n.language]}</h2>
            <p>{t('scenes.modules.modules')} {isModule?.order}/{temarys?.length}</p>
          </div>
          <div className="module-content">
            <div className={`module-list module-list-${!isModulesResponsiveHidden ? 'open' : ''}`}>
              <div className="module-list-header">
                <p>{t('scenes.modules.lessons')}</p>
                <div>
                  <p>{isLesson?.order || isModule?.lessons?.length}/{isModule?.lessons?.length}</p>
                  <NextIcon onClick={() => setModulesResponsiveHidden(!isModulesResponsiveHidden)} />
                </div>
              </div>
              <div className="module-list-items">
                <p>{t('scenes.modules.theme_summary')}</p>
                {isModule?.lessons?.map((item, i) =>
                  <LessonItemCard
                    key={i}
                    data={{ key: i + 1, text: item?.title[i18n.language], time: item?.video?.duration || 0 }}
                    lesson={item}
                    setLesson={setLesson}
                    setQuestionOfModule={setQuestionOfModule}
                    setResumen={setResumen}
                    isModule={isModule}
                    index={i}
                    setQuestion={setQuestion}
                    isLesson={isLesson}
                    setReadyVideo={setReadyVideo}
                  />)}
              </div>
            </div>
            <div className="module-item">
              {isVisibleProfileModule && <ProfileModule module={isModule} />}
              {!isVisibleProfileModule && isLesson && isVisibleProfileLesson &&
                <ProfileLesson
                  isLesson={isLesson}
                  viewQuiz={viewQuiz}
                  setQuestion={setQuestion}
                  isVideoView={isVideoView}
                  setVideoView={setVideoView}
                  isModule={isModule}
                  isQuestionOfModule={isQuestionOfModule}
                  startQuestionsLessons={startQuestionsLessons}
                  toggleModal={toggleModal}
                  nextLesson={nextLesson}
                  nextModule={nextModule}
                  finishCourse={finishCourse}
                  startQuestionsModule={startQuestionsModule}
                  isReadyVideo={isReadyVideo}
                  setReadyVideo={setReadyVideo}
                />}

              {!isVisibleProfileModule && isQuestion && isVisibleQuiz &&
                <Quiz
                  isQuestion={isQuestion}
                  viewQuiz={viewQuiz}
                  isLesson={isLesson}
                  setQuestion={setQuestion}
                  nextLesson={nextLesson}
                  courseId={location?.state?.course?.id}
                  isModule={isModule}
                  nextModule={nextModule}
                  finishCourse={finishCourse}
                  startQuestionsModule={startQuestionsModule}
                  isQuestionOfModule={isQuestionOfModule}
                  succesResumen={succesResumen}
                  answerCorrect={answerCorrect}
                  answerError={answerError}
                  setTryAgainLesson={setTryAgainLesson}
                  isTryAgainLesson={isTryAgainLesson}
                  isResumen={isResumen}
                  setResumen={setResumen}
                />}
            </div>
          </div>
        </div>
      }
    </div>
  )
}