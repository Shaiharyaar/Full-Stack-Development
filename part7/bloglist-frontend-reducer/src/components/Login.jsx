import { useQueryClient } from '@tanstack/react-query'
import { useRef, useState } from 'react'
import { useNotificationDispatch } from '../context/Notification'
import { useUserDispatch } from '../context/User'
import LoginForm from '../forms/LoginForm'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Togglable from './Togglable'
const Login = () => {
  const queryClient = useQueryClient()

  // ref
  const loginToggleRef = useRef()

  // redux
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()
  // states
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  // login handler

  const handleLogin = async event => {
    event.preventDefault()
    try {
      const res = await loginService.login({
        username,
        password
      })
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
      loginToggleRef.current.toggleVisibility()

      if (res?.error) {
        notificationDispatch({
          type: 'SET_NOTIFICATION',
          payload: { color: 'red', message: res.error }
        })
        return
      }

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(res))
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          color: 'green',
          message: 'Successfully logged in'
        }
      })
      blogService.setToken(res.token)
      userDispatch({ type: 'SET_USER', payload: res })
      setUsername('')
      setPassword('')
    } catch (exception) {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: { color: 'red', message: 'Wrong credentials' }
      })
    }
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
