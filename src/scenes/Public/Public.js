import * as React from 'react';
import { Router, Switch, Route } from 'react-router-dom';
import { history } from '../../index'
import { Login } from './Login/Login';

export const Public = () => {
  const redirectDefaul = () => {
    return { url: '/', component: Login };
  }

  const redirectDefault = redirectDefaul();

  return (
    <div>
      <Router history={history} >
        <Switch>
          <Route path="/" component={Login} />
          <Route exact path="/login" component={Login} />
          <Route component={redirectDefault.component} />
        </Switch>
      </Router>
    </div>
  )
}