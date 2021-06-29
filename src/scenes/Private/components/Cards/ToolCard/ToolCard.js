import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { textLengthRender } from '../../../../../common/utilities/textLength'
import svgPath from '../../../../../assets/icons/arrow.svg'
import defaultImg from '../../../../../assets/tutorial-level.jpg'
import i18n from '../../../../../i18n/i18n'

export const ToolCard = ({ tool }) => {

  const [imgError, setImgError] = useState(false)
  const { t } = useTranslation()
  const { language: lng } = i18n

  return (
    <div className="tool-card">
      <div className="tool-card-banner">
        <h2>{tool?.title[lng]}</h2>
        {tool?.imageUrl && !imgError ?
          <img src={tool?.imageUrl} alt="Logo banner" onError={() => setImgError(true)} />
          :
          <img src={defaultImg} alt="Logo banner" />
        }
      </div>
      <div className="tool-card-content">
        <div className="tool-card-content-data">
          <p>{textLengthRender((tool?.description && tool?.description[lng]) || '', 150)}</p>
        </div>
        <div className="tool-card-content-link">
          <p>{t('scenes.tools.goTo')}</p>
          <img src={svgPath} width="30px" />
        </div>
      </div>
    </div>
  )
}