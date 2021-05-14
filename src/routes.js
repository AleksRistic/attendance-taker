import React from 'react'
import { Switch } from 'react-router-dom'
import RouteWrapper from './RouteWrapper'
import Login from './pages/login'
import Main from './pages/main'
import SignUp from './pages/signUp'

function Routes() {
  return (
    <Switch>
      <RouteWrapper path="/signup" exact component={SignUp} />
      <RouteWrapper path="/login" exact component={Login} />
      <RouteWrapper path="/" exact component={Main} />
    </Switch>
  )
}

export default Routes
