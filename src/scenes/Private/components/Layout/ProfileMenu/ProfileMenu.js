import React from 'react';
import { useTranslation } from 'react-i18next'
import { Avatar, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { ReactComponent as User } from '../../../../../assets/icons/user.svg'
import { ReactComponent as LogOut } from '../../../../../assets/icons/logout.svg'
import { useHistory } from 'react-router-dom';

export const ProfileMenu = ({ logout, user }) => {

  const { t } = useTranslation()
  let history = useHistory()

  return (
    <div className="profile-menu">
      <p>{t('header.profile.hi')}, <span>{user?.person?.name.replace(/ .*/, '')}</span> </p>

      <div className="dropdown">
        <Avatar src={user?.image} className="dropbtn" />
        <div className="dropdown-content">
          <a onClick={() => history.push('user-profile')}>
            <User />
            {t('button.account')}
          </a>
          <a onClick={logout}>
            <LogOut />
            {t('button.logout')}
          </a>
        </div>
      </div>
    </div>
  )
}