/* eslint-disable react-refresh/only-export-components */
import { createContext, useEffect, useContext, useReducer } from 'react'
import PropTypes from 'prop-types'
import blogService from '../services/blogs'
const userReducer = (state, action) => {
  switch (action.type) {
    case 'SET_USER':
      return action.payload
    default:
      return state
  }
}

const UserContext = createContext()

export const useUserValue = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[0]
}
export const useUserDispatch = () => {
  const userAndDispatch = useContext(UserContext)
  return userAndDispatch[1]
}

export const UserContextProvider = props => {
  const [user, userDispatch] = useReducer(userReducer, null)

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const res = JSON.parse(loggedUserJSON)
      userDispatch({ type: 'SET_USER', payload: res })
      blogService.setToken(res.token)
    }
  }, [])

  return (
    <UserContext.Provider value={[user, userDispatch]}>
      {props.children}
    </UserContext.Provider>
  )
}

UserContextProvider.propTypes = {
  children: PropTypes.element
}

export default UserContext
