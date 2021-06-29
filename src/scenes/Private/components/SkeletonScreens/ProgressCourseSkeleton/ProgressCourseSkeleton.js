import React from 'react';
import { Progress, Skeleton } from 'antd';
import { useTranslation } from 'react-i18next';
import { ReactComponent as Watch } from '../../../../../assets/icons/watch.svg'
import { ReactComponent as Server } from '../../../../../assets/icons/server.svg'

export const ProgressCourseSkeleton = () => {
  const { t } = useTranslation()

  return (
    <div className="course-progress-skeleton">
      <div className="course-progress-skeleton-header">
        <div className="course-progress-skeleton-header-course">
          <br />
          <br />
          <Skeleton.Input active size="default" />
          <br />
          <Skeleton.Input active size="default" />
          <br />
          <a type="button">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</a>
        </div>
        <div className="course-progress-skeleton-header-progress">
          <h3>{t('scenes.courses.course_progress')}</h3>
          <Progress type="circle"
            strokeColor={'#f97f02'}
            trailColor={'#c4c4c4'}
            strokeWidth={12}
            strokeLinecap="square"
            percent={0}
            width={180}
            format={percent => `-- %`} />
        </div>
        <div className="course-progress-skeleton-header-detail">
          <h3>{t('scenes.courses.course_detail')}</h3>
          <div className="w-100"> <Server /> <Skeleton.Input active size="default" /></div>
          <div className="w-100"> <Watch /> <Skeleton.Input active size="default" /></div>
        </div>
      </div>
      <div className="course-progress-skeleton-list-modules">
        <br />
        <Skeleton.Input active size="default" />
        <br />
        <br />
        <Skeleton.Input active size="default" />
        <br />
        <br />
        <Skeleton.Input active size="default" />
        <br />
        <br />
        <Skeleton.Input active size="default" />
      </div>
    </div>
  )
}