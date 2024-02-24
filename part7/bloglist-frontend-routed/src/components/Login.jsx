import React, { useRef, useState } from 'react'
import Togglable from './Togglable'
import LoginForm from '../forms/LoginForm'
import { useDispatch } from 'react-redux'
import { setNotification } from '../redux/reducers/notificationReducer'
import loginService from '../services/login'
import { loginHandler, setUser } from '../redux/reducers/userReducer'
const Login = () => {
  // ref
  const loginToggleRef = useRef()

  // redux
  const dispatch = useDispatch()

  // states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // login handler
  const handleLogin = async event => {
    event.preventDefault()
    dispatch(loginHandler(username, password))
      .then(res => {
        if (res) {
          setUsername('')
          setPassword('')
        }
      })
      .catch(err => console.log({ err }))
  }

  return (
    <Togglable buttonLabel={'login'} ref={loginToggleRef}>
      <LoginForm
        username={username}
        password={password}
        handleUsernameChange={({ target }) => setUsername(target.value)}
        handlePasswordChange={({ target }) => setPassword(target.value)}
        handleLogin={handleLogin}
      />
    </Togglable>
  )
}

export default Login
