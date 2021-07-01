import React, { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'

import { auth as authActions } from '../../../../services/Auth/AuthActions'
import { course as courseActions } from '../../../../services/Course/CourseActions'
import { Modules } from '../Components/Modules/Modules'
import { ProfileLesson } from '../Components/ProfileLesson/ProfileLesson'

export const ListCourses = (
) => {

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const [isLesson, setLesson] = useState()
  const [isCourse, setCourse] = useState()
  const { courses, loading: loadingCourse } = useSelector((state) => state.course)

  console.log("course:", isCourse);
  console.log("lesson:", isLesson);

  useEffect(() => {
    dispatch(courseActions.getCourses())
  }, [])

  useEffect(() => {
    if (courses?.length > 0)
      setCourse(courses[0])

  }, [courses?.length])

  useEffect(() => {
    if (isCourse?.lessons?.length > 0)
      setLesson(isCourse?.lessons[0])

  }, [isCourse])

  const goLogout = () => {
    dispatch(authActions.logout())
  }

  return (
    <div style={{ backgroundColor: "white" }}>
      <div>
        <h1 >
          courses
        </h1>
        <button onClick={goLogout} >
          {t(`button.logout`)}
        </button>
      </div>

      <div>
        <ProfileLesson isLesson={isLesson} isCourse={isCourse} />
      </div>

      <div>
        <Modules isLesson={isLesson} isCourse={isCourse} setCourse={setCourse} setLesson={setLesson} />
      </div>

    </div>
  )
}
