import React, { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';

import { history } from '../../index'
import { ListCourses } from './Courses/ListCourses/ListCourses';

export const Private = (
) => {
  useEffect(() => {
  }, [])

  const redirectDefaul = () => {
    return { url: '/courses', component: ListCourses };
  }

  const redirectDefault = redirectDefaul();

  return (
    <div className="transition-page">
      <Router history={history}>
        <Switch className="h-100">
          <Route path="/home" component={ListCourses} />
          <Route exact path="/courses" component={ListCourses} />
          <Route component={redirectDefault.component} />
        </Switch>
      </Router>
    </div>
  )
}