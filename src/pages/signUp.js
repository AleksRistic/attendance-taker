import React, { useState } from 'react'
import api from '../services/api'
import history from '../services/history'
import { useSelector, useDispatch } from 'react-redux'
import {
  setInstructorId,
  setIsSignedIn,
  setIsSignedUp
} from '../store/modules/instructor/actions'

function signUp() {
  const [firstName, setFirstName] = useState()
  const [lastName, setLastName] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()

  const dispatch = useDispatch()

  async function handleSignUpClick() {
    const response = await api.post('/signup', {
      firstName,
      lastName,
      email,
      password
    })

    dispatch(setIsSignedUp(true))
    if (response.data === 'Success') {
      history.push('/login', { email: email, password: password })
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h3>Sign Up</h3>

        <div className="form-group">
          <label>First name</label>
          <input
            type="text"
            className="form-control"
            placeholder="First name"
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Last name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Last name"
            onChange={(e) => setLastName(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          onClick={() => handleSignUpClick()}
        >
          Sign Up
        </button>
        <p className="forgot-password text-right">
          Already registered{' '}
          <a onClick={() => dispatch(setIsSignedUp(true))} href="/login">
            sign in?
          </a>
        </p>
      </div>
    </div>
  )
}

export default signUp
