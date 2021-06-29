import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router'

import { ReactComponent as NextBtn } from '../../../../assets/icons/next.svg'
import { tutorial as tutorialActions } from '../../../../services/Tutorial/TutorialActions'
import { TutorialCard } from '../../components/Cards/TutorialCard/TutorialCard'
import { TutotialCardSkeleton } from '../../components/SkeletonScreens/TutotialCardSkeleton/TutotialCardSkeleton'
import i18n from '../../../../i18n/i18n'

const { language: lng } = i18n

export const Tutorial = () => {

  const [currentTutorial, setCurrentTutorial] = useState(0)

  const dispatch = useDispatch()
  const { loading, tutorials } = useSelector(state => state.tutorial)
  let history = useHistory()

  useEffect(() => {
    dispatch(tutorialActions.getTutorials())
  }, [])

  return (
    <div className="tutorials">
      <div className="tutorials-container">
        <div className="tutorials-cards">
          {loading.getTutorial ?
            [...Array(4)].map((item, i) => <TutotialCardSkeleton key={i} />)
            :
            tutorials?.map((level) => (
              <a type="link" key={level.id} onClick={() => history.push(`/tutorial-list`, { level })}>
                <TutorialCard tutorial={level} onClick={() => history.push("/tutorial-list", { level })} />
              </a>
            ))
          }
        </div>

        <div className="tutorials-cards-responsive">
          <NextBtn
            className={`btn-right ${currentTutorial === 0 ? 'is-disabled' : ''} `}
            onClick={() => setCurrentTutorial(currentTutorial - 1)}
          />
          {tutorials?.map((level, i) => (
            currentTutorial == i && <a type="link" key={level.id} onClick={() => history.push(`/tutorial-list`, { level })}>
              <TutorialCard tutorial={level} onClick={() => history.push("/tutorial-list", { level })} />
            </a>
          ))}
          <NextBtn
            className={`btn-left ${currentTutorial === tutorials.length - 1 ? 'is-disabled' : ''} `}
            onClick={() => setCurrentTutorial(currentTutorial + 1)}
          />
        </div>
      </div>
    </div>
  )
}