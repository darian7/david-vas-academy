import React from 'react';
import { Skeleton } from 'antd';

export const HomeCardSkeleton = () => {
  return (
    <div className="home-card-skeleton">
      <div className="home-card-skeleton-banner"></div>
      <div className="home-card-skeleton-content">
        <Skeleton.Input active size="default" />
        <div>
          <div className="home-card-percentage">
            <Skeleton.Avatar active size={80} shape="circle" />
          </div>
          <div className="home-card-skeleton-content-data">
            <Skeleton.Input active size="small" />
            <Skeleton.Input active size="small" />
            <Skeleton.Input active size="small" />
          </div>
        </div>
      </div>
    </div>
  )
}