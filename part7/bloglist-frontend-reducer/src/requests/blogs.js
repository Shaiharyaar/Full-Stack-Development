import blogService from '../services/blogs'

const getBlogs = () => {
  return blogService.getAll()
}

const createBlog = async newBlog => {
  return await blogService.create(newBlog)
}
const updateBlog = async newBlog => {
  const { id, ...updatedBlog } = newBlog
  return await blogService.update(id, updatedBlog)
}

const removeBlog = async id => {
  return await blogService.remove(id)
}

export { getBlogs, createBlog, updateBlog, removeBlog }
