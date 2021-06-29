import React from 'react';
import { useLocation } from 'react-router';
import { ReactComponent as Facebook } from '../../assets/icons/facebook.svg'
import { ReactComponent as Instagram } from '../../assets/icons/instagram.svg'
import { ReactComponent as Youtube } from '../../assets/icons/youtube.svg'
import { facebook, instagram, youtube } from "../../common/constants/socialNetworks"

export const SocialButtons = ({ }) => {
  const seeSocialBtn = ["/", "/courses", '/course-profile', '/course-progress', '/class-live', '/class-live-list', '/questions-frequent', '/user-profile']
  let location = useLocation()

  const isVisible = () => {
    let visible = ''
    if (seeSocialBtn.find(e => e === location?.pathname))
      visible = 'is-visible'
    return visible
  }

  return (
    <div className={`social-btns ${isVisible()}`}>
      <div className="social-btns-item">
        <a href={instagram.url} target="_blank"><Instagram /></a>
      </div>
      <div className="social-btns-item">
        <a href={youtube.url} target="_blank"><Youtube /></a>
      </div>
      <div className="social-btns-item">
        <a href={facebook.url} target="_blank"><Facebook /></a>
      </div>
    </div>
  )
}