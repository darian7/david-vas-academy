import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ReactComponent as PlayBtn } from '../../../../../assets/icons/play-button.svg';
import { ReactComponent as Check } from '../../../../../assets/icons/tick.svg';
import { secondsToString } from '../../../../../common/utilities/secondsToString';

export const LessonItemCard = ({
  data,
  lesson,
  setLesson,
  setQuestionOfModule,
  setResumen,
  isModule,
  index,
  setQuestion,
  isLesson,
  setReadyVideo
}) => {

  const { t } = useTranslation()

  const startLesson = () => {

    let lessonPrevious = isModule?.lessons[index - 1]

    if (lesson?.id == isLesson?.id)
      return

    if (lesson?.order !== "1" && lessonPrevious?.progress < 100)
      return

    setReadyVideo(false)

    setQuestion(undefined)
    setLesson(lesson)
    setQuestionOfModule(false)

    if (lesson?.progress == 100)
      setResumen(true)
    else
      setResumen(false)
  }

  const getItemStateClass = () => {
    let lessonPrevious = isModule?.lessons[index - 1]

    if (lesson.progress == 100)
      return 'lesson-item-card--success'

    if (lessonPrevious?.progress == 100)
      return 'lesson-item-card--current'

    if (lesson?.order == "1")
      return 'lesson-item-card--current'

    if (lesson.progress === 0)
      return ''
  }

  return (
    <div className={`lesson-item-card ${getItemStateClass()}`} onClick={startLesson} >
      <p>{data.key}. {data.text}</p>
      <span>{secondsToString(data?.time, t, true)}</span>
      {lesson?.progress === 100 ? <Check /> : <PlayBtn />}
    </div>
  )
}