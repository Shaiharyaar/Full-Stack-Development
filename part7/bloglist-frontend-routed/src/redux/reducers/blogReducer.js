import { createSlice } from '@reduxjs/toolkit'
import blogService from '../../services/blogs'
import { setNotification } from './notificationReducer'

const blogSlice = createSlice({
  name: 'blog',
  initialState: {
    list: []
  },
  reducers: {
    blogListSetter(state, action) {
      return { ...state, list: action.payload }
    },
    addNewBlogToList(state, action) {
      return { ...state, list: [...state.list, action.payload] }
    }
  }
})

export const { blogListSetter, addNewBlogToList } = blogSlice.actions

export const setBlogList = list => {
  return async dispatch => {
    dispatch(blogListSetter(list))
  }
}

export const initializeBlogList = () => {
  return async dispatch => {
    const blogList = await blogService.getAll()
    dispatch(setBlogList(blogList))
  }
}

export const removeBlogFromList = id => {
  return (dispatch, getState) => {
    const blogList = getState().blog.list
    const updatedBlogList = blogList.filter(blog => blog.id !== id)
    dispatch(setBlogList(updatedBlogList))
  }
}

export const addUpdatedBlogInList = updatedBlog => {
  return (dispatch, getState) => {
    const blogList = getState().blog.list
    const updatedBlogList = blogList.map(blog =>
      blog.id === updatedBlog.id ? { ...updatedBlog, user: blog.user } : blog
    )
    dispatch(setBlogList(updatedBlogList))
  }
}

export const updateBlog = (id, payload) => {
  return async dispatch => {
    const res = await blogService.update(id, payload)
    dispatch(addUpdatedBlogInList(res))
  }
}

export const removeBlog = id => {
  return async dispatch => {
    await blogService.remove(id)
    dispatch(removeBlogFromList(id))
  }
}

export const createBlogHandler = newBlog => {
  return async dispatch => {
    try {
      const { title, author, url } = newBlog
      const blog = await blogService.create({
        title,
        author,
        url
      })
      if (blog?.error) {
        return Promise.reject({ error: blog.error })
      }
      dispatch(addNewBlogToList(blog))
      dispatch(
        setNotification({
          color: 'green',
          message: `a new blog ${title} by ${author} added`
        })
      )
      return Promise.resolve(true)
    } catch (exception) {
      dispatch(
        setNotification({
          color: 'red',
          message: 'Failed to create blog. Check your inputs'
        })
      )
      return Promise.reject({ error: exception?.message })
    }
  }
}

export default blogSlice.reducer
