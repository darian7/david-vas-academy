import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as Check } from '../../../../../assets/icons/tick.svg';
import { ReactComponent as Wrong } from '../../../../../assets/icons/close.svg';
import i18n from '../../../../../i18n/i18n';
import alphabet from '../../../../../common/constants/alphabet'
import { userQuestion as userQuestionActions } from '../../../../../services/UserQuestion/UserQuestionActions';
import SpinIndicator from '../../../../../components/SpinIndicator/SpinIndicator';

export const Quiz = ({
  isQuestion,
  viewQuiz,
  isLesson,
  setQuestion,
  nextLesson,
  courseId,
  isModule,
  nextModule,
  finishCourse,
  startQuestionsModule,
  isQuestionOfModule,
  succesResumen,
  answerCorrect,
  answerError,
  setTryAgainLesson,
  isTryAgainLesson,
  isResumen,
  setResumen
}) => {

  const dispatch = useDispatch()
  const [isAnswer, setAnswer] = useState(undefined);
  const [isCorrect, setCorrect] = useState(undefined);
  const [isViewStatus, setViewStatus] = useState(false);
  const { loading, success, userQuestion } = useSelector(state => state.userQuestion)
  const { temarys } = useSelector(state => state.temary)
  const { t } = useTranslation()

  useEffect(() => {
    let answer = isQuestion?.answers?.find((answer) => answer?.userQuestions?.length > 0)
    setAnswer(answer)
    setCorrect(answer?.correct)

    if (answer) setViewStatus(true)
    else setViewStatus(false)

  }, [isQuestion])

  const handleQuestSelected = (key) => {
    if (isAnswer?.id === key)
      return 'question-active'
  }

  const calificateAnswer = () => {
    let isQuestionFinish = !isQuestionOfModule
      ? isLesson?.questions[isLesson?.questions?.length - 1]
      : isModule?.questions[isModule?.questions?.length - 1]

    let objectQuestion = {
      type: !isQuestionOfModule ? 'lesson' : 'temary',
      try: isQuestion?.id == isQuestionFinish?.id,
      id: !isQuestionOfModule ? isLesson?.id : isModule?.id
    }

    if (isAnswer && !loading.createQuestionUser)
      dispatch(userQuestionActions.createUserQuestion(
        {
          answerId: isAnswer?.id,
          questionId: isQuestion?.id,
          courseId, objectQuestion
        },
        setViewStatus,
        succesResumen
      ))
  }

  const nextQuestion = () => {
    if (!isQuestionOfModule)
      setQuestion(isLesson?.questions?.find((question) => question?.order == (parseInt(isQuestion.order) + 1)))
    else
      setQuestion(isModule?.questions?.find((question) => question?.order == (parseInt(isQuestion.order) + 1)))
  }

  const selectAnswer = (answer) => {
    setAnswer(answer)
    setViewStatus(false)
    setCorrect(false)
  }

  const viewLesson = (tryAgain) => {
    setTryAgainLesson(tryAgain)

    if (loading.deleteQuestionUser)
      return

    if (!isQuestionOfModule)
      dispatch(userQuestionActions.deleteUserQuestion(isLesson?.id, courseId, succesDeleteAwnserByLesson, tryAgain))
    else
      dispatch(userQuestionActions.deleteUserQuestionModule(isModule?.id, courseId, succesDeleteAwnserByLesson, tryAgain))
  }

  const succesDeleteAwnserByLesson = (tryAgainLesson) => {
    setResumen(false)

    if (isQuestionOfModule)
      setQuestion(isModule?.questions[0])

    if (!isQuestionOfModule && tryAgainLesson)
      setQuestion(isLesson?.questions[0])

    if (!tryAgainLesson) {
      setQuestion(undefined)
      viewQuiz(false)
    }
  }

  const conditionNextLesson = () =>
    isLesson?.progress == 100 &&
    isLesson?.order < isModule?.lessons?.length

  const conditionNextModule = () =>
    isModule?.progress == 100
    && isModule?.order < temarys?.length
    && (isModule?.questions?.length > 0 ? !isLesson : isLesson && isLesson?.order == isModule?.lessons?.length)

  const conditionNextCourse = () =>
    isModule?.progress == 100
    && isModule?.order == temarys?.length
    && (isModule?.questions?.length > 0 ? !isLesson : isLesson && isLesson?.order == isModule?.lessons?.length)

  const conditionIsQuestionModule = () =>
    !isQuestionOfModule
    && isResumen
    && isModule?.questions?.length > 0
    && isLesson?.order == isModule?.lessons?.length

  const conditionNextQuestion = () =>
    isQuestion?.userQuestions?.length > 0
    && isQuestion?.order < (!isQuestionOfModule ? isLesson?.questions?.length : isModule?.questions?.length)

  const conditionTryAgainLesson = () =>
    isResumen
    && (isQuestion?.order == (!isQuestionOfModule ? isLesson?.questions?.length : isModule?.questions?.length))
    && answerCorrect?.length < (!isQuestionOfModule ? isLesson?.questions?.length : isModule?.questions?.length)

  const conditionViewLesson = () =>
    isResumen
    && !isQuestionOfModule
    && isQuestion?.order == isLesson?.questions?.length
    && answerCorrect?.length < (!isQuestionOfModule ? isLesson?.questions?.length : isModule?.questions?.length)

  return (
    <div className="quiz">
      <div className="quiz-card">
        {!isResumen ?
          <>
            {isQuestionOfModule && <h1>{t('scenes.quiz.quiz_module')}</h1>}
            <p>{isQuestion?.order}. {isQuestion?.description[i18n.language]}</p>
            {isQuestion?.answers?.map((answer, index) =>
              <button
                key={index}
                onClick={() => !isQuestion?.answers?.find((answer) => answer?.userQuestions?.length > 0) && selectAnswer(answer)}
                className={handleQuestSelected(answer.id)}
              >
                <span>{alphabet[index]}.</span> {answer?.description[i18n.language]}
              </button>
            )}
          </>
          :
          <div className="quiz-card-resume">
            <div>
              {answerCorrect?.length == (answerError?.length + answerCorrect?.length) ?
                <>
                  <Check className="check" />
                  {!isQuestionOfModule ? <p>{t('scenes.quiz.quiz_correct')}</p> :
                    <p>{t('scenes.quiz.quiz_final_correct')}</p>}
                </>
                :
                <>
                  <Wrong />
                  {!isQuestionOfModule ? <p>{t('scenes.quiz.quiz_wrong')}</p> :
                    <p>{t('scenes.quiz.quiz_final_wrong')}</p>}
                </>
              }
              <p className="quiz-score">{answerCorrect?.length} / {answerError?.length + answerCorrect?.length}</p>
            </div>
          </div>
        }
        <div className={`quiz-card-result ${(!isResumen && isViewStatus) ? 'flex-column' : ''} `}>
          {!isResumen && isQuestion?.userQuestions?.length == 0 &&
            <a type="button" onClick={calificateAnswer} className={!isAnswer ? 'is-disabled' : ''}>
              {loading.createQuestionUser && <SpinIndicator />}
              {t('scenes.modules.confirm')}
            </a>
          }

          {!isResumen && isViewStatus && (
            isCorrect ? <p><Check className="check" /> {t('scenes.modules.correct')}</p>
              : <p><Wrong /> {t('scenes.modules.wrong')} </p>
          )}

          {conditionNextQuestion() &&
            <a type="button" onClick={nextQuestion}>
              {t('scenes.quiz.next')}
            </a>
          }

          {conditionNextLesson() &&
            <a type="button" onClick={nextLesson}>
              {t('scenes.quiz.next_lesson')}
            </a>
          }

          {conditionViewLesson() &&
            <a type="button" onClick={() => viewLesson(false)}>
              {loading.deleteQuestionUser && !isTryAgainLesson && <SpinIndicator />}
              {t('scenes.quiz.view_lesson')}
            </a>}

          {conditionTryAgainLesson() &&
            <a type="button" onClick={() => viewLesson(true)}>
              {loading.deleteQuestionUser && isTryAgainLesson && <SpinIndicator />}
              {t('scenes.quiz.try_again')}
            </a>}

          {conditionIsQuestionModule() &&
            <a type="button" onClick={() => startQuestionsModule()}>{t('scenes.quiz.quiz_module')}
            </a>
          }

          {conditionNextModule() &&
            <a type="button" onClick={nextModule}>
              {t('scenes.quiz.next_module')}
            </a>
          }

          {conditionNextCourse() &&
            <a type="button" onClick={finishCourse}>
              {t('scenes.quiz.next_course')}
            </a>
          }
        </div>
      </div>
    </div>
  )
}