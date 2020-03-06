import {BrowserRouter, Route, Switch} from 'react-router-dom'
import Home from './home'
import Vote from './vote'
import AddFriend from './add_friend'
import React from 'react'


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route component={Home} exact path="/" />
      <Route component={Vote} exact path="/vote" />
      <Route component={AddFriend} exact path="/add-friend" />
    </Switch>
  </BrowserRouter>
)

export default Routes
