import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';

import tick from '../../../../assets/icons/tick.svg'
import watch from '../../../../assets/icons/watch.svg'
import server from '../../../../assets/icons/server.svg'
import { ListCard } from '../../components/Cards/list-card/ListCard';
import i18n from '../../../../i18n/i18n';
import { useDispatch } from 'react-redux';
import { course as courseActions } from '../../../../services/Course/CourseActions';
import { secondsToString } from '../../../../common/utilities/secondsToString';
import { message } from 'antd';

export const ProfileCourse = ({ location }) => {

  const dispatch = useDispatch()
  const { t } = useTranslation()
  let history = useHistory()

  let isCourseParams = location?.state?.course

  const errorCourseStart = () => {
    message.error(t('error.general_error'));
  }

  const startCourse = () => {
    if (isCourseParams?.users?.length == 0)
      dispatch(courseActions.courseStart(isCourseParams, errorCourseStart))
    else
      history.push('/course-progress', { course: isCourseParams })
  }

  return (
    <div className="course-profile">
      <div className="course-profile-container">
        <div className="course-profile-banner">
          <img src={isCourseParams?.image} alt="Logo banner" />
          <div>
            <h1>{isCourseParams?.title[i18n.language]}</h1>
            <p>{isCourseParams?.subtitle[i18n.language]}</p>
            <a type="button" onClick={startCourse}>
              {isCourseParams?.users?.length == 0 ?
                t('scenes.courses.start_course') : t('scenes.courses.continue_course')
              }
            </a>
          </div>
        </div>
        <div className="course-profile-text">
          <p>{isCourseParams?.description[i18n.language]}
          </p>
        </div>
        <div className="course-profile-cards">
          <ListCard
            data={{
              title: t('scenes.profileCourse.course_details'),
              list: [
                { text: `${isCourseParams?.temarys?.length} ${t('scenes.courses.modules')}`, icon: server },
                { text: `${secondsToString(isCourseParams?.hours, t)}`, icon: watch }
              ]
            }}
          />
          <ListCard data={{ title: t('scenes.profileCourse.characteristics'), list: isCourseParams?.features?.map((feature) => ({ text: feature.description[i18n.language], icon: tick })) }} />
          <ListCard data={{ title: t('scenes.profileCourse.modules'), list: isCourseParams?.temarys?.map((module) => ({ text: module.title[i18n.language], icon: tick })) }} />
        </div>
      </div>
    </div>
  )
}