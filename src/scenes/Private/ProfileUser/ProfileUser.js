import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SpinIndicator from '../../../components/SpinIndicator/SpinIndicator'
import Avatar from 'antd/lib/avatar/avatar';

export const ProfileUser = () => {

  const { t } = useTranslation()
  const { loading, user } = useSelector(state => state.user)

  return (
    <div className="profile-user">
      <div className="profile-user-container">
        <div className="welcome-banner">
          <div>
            <h2>{user?.person?.name}</h2>
            {user?.image ?
              <img height={100} src={user?.image} alt="Avatar user" />
            : <Avatar shape="circle" size={100} style={{ backgroundColor: '#f56a00', verticalAlign: 'middle' }} >{user?.person?.name?.slice(0, 1)}</Avatar>
            }
          </div>
        </div>
        <div className="profile-user-data">

          {loading.getUser || !user
            ? <SpinIndicator />
            : <>
              <h3>
                {t('scenes.profileUser.data')}
              </h3>
              <div className="profile-user-data-items">
                <div>
                  <span>{t('scenes.profileUser.age')}</span>
                  <p>{user?.person?.age}</p>
                </div>
                <div>
                  <span>{t('scenes.profileUser.civilStatus')}</span>
                  <p>{user?.person?.civilStatus}</p>
                </div>
                <div>
                  <span>{t('scenes.profileUser.gender')}</span>
                  <p>{user?.person?.gender}</p>
                </div>
                <div>
                  <span>{t('scenes.profileUser.studies')}</span>
                  <p>{user?.person?.studies}</p>
                </div>
                <div>
                  <span>{t('scenes.profileUser.country')}</span>
                  <p>{user?.client?.country}</p>
                </div>
                <div>
                  <span>{t('scenes.profileUser.profession')}</span>
                  <p>{user?.person?.profession}</p>
                </div>
                <div>
                  <span>{t('scenes.profileUser.city')}</span>
                  <p>{user?.client?.city}</p>
                </div>
                <div>
                  <span>{t('scenes.profileUser.employmentSituation')}</span>
                  <p>{user?.person?.employmentSituation}</p>
                </div>
              </div>
            </>
          }
        </div>
      </div>
    </div>
  )
}