import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { useTranslation } from 'react-i18next';
import { Progress } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import { ReactComponent as Watch } from '../../../../assets/icons/watch.svg'
import { ReactComponent as Server } from '../../../../assets/icons/server.svg'
import { ModuleCard } from '../../components/Cards/ModuleCard/ModuleCard';
import i18n from '../../../../i18n/i18n';
import { course as courseActions } from '../../../../services/Course/CourseActions'
import { ProgressCourseSkeleton } from '../../components/SkeletonScreens/ProgressCourseSkeleton/ProgressCourseSkeleton';
import { secondsToString } from '../../../../common/utilities/secondsToString';

export const ProgressCourse = ({ location }) => {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { course, loading } = useSelector(state => state.course)
  const { user } = useSelector(state => state.user)
  const [isModule, setModule] = useState()

  let history = useHistory()

  useEffect(() => {
    if (location?.state?.course?.id && !loading.getCourse)
      dispatch(courseActions.getCourse(location?.state?.course?.id))
  }, [location?.state?.course])

  useEffect(() => {
    let temaryExist
    let temarysMap = course?.temarys?.map((module, index) => {
      // let isQuestionOfModule = module?.questions?.length > 0
      // let lesson = module?.lessons[module?.lessons?.length - 1]
      //if (module.progress == 100 && (!isQuestionOfModule ? countAnswerSummary(lesson?.questions)?.answerCorrect?.length >= lesson?.questions.length : countAnswerSummary(module?.questions)?.answerCorrect?.length >= module?.questions.length)) {

      if (module.progress == 100) {
        temaryExist = course?.temarys[index + 1] || course?.temarys[index]
        setModule(temaryExist)
      }
    })

    if (!temaryExist)
      setModule(course?.temarys[0])

  }, [course?.temarys])

  const onStartCourse = () => {
    history.push("/module", { course })
  }

  const onStartModule = (moduleId) => {
    history.push("/module", { course, moduleId })
  }

  // const countAnswerSummary = (questions) => {
  //   let answerCorrect = [], answerError = []

  //   let test = questions?.map((question) => {
  //     let answer = question?.answers?.find((answer) => answer?.correct)
  //     if (question?.userQuestions[0]?.answer?.id == answer?.id)
  //       answerCorrect = [...answerCorrect, question]
  //     else
  //       answerError = [...answerError, question]
  //   })

  //   return { answerCorrect, answerError }
  // }

  return (
    <>{course ?
      <div className="course-progress">
        <div className="course-progress-header">
          <div className="course-progress-header-course">
            <h1>{course?.title[i18n.language]}</h1>
            <p>{course?.subtitle[i18n.language]}</p>
            <a type="button" onClick={onStartCourse}>
              {course?.users?.length == 0 ? t('button.start') : t('button.continue')}
            </a>
          </div>
          <div className="course-progress-header-progress">
            <h1>{course?.title[i18n.language]}</h1>
            <h3>{t('scenes.courses.course_progress')}</h3>
            <Progress type="circle"
              strokeColor={'#f97f02'}
              trailColor={'#c4c4c4'}
              strokeWidth={12}
              strokeLinecap="square"
              percent={Number.isInteger(course?.progress) ? course?.progress : course?.progress?.toFixed(1)}
              width={180}
              format={percent => `${percent}%`} />
          </div>
          <div className="course-progress-header-detail">
            <h3>{t('scenes.courses.course_detail')}</h3>
            <div> <Server /> {course?.temarys?.length} {t('scenes.courses.modules')}</div>
            <div> <Watch /> {secondsToString(course?.hours, t)}</div>
          </div>
        </div>
        <div className="course-progress-list-modules">
          <h2>{t('scenes.modules.modules')} <span>({course?.temarys?.length})</span></h2>
          <div className="course-progress-list-module">
            {course?.temarys?.map((module, i) => {
              return <ModuleCard
                key={i}
                data={{
                  text: module.description[i18n.language],
                  percentage: module.progress,
                  id: module.id,
                  order: module.order,
                  unlockTime: module.unlockTime,
                  userRegistration: user?.createdAt
                }}
                isModule={isModule}
                onStartModule={onStartModule}
              />
            })}
          </div>
        </div>
      </div>
      :
      <ProgressCourseSkeleton />
    }</>
  )
}