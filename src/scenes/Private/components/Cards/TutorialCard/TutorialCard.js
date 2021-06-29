import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { textLengthRender } from '../../../../../common/utilities/textLength'
import svgPath from '../../../../../assets/icons/arrow.svg'
import defaultImg from '../../../../../assets/tutorial-level.jpg'
import i18n from '../../../../../i18n/i18n'

export const TutorialCard = ({ tutorial }) => {

  const [imgError, setImgError] = useState(false)
  const { t } = useTranslation()
  const { language: lng } = i18n

  return (
    <div className="tutorial-card">
      <div className="tutorial-card-banner">
        <h2>{tutorial?.name[lng]}</h2>
        {tutorial?.imageWebKey && !imgError ?
          <img src={tutorial?.imageWebKey} alt="Logo banner" onError={() => setImgError(true)} />
          :
          <img src={defaultImg} alt="Logo banner" />
        }
      </div>
      <div className="tutorial-card-content">
        <div className="tutorial-card-content-data">
          <p>{textLengthRender((tutorial?.description && tutorial?.description[lng]) || '', 150)}</p>
        </div>
        <div className="tutorial-card-content-link">
          <p>{t('scenes.tutorials.goTo')}</p>
          <img src={svgPath} width="30px" />
        </div>
      </div>
    </div>
  )
}