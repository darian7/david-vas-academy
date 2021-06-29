import React, { useState } from 'react'
import ReactPlayer from 'react-player'
import { useLocation } from 'react-router'

import { ReactComponent as CloseIcon } from '../../../../assets/icons/close-2.svg'
import { ReactComponent as TickIcon } from '../../../../assets/icons/tick.svg'
import { ReactComponent as PlayIcon } from '../../../../assets/icons/play-button-triangle.svg'
import { Modal } from '../../components/Modals/Modal'
import i18n from '../../../../i18n/i18n'

const { language: lng } = i18n

export const TutorialList = () => {

  const { state: { level } } = useLocation()

  const [openModal, toggleModal] = useState(false)
  const [isVideo, setVideo] = useState(undefined)

  const ModalVideo = () => (
    <div className="profile-lesson-video">
      <div className="profile-lesson-video-container">
        {isVideo?.url && (
          <div>
            <div className="profile-lesson-video-container-header">
              <h2>{isVideo?.title[lng]}</h2>
              <CloseIcon onClick={() => onVideo()} />
            </div>
            <ReactPlayer
              width={640}
              height={360}
              controls={true}
              url={isVideo?.url}
            />
            {<p>{isVideo?.description[lng]}</p>}
          </div>
        )}
      </div>
    </div >
  )

  const onVideo = (video) => {
    setVideo(video)
    toggleModal(!openModal)
  }

  return (
    <div className="tutorial-list">
      <div className="tutorial-list-banner">
        <div className="tutorial-list-banner-title">
          <span>
            {level.name[lng]}
          </span>
        </div>
        <div className="tutorial-list-banner-description">
          {level.description?.es}
        </div>
      </div>
      <div className="tutorial-list-container">
        <div className="tutorial-list-item">
          <div className="tutorial-list-cards">
            {level?.videos.map((video, index) => (
              <div key={index} className="tutorial-list-card" onClick={() => onVideo(video)}>
                <TickIcon />
                <p>{video.title[lng]}</p>
                <PlayIcon />
              </div>
            ))}
          </div>
        </div>
      </div>
      {openModal && <Modal visible={openModal} modal={<ModalVideo />} hideModal={toggleModal} />}
    </div>
  )
}