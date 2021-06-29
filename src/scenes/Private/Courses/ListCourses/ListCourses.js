import React, { useState, useEffect } from 'react';

import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';

import { HomeCard } from '../../components/Cards/home-card/home-card';
import { HomeCardSkeleton } from '../../components/SkeletonScreens/HomeCardSkeleton/HomeCardSkeleton';
import { course as courseActions } from '../../../../services/Course/CourseActions'
import { stateCourse } from '../../../../common/config/Environments';

export const ListCourses = ({ }) => {

  const dispatch = useDispatch()
  const { loading, courses } = useSelector(state => state.course)
  const { t } = useTranslation()
  let history = useHistory()

  useEffect(() => {
    let params = { offset: 1, limit: 10 }
    if (stateCourse)
      params = { ...params, state: stateCourse }

    dispatch(courseActions.getCourses(params))
  }, [])

  return (
    <div className="courses">
      <div className="courses-container">
        <div className="welcome-banner">
          <div>
            <h2>{t('scenes.courses.welcome')}</h2>
            <p>{t('scenes.courses.welcome_first_paragraph_first')} <span> FEX </span> {t('scenes.courses.welcome_first_paragraph_second')}</p>
            <p>{t('scenes.courses.welcome_second_paragraph')}</p>
          </div>
        </div>
        <div className="courses-cards">
          {loading.getCourses ?
            [...Array(3)].map((item, i) => <HomeCardSkeleton key={i} />)
            :
            courses?.map((course) => (
              <a type="link" key={course.id} onClick={() => history.push(`/course-profile`, { course: course })}>
                <HomeCard data={course} onClick={() => history.push("/class-live")} />
              </a>
            ))
          }
        </div>
      </div>
    </div>
  )
}