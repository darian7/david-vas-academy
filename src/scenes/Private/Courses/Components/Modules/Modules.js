import React from 'react'
import { useSelector } from 'react-redux'
import { Collapse } from 'antd'

const { Panel } = Collapse

export const Modules = ({
  setCourse,
  setLesson
}) => {
  const { courses, loading: loadingCourse } = useSelector((state) => state.course)
  const text = `A dog is a type of domesticated animal.`;

  const changeCourse = (key) => {
    const findCourse = courses?.find((course) => course?.id == key)
    setCourse(findCourse)
  }

  return (
    <Collapse accordion expandIconPosition="right" onChange={changeCourse} >
      {courses?.map((course, i) => (
        <Panel key={course?.id} header={course?.title?.es} key={course?.id}>
          {course?.lessons?.map((lesson) => (
            <div key={lesson?.id} onClick={() => setLesson(lesson)} >
              - {lesson?.description?.es}
            </div>
          ))}
        </Panel>
      ))}
    </Collapse>
  )
}
