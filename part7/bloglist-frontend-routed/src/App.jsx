import { useEffect } from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Notification from './components/Notification'
import SubHeading from './components/SubHeading'
import { initializeBlogList } from './redux/reducers/blogReducer'
import { initializeUser, logoutUser } from './redux/reducers/userReducer'
import AllBlogs from './views/AllBlogs'
import Blog from './views/Blog'
import Blogs from './views/Blogs'
import UsersDetails from './views/UsersDetails'

const Menu = () => {
  // redux states
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

  const logout = () => dispatch(logoutUser())

  const padding = {
    paddingRight: 5
  }
  return (
    <Navbar collapseOnSelect expand={'md'} bg={'dark'} variant={'dark'}>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link href="#" as="span">
            <Link to="/" style={padding}>
              blogs
            </Link>
          </Nav.Link>
          <Nav.Link href="#" as="span">
            <Link to="/users" style={padding}>
              users
            </Link>
          </Nav.Link>
          <span style={{ color: 'white' }}>
            {`${user?.name} logged in `}
            <button id={'logout-btn-id'} onClick={logout}>
              {'Logout'}
            </button>
          </span>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
}

const App = () => {
  // redux states
  const user = useSelector(state => state.user)

  const dispatch = useDispatch()

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
    <div className="container">
      <Menu />
      <SubHeading title={'blogs'} />
      <Notification />
      <br />
      <Routes>
        <Route path={'/'} element={<AllBlogs />} />
        <Route path={'/blog/:id'} element={<Blog />} />
        <Route path={'/users'} element={<UsersDetails />} />
        <Route path={'/user/:id'} element={<Blogs />} />
      </Routes>
    </div>
  )
}

export default App
