import React, { useState } from 'react'
import ReactPlayer from 'react-player';
import { useDispatch, useSelector } from 'react-redux';

import { video as videoActions } from '../../../../../services/Video/VideoActions';
import { course as courseActions } from '../../../../../services/Course/CourseActions';

export const ProfileLesson = ({
  isLesson,
  isCourse: course
}) => {
  const [isDuration, setDuration] = useState(0)
  const { loading: loadingCourse } = useSelector((state) => state.course)
  const { loading } = useSelector((state) => state.video)
  const { profile } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const handleVideoView = (view) => {
    if (view && isLesson?.video?.users?.length == 0 && !loading.video_start) {
      startVideo(isLesson)
    }
  }

  const startVideo = (lesson) => {
    if (!loading?.video_start) {
      dispatch(videoActions.videoStart(
        lesson?.video,
        course?.id,
        succesVideoStart,
        lesson
      ))
    }
  }

  const succesVideoStart = (isLesson) => {
    dispatch(
      courseActions.getCourseResponse({
        ...course,
        lessons: course?.lessons?.map((lesson) =>
          lesson?.id == isLesson?.id ?
            { ...lesson, video: { ...lesson?.video, users: [profile] } }
            :
            lesson
        ),
      })
    )
  }

  return (
    <div>
      <div>
        <h1>{course?.title?.es}</h1>
        <h1>{course?.subtitle?.es}</h1>
        <h1></h1>
      </div>

      <div>
        {isLesson?.video?.urlVimeo &&
          <div>
            <ReactPlayer
              width={640}
              height={360}
              playing={true}
              controls={true}
              url={isLesson?.video?.urlVimeo}
              onProgress={(e) => handleVideoView(e.playedSeconds >= (isDuration - 2))}
              onDuration={(e) => setDuration(e)}
            />
            {<p>{isLesson?.description?.es}</p>}
          </div>
        }
      </div>

    </div>
  )
}
