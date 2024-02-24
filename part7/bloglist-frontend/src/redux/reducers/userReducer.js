import { createSlice } from '@reduxjs/toolkit'
import loginService from '../../services/login'
import { setNotification } from './notificationReducer'
import blogService from '../../services/blogs'

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    logoutUser() {
      window.localStorage.removeItem('loggedBlogAppUser')
      return null
    }
  }
})
export const { setUser, logoutUser } = userSlice.actions

export const loginHandler = (username, password) => {
  return async dispatch => {
    try {
      const res = await loginService.login({
        username,
        password
      })
      if (res?.error) {
        dispatch(setNotification({ color: 'red', message: res.error }, 5000))
        return Promise.reject({ error: res.error })
      }
      dispatch(setUser(res))
      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(res))
      dispatch(
        setNotification(
          { color: 'green', message: 'Successfully logged in' },
          5000
        )
      )
      blogService.setToken(res.token)
      return Promise.resolve(true)
    } catch (exception) {
      dispatch(
        setNotification({ color: 'red', message: 'Wrong credentials' }, 5000)
      )
      return Promise.reject({ error: exception?.message })
    }
  }
}

export const initializeUser = () => {
  return dispatch => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}
export default userSlice.reducer
