import { useRef } from 'react'
import { useDispatch } from 'react-redux'
import Blogs from '../components/Blogs'
import SubHeading from '../components/SubHeading'
import Togglable from '../components/Togglable'
import BlogForm from '../forms/BlogForm'
import { createBlogHandler } from '../redux/reducers/blogReducer'

const AllBlogs = () => {
  // ref
  const blogToggleRef = useRef()

  const dispatch = useDispatch()

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
    <Togglable ref={blogToggleRef} buttonLabel={'create new blog'}>
      <BlogForm handleSubmit={createBlog} />
    </Togglable>
  )

  return (
    <>
      <SubHeading title={'Create new'} />
      <div style={{ margin: '10px 0' }}>{blogForm()}</div>
      <Blogs />
    </>
  )
}

export default AllBlogs
