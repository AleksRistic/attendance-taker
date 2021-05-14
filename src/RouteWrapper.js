import React from 'react'
import PropTypes from 'prop-types'
import { useSelector } from 'react-redux'
import { Route } from 'react-router-dom'
import SignUp from './pages/signUp'
import Login from './pages/login'

export default function RouteWrapper({
  component: Component,
  isPrivate = false,
  ...rest
}) {
  const signedIn = useSelector((state) => state.instructor.isSignedIn)
  const signedUp = useSelector((state) => state.instructor.isSignedUp)

  if (!signedIn && signedUp) {
    return <Route render={() => <Login />} />
  }
  if (!signedUp) {
    return <Route render={() => <SignUp />} />
  }

  return <Route {...rest} render={(props) => <Component {...props} />} />
}

RouteWrapper.propTypes = {
  isPrivate: PropTypes.bool,
  component: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired
}

RouteWrapper.defaultProps = {
  isPrivate: false
}
