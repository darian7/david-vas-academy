import React, { useState } from 'react';
import { Progress, Skeleton } from 'antd';

import { textLengthRender } from '../../../../../common/utilities/textLength';
import { ReactComponent as Watch } from '../../../../../assets/icons/watch.svg'
import { ReactComponent as Server } from '../../../../../assets/icons/server.svg'
import i18n from '../../../../../i18n/i18n';
import { useTranslation } from 'react-i18next';
import { secondsToString } from '../../../../../common/utilities/secondsToString';

export const HomeCard = ({ data }) => {

  const [imgError, setImgError] = useState(false)
  const { t } = useTranslation()

  return (
    <div className="home-card">
      <div className="home-card-banner">
        {data.image && !imgError ?
          <img src={data?.image} alt="Logo banner" onError={() => setImgError(true)} />
          :
          <Skeleton.Image />
        }
      </div>
      <div className="home-card-content">
        <h2>{data?.title[i18n.language]}</h2>
        <div>
          <div className="home-card-percentage">
            {/* <Cover className="clock-cover" /> */}
            <Progress type="circle"
              strokeColor={{
                '0%': '#fccf90',
                '100%': '#f9860f',
              }}
              trailColor={"#c4c4c4"}
              strokeWidth={12}
              strokeLinecap="square"
              percent={Number.isInteger(data?.progress) ? data?.progress : data?.progress?.toFixed(1)}
              width={80}
              format={percent => `${percent}%`} />
          </div>
          <div className="home-card-content-data">
            <div><Server /> {data?.modules} {t('scenes.courses.modules')}</div>
            <div><Watch /> {secondsToString(data?.hours, t)} </div>
            <p>{textLengthRender(data?.subtitle[i18n.language], 85)}</p>
          </div>
        </div>
      </div>
    </div>
  )
}