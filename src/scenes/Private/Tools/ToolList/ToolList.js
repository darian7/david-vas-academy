import React, { useState } from 'react'
import { useLocation } from 'react-router'
import renderHTML from 'react-render-html'

import { ReactComponent as TickIcon } from '../../../../assets/icons/tick.svg'
import { ReactComponent as NextIcon } from '../../../../assets/icons/next.svg'
import i18n from '../../../../i18n/i18n'

export const ToolList = () => {

  const { language: lng } = i18n
  const { state: { group } } = useLocation()
  const [visibleTool, setVisibleTool] = useState()

  return (
    <div className="tool-list">
      <div className="tool-list-banner">
        <div className="tool-list-banner-title">
          <span>
            {group.title[lng]}
          </span>
        </div>
        <div className="tool-list-banner-description">
          {group.description?.[lng]}
        </div>
      </div>
      <div className="tool-list-container">
        <div className="tool-list-item">
          <div className="tool-list-cards">
            {group?.tools.map((tool, index) => (
              <div key={index}>
                <div className="tool-list-card" onClick={() => setVisibleTool(index !== visibleTool && index)}>
                  <TickIcon />
                  <p>{tool.title[lng]}</p>
                  <NextIcon className={visibleTool === index ? 'open-arrow' : ''} />
                </div>
                {visibleTool === index && <div className="tool-list-content">
                  {renderHTML(tool.content[lng])}
                </div>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}