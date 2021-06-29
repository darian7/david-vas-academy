import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { message } from 'antd';

import i18n from '../../../../../i18n/i18n';
import { temary as temaryActions } from '../../../../../services/Temary/TemaryActions';
import SpinIndicator from '../../../../../components/SpinIndicator/SpinIndicator';

export const ProfileModule = ({ module: isModule }) => {

  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { loading } = useSelector(state => state.temary)

  const errorModuleStart = () => {
    message.error(t('error.general_error'));
  }

  const startModule = () => {
    if(isModule && !loading.temary_start)
    dispatch(temaryActions.temaryStart(isModule, isModule?.course?.id, errorModuleStart))
  }

  return (
    <div className="profile-module">
      <h2>{t('scenes.modules.module')} {isModule?.order}</h2>
      <p className="p-top">{isModule?.title[i18n.language]}</p>
      <p>{isModule?.description[i18n.language]}</p>
      <a onClick={startModule} type="button">
        {loading.temary_start && <SpinIndicator />}
        {t('button.begin')}
      </a>
    </div>
  )
}