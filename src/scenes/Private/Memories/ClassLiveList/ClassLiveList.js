import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory, useLocation } from 'react-router';
import io from 'socket.io-client'

import { Modal } from '../../components/Modals/Modal';
import { ReactComponent as NextIcon } from '../../../../assets/icons/next.svg'
import { ReactComponent as TickIcon } from '../../../../assets/icons/tick.svg'
import { ReactComponent as PlayIcon } from '../../../../assets/icons/play-button-triangle.svg'
import { useSelector, useDispatch } from 'react-redux';
import { video as videoActions } from '../../../../services/Video/VideoActions';
import { apiUrl } from '../../../../common/config/Environments';
import i18n from '../../../../i18n/i18n';
import ReactPlayer from 'react-player';
import moment from 'moment'
import SpinIndicator from '../../../../components/SpinIndicator/SpinIndicator';

export const ClassLiveList = ({ }) => {

  let history = useHistory()
  let location = useLocation()

  const { t } = useTranslation()
  const [openModal, toggleModal] = useState(false)
  const [year, setYear] = useState(moment().format('YYYY'))
  const [isPlay, setPlay] = useState(false)
  const [isVideo, setVideo] = useState(undefined)
  const [isListVisible, setListVisible] = useState(0)
  const [isReadyVideo, setReadyVideo] = useState(false)

  const dispatch = useDispatch()
  const { loading, videosDate } = useSelector(state => state.video)

  const yearString = moment().format("YYYY")

  useEffect(() => {
    if (location?.state?.categoryId)
      dispatch(videoActions.getVideosCategorys(location?.state?.categoryId, yearString))

    if (location?.search.includes("categoryId="))
      dispatch(videoActions.getVideosCategorys(location?.search?.replace("?categoryId=", '').split("&")[0]), yearString)

    const socket = io(apiUrl?.slice(0, -3), { forceNew: true })
    socket.on('data', handleEventSocketDat)
  }, [])

  useEffect(() => {

    let forArray = undefined

    if (location?.search.includes("videoId=") && videosDate.length > 0) {
      forArray = videosDate?.map(item => {
        onVideo(item?.videos?.find((video) => video?.id == location?.search?.split("&")[1].replace("videoId=", '')))
      })
    }

  }, [videosDate])

  useEffect(() => {
    if (!openModal) setPlay(false)
  }, [openModal])

  const ModalVideo = () => {
    return (
      <div className="profile-lesson-video">
        <div className="profile-lesson-video-container">

          {!isReadyVideo && <div className="bkg-iframe">
            <SpinIndicator />
          </div>
          }

          {isReadyVideo &&
            isVideo?.live &&
            moment() >= moment(isVideo?.startDate).subtract(5, "minute") &&
            <iframe src={`https://vimeo.com/live-chat/${isVideo?.urlVimeo?.split("https://vimeo.com/")[1]}`} width="400" height="600" frameBorder="0" ></iframe>
          }

          {isVideo?.urlVimeo && <div>
            <ReactPlayer
              width={640}
              height={360}
              playing={true}
              controls={true}
              url={isVideo?.urlVimeo}
              onReady={(e) => setReadyVideo(true)}
            />
            {<p>{isVideo?.description[i18n.language]}</p>}
          </div>}
        </div>
      </div >)
  }

  const onVideo = (video) => {
    setVideo(video)

    if (video)
      toggleModal(!openModal)
  }

  const handleEventSocketDat = (data) => {

    if (data?.id && data?.category?.id == location?.state?.categoryId) {
      dispatch(videoActions.videoEventEnd(data?.id))
      dispatch(videoActions.getVideoLive())
    }

    if (data?.live) {
      dispatch(videoActions.getVideoLive())
      dispatch(videoActions.getVideosCategorys(location?.state?.categoryId, yearString, true))
    }
  }

  const handleYear = (year) => {
    if (year >= 2020 && year <= Number(moment().format("YYYY"))) {
      setYear(year)
      dispatch(videoActions.getVideosCategorys(location?.state?.categoryId, year))
    }
  }

  return (
    <div className="class-live-list">
      <div className="class-live-list-year" >
        <div className={'icon-back'}>
          <NextIcon
            onClick={() => handleYear(Number(year) - 1)}
            className={year == 2020 ? 'icon-disabled' : ''}
          />
          <h2>{year}</h2>
          <NextIcon
            onClick={() => handleYear(Number(year) + 1)}
            className={year == yearString ? 'icon-disabled' : ''}
          />
        </div>
      </div>
      {videosDate.map((videoDate, index) => (
        <div className="class-live-list-container" key={index}>
          <div className="class-live-list-item">
            <div className="class-live-list-title" onClick={() => setListVisible(isListVisible != index ? index : undefined)}>
              <div>
                <h2>{videoDate.date}</h2>
              </div>
              <NextIcon className={isListVisible === index ? 'open-arrow' : ''} />
            </div>
            {isListVisible == index && (
              <div className="class-live-list-cards">
                {videoDate?.videos?.map((video, index) => (
                  <div key={video.id} className="class-live-list-card" onClick={() => onVideo(video)}>
                    <TickIcon />
                    <p>{
                      video?.live && moment() >= moment(video.startDate).subtract(5, "minute") ?
                        t(`scenes.memories.live`) :
                        `${t(`scenes.memories.memory`)} ${video?.startDateFormat[i18n.language]}`
                    }</p>
                    <PlayIcon />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      {openModal && <Modal visible={openModal} modal={<ModalVideo />} hideModal={toggleModal} />}
    </div>
  )
}