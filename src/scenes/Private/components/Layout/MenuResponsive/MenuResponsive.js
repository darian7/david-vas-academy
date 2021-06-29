import React from 'react';
import { useTranslation } from 'react-i18next'
import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { auth as authActions } from '../../../../../services/Auth/AuthActions'
import { ReactComponent as User } from '../../../../../assets/icons/user.svg'
import { ReactComponent as LogOut } from '../../../../../assets/icons/logout.svg'
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';


export const MenuResponsive = () => {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { loading, user } = useSelector(state => state.user)

  const onlogout = () => dispatch(authActions.logout())

  let history = useHistory()
  let location = useLocation()

  const handleTabActive = (key) => { if (location?.pathname == key) return 'tab-active' }

  return (
    <div className="menu-responsive">
      <div className="menu-responsive-profile">
        {user?.image ? <img height={100} src={user?.image} alt="Avatar user" /> : <Avatar shape="circle" size={100} style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} >{user?.person?.name?.slice(0, 1)}</Avatar>}
        {/* <img height={100} src={user?.image} alt="Avatar user" /> */}
        <p>{t('header.profile.hi')}, <span>{user?.person?.name.replace(/ .*/, '')}</span> </p>
      </div>
      <div className="menu-responsive-actions">
        <a onClick={() => history.push('user-profile')}>
          <User />
          {t('button.account')}
        </a>
        <a onClick={onlogout}>
          <LogOut />
          {t('button.logout')}
        </a>
      </div>
      <div className="menu-responsive-links">
        <a type="link" href="/courses"><span>{t('header.item.courses')}</span></a>
        <a type="link" href="/class-live"><span>{t('header.item.memories')}</span></a>
        <a type="link" href="/tutorial"><span>{t('header.item.tutorials')}</span></a>
        <a type="link" href="/questions-frequent"><span>{t('header.item.questions_frequent')}</span></a>
      </div>
    </div>
  )
}