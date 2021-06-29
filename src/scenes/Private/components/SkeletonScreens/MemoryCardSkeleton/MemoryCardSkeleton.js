import React from 'react';
import { Skeleton } from 'antd';

export const MemoryCardSkeleton = () => {
  return (
    <div className="memory-card-skeleton">
      <div className="memory-card-skeleton-content">
        <Skeleton.Input active size="default" />
        <div className="memory-card-skeleton-banner" />
      </div>
      <div className="memory-card-skeleton-btn">
        <Skeleton.Input active size="large" />
      </div>
    </div>
  )
}