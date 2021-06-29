import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import ReactPlayer from 'react-player'

import i18n from '../../../../../i18n/i18n';
import { video as videoActions } from '../../../../../services/Video/VideoActions';
import SpinIndicator from '../../../../../components/SpinIndicator/SpinIndicator';

export const ProfileLesson = ({
  isLesson,
  viewQuiz,
  setQuestion,
  isVideoView,
  setVideoView,
  isModule,
  isQuestionOfModule,
  startQuestionsLessons,
  toggleModal,
  nextLesson,
  nextModule,
  finishCourse,
  startQuestionsModule,
  isReadyVideo, 
  setReadyVideo
}) => {

  const { t } = useTranslation()
  const dispatch = useDispatch()
  //const [isReadyVideo, setReadyVideo] = useState(false);
  const [isDuration, setDuration] = useState(140)
  const { loading } = useSelector(state => state.video)
  const { temarys } = useSelector(state => state.temary)

  useEffect(() => {
    setVideoView(isLesson?.video?.users?.length > 0)
  }, [isLesson])

  const handleVideoView = (view) => {
    if (view && isLesson?.video?.users?.length == 0 && !loading.video_start) {
      setVideoView(view)
      startVideo()
    }
  }

  const succesStartVideo = () => {
    setQuestion(isLesson?.questions[0])
    viewQuiz(isLesson?.questions?.length > 0)
  }

  const startVideo = () => {
    if (isModule && !loading.video_start) {
      dispatch(videoActions.videoStart(isLesson?.video, isModule?.course?.id, succesStartVideo))
      setReadyVideo(false)
    }
  }

  const conditionNextLesson = () => isLesson?.progress == 100 && isLesson?.order < isModule?.lessons?.length
  const conditionNextModule = () => isModule?.progress >= 100 && isModule?.order < temarys?.length && isLesson?.order == isModule?.lessons?.length && isModule?.questions?.length == 0
  const conditionNextCourse = () => isModule?.progress >= 100 && isModule?.order == temarys?.length && isLesson?.order == isModule?.lessons?.length && isModule?.questions?.length == 0
  const conditionIsQuestionModule = () => !isQuestionOfModule  && isLesson?.order == isModule?.lessons?.length && isModule?.questions?.length > 0

  const flowCourse = () => {
    conditionNextLesson() && nextLesson()

    conditionIsQuestionModule() && startQuestionsModule()

    conditionNextModule() && nextModule()

    conditionNextCourse() && finishCourse()
  }

  return (
    <div className="profile-lesson">
      <div className="profile-lesson-video">
        {(loading.video_start || !isReadyVideo) && <div className="bkg-iframe">
          <SpinIndicator />
        </div>}
        {!loading.video_start && <ReactPlayer
          width={640}
          height={360}
          playing={false}
          onReady={(e) => setReadyVideo(true)}
          controls={true}
          onProgress={(e) => handleVideoView(e.playedSeconds >= (isDuration - 2))}
          onDuration={(e) => setDuration(e)}
          url={isLesson?.video?.urlVimeo}
          loop={true}
        />}
      </div>
      <div className="profile-lesson-data">
        <div className="profile-lesson-data-text">
          <h1>{isLesson?.order}. {isLesson?.title[i18n.language]}</h1>
          <p className="p-top">{isLesson?.subtitle[i18n.language]}</p>
          <p>{isLesson?.description[i18n.language]}</p>
        </div>
        <div className="profile-lesson-data-btns">
          {isLesson?.questions?.length > 0 && <a
            style={{ pointerEvents: isVideoView ? 'visible' : 'none' }}
            type="button"
            onClick={() => {
              viewQuiz(true)
              startQuestionsLessons() || setQuestion(isLesson?.questions[0])
            }} >{t('scenes.modules.quiz')}
          </a>}
          {isLesson?.files?.length > 0 && <a
            type="button"
            onClick={() => toggleModal(true)}
          >
            {t('scenes.modules.files')}
          </a>}

          {isLesson?.video?.users?.length > 0 && isLesson?.questions == 0 && <a
            type="button"
            onClick={flowCourse}
          >
            {conditionNextLesson() && t('scenes.quiz.next_lesson')}

            {conditionIsQuestionModule() && t('scenes.quiz.quiz_module')}

            {conditionNextModule() && t('scenes.quiz.next_module')}

            {conditionNextCourse() && t('scenes.quiz.next_course')}
          </a>}
        </div>
      </div>
    </div>
  )
}