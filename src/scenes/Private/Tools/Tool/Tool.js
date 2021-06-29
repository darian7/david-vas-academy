import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { ReactComponent as NextBtn } from '../../../../assets/icons/next.svg'
import { tutorial as tutorialActions } from '../../../../services/Tutorial/TutorialActions'
import { tool as toolActions } from '../../../../services/Tool/ToolActions'
import { TutotialCardSkeleton } from '../../components/SkeletonScreens/TutotialCardSkeleton/TutotialCardSkeleton'
import { ToolCard } from '../../components/Cards/ToolCard/ToolCard'

export const Tool = () => {

  const [currentTool, setCurrentTool] = useState(0)

  const dispatch = useDispatch()
  const { loading, tools } = useSelector(state => state.tool)
  let history = useHistory()

  useEffect(() => {
    dispatch(tutorialActions.getTutorials())
    dispatch(toolActions.getTools())
  }, [])

  return (
    <div className="tools">
      <div className="tools-container">
        <div className="tools-cards">
          {loading.getTool ?
            [...Array(4)].map((item, i) => <TutotialCardSkeleton key={i} />)
            :
            tools?.map((group) => (
              <a type="link" key={group.id} onClick={() => history.push(`/tool-list`, { group })}>
                <ToolCard tool={group} onClick={() => history.push("/tool-list", { group })} />
              </a>
            ))
          }
        </div>

        <div className="tools-cards-responsive">
          <NextBtn
            className={`btn-right ${currentTool === 0 ? 'is-disabled' : ''} `}
            onClick={() => setCurrentTool(currentTool - 1)}
          />
          {tools?.map((group, i) => (
            currentTool == i && <a type="link" key={group.id} onClick={() => history.push(`/tool-list`, { group })}>
              <ToolCard tool={group} onClick={() => history.push("/tool-list", { group })} />
            </a>
          ))}
          <NextBtn
            className={`btn-left ${currentTool === tools.length - 1 ? 'is-disabled' : ''} `}
            onClick={() => setCurrentTool(currentTool + 1)}
          />
        </div>
      </div>
    </div>
  )
}