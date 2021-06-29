import React from 'react';
import { Skeleton } from 'antd';

export const TutotialCardSkeleton = () => {
  return (
    <div className="tutorial-card-skeleton">
      <div className="tutorial-card-skeleton-banner"></div>
      <div className="tutorial-card-skeleton-content">
        <div>
          <div className="tutorial-card-skeleton-content-data">
            <Skeleton.Input active size="small" />
            <Skeleton.Input active size="small" />
            <Skeleton.Input active size="small" />
          </div>
          <div className="tutorial-card-skeleton-content-link">
            <Skeleton.Input active size="default" />
          </div>
        </div>
      </div>
    </div>
  )
}