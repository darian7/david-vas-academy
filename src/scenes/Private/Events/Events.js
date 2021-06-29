import React, { useState, useEffect, Fragment } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux'
import { Calendar, momentLocalizer } from 'react-big-calendar'
import ReactPlayer from 'react-player'
import moment from 'moment'

import { event as eventActions } from '../../../services/Event/EventActions'
import i18n from '../../../i18n/i18n';
import { ReactComponent as NextIcon } from '../../../assets/icons/next.svg'
import { ReactComponent as PlayIcon } from '../../../assets/icons/play-button-triangle.svg'
import "react-big-calendar/lib/css/react-big-calendar.css"
import { Modal } from '../components/Modals/Modal'
require('moment/locale/es.js')

export const Events = ({ }) => {

  moment.locale(i18n.language)
  const localizer = momentLocalizer(moment)
  const { t } = useTranslation()

  const [openModal, toggleModal] = useState(false)
  const [play, setPlay] = useState(false)
  const [video, setVideo] = useState(undefined)

  const { events } = useSelector(state => state.event)
  const { getAll } = eventActions
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAll())
  }, [])

  useEffect(() => {
    if (!openModal) setPlay(false)
  }, [openModal])

  const onVideo = (event) => {
    setVideo(event)
    toggleModal(!openModal)
  }

  const eventCard = ({ event }) => {
    const { start, description, title, end } = event
    return (
      <div className="calendar-event">
        <div className="calendar-event-hour">
          <span>{moment(start).format('HH:mm')}</span>
        </div>
        <div className="calendar-event-title">
          <span>{title}</span>
        </div>
        <div className="calendar-event-description">
          <span>{description}</span>
        </div>
        {moment() > moment(start).subtract(10, 'minutes') && moment() < moment(end) && (
          <div className="calendar-event-link">
            <a onClick={() => onVideo(event)}>
              {t('scenes.events.click_here')}
            </a>
          </div>
        )}
      </div>
    )
  }

  const headerCard = (data) => (
    <div className="calendar-header">
      <span className="day-text">
        {moment(data.date).format('dddd')}
      </span>
      <span className="day-number">
        {moment(data.date).format('DD')}
      </span>
    </div>
  )

  const CustomToolbar = (toolbar) => (
    <div className="calendar-toolbar">
      <div className="calendar-toolbar-container">
        <a>
          <NextIcon onClick={() => toolbar.onNavigate('PREV')} className="icon-back" />
        </a>
        <div className="date-label">
          <span>{toolbar.label}</span>
        </div>
        <a>
          <NextIcon onClick={() => toolbar.onNavigate('NEXT')} className="icon-next" />
        </a>
      </div>
    </div>
  )

  const ModalVideo = () => {
    let code = video?.link.split('/')
    code = code[video.link.includes('player.vimeo.com') ? 4 : 3]
    return (
      <div className="events-video">
        <div className="events-video-container">
          {!play && (
            <div className="bkg-iframe">
              <PlayIcon onClick={() => setPlay(!play)} />
            </div>
          )}
          {play && moment() > moment(video?.start).subtract(5, 'minutes') && moment() < moment(video?.end) && (
            <iframe
              src={`https://vimeo.com/live-chat/${code}`}
              width="400"
              height="600"
              frameBorder="0" />
          )}
          <div style={{ width: 640 }}>
            {play && <ReactPlayer
              width={640}
              height={360}
              playing={play}
              controls={true}
              url={`https://player.vimeo.com/video/${code}`}
            />}
          </div>
        </div>
      </div >
    )
  }

  const components = {
    toolbar: CustomToolbar,
    header: headerCard,
    timeSlotWrapper: () => <Fragment />,
    eventWrapper: eventCard
  }

  const calendarProps = {
    components,
    localizer,
    style: { height: 800 },
    scrollToTime: new Date(0, 0, 0, 0, 0, 0, 0),
    events: events?.map(event => ({
      ...event,
      title: event.title[i18n.language] || event.title,
      description: event.description[i18n.language] || event.description
    })) || [],
  }

  return (
    <div className="events">
      <div className="events-container">
        <div className="welcome-banner">
          <div>
            <h2>{t('header.item.events')}</h2>
          </div>
        </div>
      </div>
      <div className="calendar">
        <Calendar
          {...calendarProps}
          defaultView={"week"}
          views={["week"]}

        />
      </div>
      <div className="calendar-responsive">
        <Calendar
          {...calendarProps}
          defaultView={"day"}
          views={["day"]}
        />
      </div>
      {openModal && <Modal visible={openModal} modal={<ModalVideo />} hideModal={toggleModal} />}
    </div>
  )
}