import React from 'react'
import { Progress } from 'antd'
import moment from 'moment'
import { useTranslation } from 'react-i18next'
import { ReactComponent as Tick } from '../../../../../assets/icons/tick.svg'

export const ModuleCard = ({ data, isModule, onStartModule }) => {

  const { t } = useTranslation()
  const { percentage, order, userRegistration, id, text, unlockTime } = data
  const unlockDays = moment(userRegistration).add(unlockTime, 'days').diff(moment(), 'days')
  const locked = order > isModule?.order || unlockDays > 0

  return (
    <div
      className={`module-card module-card--${locked ? 'disabled' : percentage === 100 ? 'success' : ''}`}
      style={{ cursor: !locked ? 'pointer' : 'unset' }}
      onClick={() => { !locked && onStartModule(id) }}
    >
      <div>
        <Tick />
        <p>{text}</p>
      </div>
      {unlockDays > 0 ? (
        <p>{t("scenes.profileCourse.available", { unlockDays, plural: unlockDays > 1 ? 's' : '' })}</p>
      ) : (
          <Progress
            percent={Number.isInteger(percentage) ? percentage : percentage?.toFixed(1)}
            status="active"
            strokeLinecap="square"
            strokeColor={"#f7931e"}
            trailColor="#cccccc"
          />
        )
      }
    </div>
  )
}