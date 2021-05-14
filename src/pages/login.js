import React, { useEffect, useState } from 'react'
import api from '../services/api'
import {} from '../services/getData'
import { useSelector, useDispatch } from 'react-redux'
import {
  setInstructorId,
  setIsSignedIn,
  setIsSignedUp
} from '../store/modules/instructor/actions'
import history from '../services/history'

function login(props) {
  const [username, setUsername] = useState()
  const [formPassword, setFormPassword] = useState()
  const { instructorId, isSignedIn } = useSelector((state) => state.instructor)

  const dispatch = useDispatch()

  useEffect(() => {
    if (props.location) {
      if (props.location.state.email && props.location.state.password) {
        setUsername(props.location.state.email)
        setFormPassword(props.location.state.password)
        handleSubmitClick()
      }
    }
  }, [])

  async function handleSubmitClick() {
    const result = await api.get('/checkcredentials', {
      params: {
        username,
        password: formPassword
      }
    })

    if (result.data !== 'Incorrect') {
      //set Redux states: isSignedIn, instructorId
      dispatch(setIsSignedIn(true))
      dispatch(setInstructorId(result.data))
      history.push('/')
    }
  }

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <h3>Sign In</h3>

        <div className="form-group">
          <label>Email address</label>
          <input
            type="email"
            className="form-control"
            placeholder="Enter email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            placeholder="Enter password"
            value={formPassword}
            onChange={(e) => setFormPassword(e.target.value)}
          />
        </div>

        <div className="form-group">
          <div className="custom-control custom-checkbox">
            <input
              type="checkbox"
              className="custom-control-input"
              id="customCheck1"
            />
            <label className="custom-control-label" htmlFor="customCheck1">
              Remember me
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="btn btn-primary btn-block"
          onClick={() => handleSubmitClick()}
        >
          Submit
        </button>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <p className="forgot-password text-left">
            <a onClick={() => dispatch(setIsSignedUp(false))} href="/signup">
              Sign Up
            </a>{' '}
            For An Account
          </p>
          <p className="forgot-password text-right">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default login
