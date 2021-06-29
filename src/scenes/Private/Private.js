import React, { useEffect } from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import io from 'socket.io-client'

import { history } from '../../index'
import { ListCourses } from './Courses/ListCourses/ListCourses';
import { ClassLive } from './Memories/ClassLive/ClassLive';
import { Header } from './components/Layout/Header/Header';
import { ProfileCourse } from './Courses/ProfileCourse/ProfileCourse';
import { ProgressCourse } from './Courses/ProgressCourse/ProgressCourse';
import { user as userActions } from '../../services/User/UserActions';
import { ProfileUser } from './ProfileUser/ProfileUser';
import { Module } from './Module/Module';
import { FrequentQuestions } from './FrequentQuestions/FrequentQuestions';
import { ClassLiveList } from './Memories/ClassLiveList/ClassLiveList';
import { SocialButtons } from '../../components/SocialButtons/SocialButtons';
import { MenuResponsive } from './components/Layout/MenuResponsive/MenuResponsive';
import { Events } from './Events/Events';
import { apiUrl } from '../../common/config/Environments';
import { video as videoActions } from '../../services/Video/VideoActions';
import { TutorialList } from './Tutorials/TutorialList/TutorialList';
import { Tutorial } from './Tutorials/Tutorial/Tutorial';
import { Tool } from './Tools/Tool/Tool';
import { ToolList } from './Tools/ToolList/ToolList';

export const Private = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(userActions.getUser())

    const socket = io(apiUrl?.slice(0, -3), { forceNew: true })
    socket.on('data', handleEventSocketDat)
  }, [])

  const redirectDefaul = () => {
    return { url: '/courses', component: ListCourses };
  }

  const handleEventSocketDat = (data) => {
    if (data?.live)
      dispatch(videoActions.getVideoLive())
  }

  const redirectDefault = redirectDefaul();

  return (
    <div className="transition-page">
      <Router history={history}>
        <Header />
        <SocialButtons />
        <Switch className="h-100">
          <Route path="/home" component={ListCourses} />
          <Route exact path="/courses" component={ListCourses} />
          <Route exact path="/course-profile" component={ProfileCourse} />
          <Route exact path="/course-progress" component={ProgressCourse} />
          <Route exact path="/class-live" component={ClassLive} />
          <Route exact path="/class-live-list" component={ClassLiveList} />
          <Route exact path="/user-profile" component={ProfileUser} />
          <Route exact path="/module" component={Module} />
          <Route exact path="/questions-frequent" component={FrequentQuestions} />
          <Route exact path="/menu" component={MenuResponsive} />
          <Route exact path="/events" component={Events} />
          <Route exact path="/tutorial" component={Tutorial} />
          <Route exact path="/tutorial-list" component={TutorialList} />
          <Route exact path="/tool" component={Tool} />
          <Route exact path="/tool-list" component={ToolList} />
          <Route component={redirectDefault.component} />
        </Switch>
      </Router>
    </div>
  )
}