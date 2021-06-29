import React, { } from 'react';
import { Skeleton } from 'antd';

export const ModuleSkeleton = ({ }) => {

  return (
    <div className="module-skeleton">
      <div className="module-skeleton-container">
        <div className="module-skeleton-header">
          <Skeleton.Input active size="small" />
          <br />
          <Skeleton.Input active size="small" />
        </div>
        <div className="module-skeleton-content">
          <div className="module-skeleton-list">
            <div className="module-skeleton-list-header">
              <Skeleton.Input active size="default" />
              <p> -/- </p>
            </div>
            <div className="module-skeleton-list-items">
              <Skeleton.Input active size="small" />
              <br />
              <br />
              <Skeleton.Input active size="large" />
              <br />
              <br />
              <Skeleton.Input active size="large" />
            </div>
          </div>
          <div className="module-skeleton-list">
            <div className="module-skeleton-list-items">
              <Skeleton.Input active size="default" />
              <Skeleton.Input active size="default" />
              <br />
              <Skeleton.Input active size="large" />
              <br />
              <Skeleton.Input active size="large" />
              <br />
              <Skeleton.Input active size="large" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}