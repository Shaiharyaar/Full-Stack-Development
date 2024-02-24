import { useEffect, useRef, useState } from 'react'
import { useDispatch } from 'react-redux'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import SubHeading from './components/SubHeading'
import Togglable from './components/Togglable'
import BlogForm from './forms/BlogForm'
import {
  createBlogHandler,
  initializeBlogList
} from './redux/reducers/blogReducer'
import { setNotification } from './redux/reducers/notificationReducer'
import blogService from './services/blogs'
import loginService from './services/login'
import Login from './components/Login'
import { useSelector } from 'react-redux'
import { initializeUser, logoutUser } from './redux/reducers/userReducer'

const App = () => {
  // ref
  const blogToggleRef = useRef()

  // redux states
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const logout = () => dispatch(logoutUser())

  const createBlog = blogObject => {
    return new Promise((resolve, reject) => {
      dispatch(createBlogHandler(blogObject))
        .then(res => {
          if (res) {
            blogToggleRef.current.toggleVisibility()
            resolve(res)
          }
          reject(res)
        })
        .catch(err => {
          reject(err)
        })
    })
  }

  const blogForm = () => (
    <Togglable ref={blogToggleRef} buttonLabel={'new blog'}>
      <BlogForm handleSubmit={createBlog} />
    </Togglable>
  )

  useEffect(() => {
    dispatch(initializeUser())
    dispatch(initializeBlogList())
  }, [dispatch])

  if (!user) {
    return (
      <div>
        <SubHeading title={'Log in to application'} />
        <Notification />
        <Login />
      </div>
    )
  }

  return (
    <div>
      <SubHeading title={'blogs'} />
      <Notification />
      <div>
        {`${user?.name} logged in `}
        <button id={'logout-btn-id'} onClick={logout}>
          {'Logout'}
        </button>
      </div>
      <br />
      <SubHeading title={'Create new'} />
      {blogForm()}
      <Blogs user={user} />
    </div>
  )
}

export default App
