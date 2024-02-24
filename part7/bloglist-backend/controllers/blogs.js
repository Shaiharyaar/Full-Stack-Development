const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', {
    username: 1,
    name: 1
  })
  response.json(blogs)
})

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {
  const { user, body } = request

  const blog = new Blog({
    ...body,
    likes: body.likes || 0,
    user: user.id
  })

  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

blogsRouter.delete(
  '/:id',
  middleware.userExtractor,
  async (request, response) => {
    const id = request.params.id

    const { user } = request

    const blogToDelete = await Blog.findById(id)

    if (!blogToDelete) {
      response.status(404).json({ message: 'blog not found' })
    } else if (blogToDelete.user.toString() === user.id) {
      await User.findByIdAndUpdate(user.id, { $pull: { blogs: id } })
      await Blog.findByIdAndDelete(id)
      response.status(204).json({ message: 'blog deleted' })
    } else {
      response
        .status(403)
        .json({ error: 'You do not have permission to access this data.' })
    }
  }
)

blogsRouter.put('/:id', middleware.userExtractor, async (request, response) => {
  const id = request.params.id

  const { user } = request
  const blogToUpdate = await Blog.findById(id)

  if (!blogToUpdate) {
    response.status(404).json({ message: 'blog not found' })
  } else if (blogToUpdate.user.toString() === user.id) {
    const result = await Blog.findByIdAndUpdate(id, request.body, { new: true })
    response.status(201).send(result)
  } else {
    response
      .status(403)
      .json({ error: 'You do not have permission to access this data.' })
  }
})

module.exports = blogsRouter
