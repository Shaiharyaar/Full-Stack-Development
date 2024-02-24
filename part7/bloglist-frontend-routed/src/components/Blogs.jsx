import { Table } from 'react-bootstrap'
import React from 'react'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { removeBlog, updateBlog } from '../redux/reducers/blogReducer'

const Blogs = () => {
  // dispatch
  const dispatch = useDispatch()

  // redux state
  const blogs = useSelector(state => state.blog.list)
  const user = useSelector(state => state.user)

  const onRemovePress = blog => async () => {
    try {
      if (blog.user.username === user?.username) {
        const isConfirm = window.confirm(
          `Remove blog ${blog.title} by ${blog.author}`
        )
        if (isConfirm) {
          dispatch(removeBlog(blog.id))
        }
      } else {
        alert('You cannot update/delete this blog')
      }
    } catch (error) {
      console.log({ error: error.message })
    }
  }
  return (
    <Table striped>
      <tbody>
        {[...blogs]
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              user={user}
              onRemovePress={onRemovePress(blog)}
            />
          ))}
      </tbody>
    </Table>
  )
}

export default Blogs
