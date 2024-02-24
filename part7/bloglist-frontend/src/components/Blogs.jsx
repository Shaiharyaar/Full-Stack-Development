import React from 'react'
import Blog from './Blog'
import { useSelector, useDispatch } from 'react-redux'
import { removeBlog, updateBlog } from '../redux/reducers/blogReducer'

const Blogs = ({ user }) => {
  // dispatch
  const dispatch = useDispatch()

  // redux state
  const blogs = useSelector(state => state.blog.list)

  const onLikePress = blog => async () => {
    try {
      const payload = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes + 1,
        url: blog.url,
        user: blog.user.id
      }

      dispatch(updateBlog(blog.id, payload))
    } catch (error) {
      console.log({ error: error.message })
    }
  }

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
    <>
      {[...blogs]
        .sort((a, b) => b.likes - a.likes)
        .map(blog => (
          <div key={blog.id}>
            <Blog
              blog={blog}
              user={user}
              onLikePress={onLikePress(blog)}
              onRemovePress={onRemovePress(blog)}
            />
          </div>
        ))}
    </>
  )
}

export default Blogs
