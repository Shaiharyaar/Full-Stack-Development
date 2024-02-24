import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRef } from 'react'
import Blogs from './components/Blogs'
import Login from './components/Login'
import Notification from './components/Notification'
import SubHeading from './components/SubHeading'
import Togglable from './components/Togglable'
import { useNotificationDispatch } from './context/Notification'
import { useUserDispatch, useUserValue } from './context/User'
import BlogForm from './forms/BlogForm'
import { createBlog } from './requests/blogs'

const App = () => {
  // ref
  const blogToggleRef = useRef()

  // redux states
  const user = useUserValue()
  const userDispatch = useUserDispatch()
  const notificationDispatch = useNotificationDispatch()

  const queryClient = useQueryClient()
  const createBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: newBlog => {
      const blog = queryClient.getQueryData(['blogs'])
      queryClient.setQueryData(['blogs'], blog.concat(newBlog))
      blogToggleRef.current.toggleVisibility()
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: {
          message: `You added blog "${newBlog.title} by ${newBlog.author}"`,
          color: 'green'
        }
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 3000)
      return true
    },
    onError: res => {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: { message: res.response.data.error, color: 'red' }
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 3000)
      return false
    }
  })
  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    userDispatch({ type: 'SET_USER', payload: null })
  }

  const addBlog = blogObject => {
    return new Promise((resolve, reject) => {
      createBlogMutation
        .mutateAsync(blogObject)
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
      <BlogForm handleSubmit={addBlog} />
    </Togglable>
  )

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
