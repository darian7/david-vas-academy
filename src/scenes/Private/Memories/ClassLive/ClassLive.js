import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { category as categoryActions } from '../../../../services/Category/CategoryActions';
import { ReactComponent as NextBtn } from '../../../../assets/icons/next.svg';
import i18n from '../../../../i18n/i18n';
import { Skeleton } from 'antd';
import { HomeCardSkeleton } from '../../components/SkeletonScreens/HomeCardSkeleton/HomeCardSkeleton';
import { MemoryCardSkeleton } from '../../components/SkeletonScreens/MemoryCardSkeleton/MemoryCardSkeleton';

export const ClassLive = () => {
  const [currentMemorie, setCurrentMemorie] = useState(0)
  let history = useHistory()
  const { t } = useTranslation()
  const dispatch = useDispatch()

  const { loading, categorys } = useSelector(state => state.category)

  useEffect(() => {
    dispatch(categoryActions.getCategorys())
  }, [])


  return (
    <div className="courses class-live">
      <div className="courses-container">
        <div className="welcome-banner">
          <div>
            <h2>{t('scenes.memories.header')}</h2>
            <p>{t('scenes.memories.sub_header')}</p>
          </div>
        </div>
        <div className="class-live-cards">
          {loading.getCategorys ?
            [...Array(3)].map((item, i) => <MemoryCardSkeleton key={i} />) :
            categorys?.map((category) => (
              <div className="memory-card" key={category.id} >
                <div className="memory-card-content">
                  <h2>{category?.title[i18n.language]}</h2>
                  <img src={category.image} alt="memoria" />
                </div>
                <a type="button" onClick={() => history.push("/class-live-list", { categoryId: category.id })}>
                  {t('button.go_to')} {t('header.item.memories')}
                </a>
              </div>
            ))}
        </div>
        
        <div className="class-live-cards-responsive">
          <NextBtn className={`btn-right ${currentMemorie === 0 ? 'is-disabled' : ''} `} onClick={() => setCurrentMemorie(currentMemorie - 1)} />
          {categorys?.map((category, i) => (
            (currentMemorie === i) && <div className="memory-card" key={category.id} >
              <div className="memory-card-content">
                <h2>{category?.title[i18n.language]}</h2>
                <img src={category.image} alt="memoria" />
              </div>
              <a type="button" onClick={() => history.push("/class-live-list", { categoryId: category.id })}>
                {t('button.go_to')} {t('header.item.memories')}
              </a>
            </div>
          ))}
          <NextBtn className={`btn-left ${currentMemorie === categorys.length - 1 ? 'is-disabled' : ''} `} onClick={() => setCurrentMemorie(currentMemorie + 1)} />
        </div>
      </div>
    </div>
  )
}