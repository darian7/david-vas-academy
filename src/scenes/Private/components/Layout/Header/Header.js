import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next'
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from "react-router-dom";

import { auth as authActions } from '../../../../../services/Auth/AuthActions'
import { ProfileMenu } from '../ProfileMenu/ProfileMenu';
import SpinIndicator from '../../../../../components/SpinIndicator/SpinIndicator';
import i18n from '../../../../../i18n/i18n';

import { ReactComponent as Menu } from '../../../../../assets/icons/menu.svg'
import { ReactComponent as Cancel } from '../../../../../assets/icons/cancel.svg'
import { ReactComponent as Calendar } from '../../../../../assets/icons/calendar.svg'
import { video as videoActions } from '../../../../../services/Video/VideoActions';

export const Header = ({ }) => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  let location = useLocation()
  let history = useHistory()
  const { loading, user } = useSelector(state => state.user)
  const { videoLive } = useSelector(state => state.video)

  useEffect(() => {
    dispatch(videoActions.getVideoLive())
  }, [location?.pathname])


  const handleTabActive = (key) => {
    if (key.substr(1).length > 0 && location?.pathname?.includes(key.substr(1)))
      return 'tab-active'
    else if (location?.pathname == "/" && key == "/")
      return 'tab-active'

  }

  const onlogout = () => dispatch(authActions.logout())

  const handleSelectLanguage = (value) => {
    i18n.changeLanguage(value)
  }

  return (
    <header>
      <div className="header">
        <div className="header-logo">
          <img src={require("../../../../../assets/logo-fex.png")} alt="Logo Fex Academy" />
        </div>
        <div className="header-links" >
          <a type="link" className={handleTabActive('/') || handleTabActive('/course')} onClick={() => history.push("/courses")}><span>{t('header.item.courses')}</span></a>
          <a type="link" className={handleTabActive('/class-live')} onClick={() => history.push("/class-live")}><span>{videoLive?.length > 0 ? t('header.item.live') : t('header.item.memories')}</span></a>
          <a type="link" className={handleTabActive('/tutorial')} onClick={() => history.push("/tutorial")}><span>{t('header.item.tutorials')}</span></a>
          <a type="link" className={handleTabActive('/tool')} onClick={() => history.push("/tool")}><span>{t('header.item.tools')}</span></a>
          <a type="link" className={handleTabActive('/questions-frequent')} onClick={() => history.push("/questions-frequent")}><span>{t('header.item.questions_frequent')}</span></a>
          <a type="link" className={handleTabActive('/events')} onClick={() => history.push("/events")}><Calendar /> </a>
          <div className={`select-lng select-lng-${i18n.language}`} > <span onClick={() => handleSelectLanguage('en')}>EN</span> | <span onClick={() => handleSelectLanguage('es')}>ES</span></div>
          <div className="header-sign">
            {loading.getUser || !user ? <SpinIndicator /> : <ProfileMenu logout={onlogout} user={user} />}
          </div>
        </div>
      </div>
      <div className="header-responsive">
        {(location?.pathname !== "/menu") ?
          <Menu onClick={() => history.push('/menu')} /> :
          <Cancel onClick={() => history.goBack()} />
        }
        <div className="header-responsive-logo">
          <img src={require("../../../../../assets/logo-fex.png")} alt="Logo Fex Academy" />
        </div>
        {location?.pathname === '/menu' ? (
          <div className={`select-lng select-lng-${i18n.language}`} >
            {i18n.language === 'en' ? <span onClick={() => handleSelectLanguage('es')}>EN</span> :
              <span onClick={() => handleSelectLanguage('en')}>ES</span>}
          </div>
        ) : (
            <a type="link" onClick={() => history.push("/events")}><Calendar /> </a>
          )
        }
      </div>
    </header>
  )
}