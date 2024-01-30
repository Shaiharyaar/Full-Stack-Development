const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', (request, response) => {
  Blog.find({})
    .then((blogs) => {
      response.json(blogs)
    })
    .catch(() => {
      response.status(500).end()
    })
})

blogsRouter.post('/', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then((result) => {
      response.status(201).json(result)
    })
    .catch((err) => next(err))
})

module.exports = blogsRouter
