import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useDispatch } from 'react-redux'
import { auth as authActions } from '../../../../services/Auth/AuthActions'

export const ListCourses = (
) => {

  const dispatch = useDispatch()
  const { t } = useTranslation()

  useEffect(() => {
  }, [])

  const goLogout = () => {
    dispatch(authActions.logout())
  }

  return (
    <div>
      <div>
        <h1 style={{ backgroundColor: "white" }}>
          courses
        </h1>
        <button onClick={goLogout} >
          {t(`button.logout`)}
        </button>
      </div>
    </div>
  )
}
