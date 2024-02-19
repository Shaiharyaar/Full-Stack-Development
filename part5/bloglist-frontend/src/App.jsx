import { useState, useEffect, useRef, useCallback } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './forms/LoginForm'
import BlogForm from './forms/BlogForm'
import SubHeading from './components/SubHeading'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import Togglable from './components/Togglable'

const App = () => {
  // ref
  const blogToggleRef = useRef()
  const loginToggleRef = useRef()

  // states
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const res = await loginService.login({
        username,
        password,
      })
      getBlogs()
      loginToggleRef.current.toggleVisibility()

      if (res?.error) {
        setNotification({ color: 'red', message: res.error })
        return
      }

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(res))
      setNotification({ color: 'green', message: 'Successfully logged in' })
      blogService.setToken(res.token)
      setUser(res)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotification({ color: 'red', message: 'Wrong credentials' })
    }
  }

  const logout = () => {
    window.localStorage.removeItem('loggedBlogAppUser')
    setUser(null)
    setBlogs([])
  }

  const createBlog = async (blogObject) => {
    const { title, author, url } = blogObject
    try {
      const blog = await blogService.create({
        title,
        author,
        url,
      })

      setBlogs((prev) => [...prev, blog])
      // update blogs again for user info update
      getBlogs()
      blogToggleRef.current.toggleVisibility()
      setNotification({ color: 'green', message: `a new blog ${title} by ${author} added` })
    } catch (exception) {
      console.log({ exception })
      setNotification({ color: 'red', message: 'Failed to create blog. Check your inputs' })
    }
  }

  const loginForm = () => (
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

  const blogForm = () => (
    <Togglable ref={blogToggleRef} buttonLabel={'new blog'}>
      <BlogForm handleSubmit={createBlog} />
    </Togglable>
  )

  const onLikePress = (blog) => async () => {
    try {
      const payload = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes + 1,
        url: blog.url,
        user: blog.user.id,
      }
      const res = await blogService.update(blog.id, payload)
      if (res) {
        getBlogs()
      }
    } catch (error) {
      console.log({ error: error.message })
    }
  }

  const onRemovePress = (blog) => async () => {
    try {
      if (blog.user.username === user?.username) {
        const isConfirm = window.confirm(`Remove blog ${blog.title} by ${blog.author}`)
        if (isConfirm) {
          await blogService.remove(blog.id)
          getBlogs()
        }
      } else {
        alert('You cannot update/delete this blog')
      }
    } catch (error) {
      console.log({ error: error.message })
    }
  }

  const getBlogs = () => blogService.getAll().then((blogs) => setBlogs(blogs))

  useEffect(() => {
    getBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    let timeoutId = null
    if (notification?.message) {
      timeoutId = setTimeout(() => {
        setNotification(null)
      }, 5000)
    }
    return () => {
      timeoutId && clearTimeout(timeoutId)
    }
  }, [notification?.message])

  if (!user) {
    return (
      <div>
        <SubHeading title={'Log in to application'} />
        <Notification color={notification?.color} message={notification?.message} />
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <SubHeading title={'blogs'} />
      <Notification color={notification?.color} message={notification?.message} />
      <div>
        {`${user?.name} logged in `}
        <button id={'logout-btn-id'} onClick={logout}>
          {'Logout'}
        </button>
      </div>
      <br />
      <SubHeading title={'Create new'} />
      {blogForm()}
      <Blogs list={blogs} user={user} onLikePress={onLikePress} onRemovePress={onRemovePress} />
    </div>
  )
}

export default App
