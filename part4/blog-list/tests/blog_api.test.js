const testHelper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)

const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})

  for (let blog of testHelper.blogs) {
    let blogObject = new Blog(blog)
    await blogObject.save()
  }
})

describe('blogs api calls', () => {
  describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
      await api
        .get('/api/blogs/')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('all blogs are returned', async () => {
      const allBlogs = await testHelper.blogsInDb()

      expect(allBlogs).toHaveLength(testHelper.blogs.length)
    })

    test('unique identifier named as id', async () => {
      const allBlogs = await testHelper.blogsInDb()
      allBlogs.forEach(({ id }) => {
        expect(id).toBeDefined()
      })
    })

    test('new blog can be added', async () => {
      const newBlog = {
        title: 'React patterns part 2',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 0,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await testHelper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(testHelper.blogs.length + 1)

      const contents = blogsAtEnd.map((n) => n.title)
      expect(contents).toContain(newBlog.title)
    })

    test('missing likes property value is 0', async () => {
      const newBlog = {
        title: 'React patterns part 3',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
      }
      await api.post('/api/blogs').send(newBlog).expect(201)

      const blogs = await testHelper.blogsInDb()
      expect(blogs).toHaveLength(testHelper.blogs.length + 1)

      const findBlog = blogs.find((blog) => blog.title === newBlog.title)
      expect(findBlog.likes).toEqual(0)
    })

    test('missing url response as 400', async () => {
      const newBlog = {
        title: 'React patterns part 4',
        author: 'Michael Chan',
      }

      await api.post('/api/blogs').send(newBlog).expect(400)
    })

    test('missing title response as 400', async () => {
      const newBlog = {
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
      }
      await api.post('/api/blogs').send(newBlog).expect(400)
    })
  })
  describe('deletion a specific blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const blogsAtStart = await testHelper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api.delete(`/api/blogs/${blogToDelete.id}`).expect(204)

      const blogsAtEnd = await testHelper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(testHelper.blogs.length - 1)

      const titles = blogsAtEnd.map((r) => r.title)
      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  describe('updating a specific blog', () => {
    test('201 status if id is valid', async () => {
      const blogsAtStart = await testHelper.blogsInDb()

      const blogsToUpdate = blogsAtStart[0]
      const newBlogObject = {
        likes: blogsToUpdate.likes + 1,
      }
      await api.put(`/api/blogs/${blogsToUpdate.id}`).send(newBlogObject).expect(201)

      const blogsAtEnd = await testHelper.blogsInDb()
      const individualObject = blogsAtEnd.find((blog) => blogsToUpdate.id === blog.id)
      expect(individualObject.likes).toEqual(newBlogObject.likes)
    })
    test('400 status if id is not valid', async () => {
      const blogsAtStart = await testHelper.blogsInDb()
      const blogsToUpdate = blogsAtStart[0]
      const newBlogObject = {
        likes: blogsToUpdate.likes + 1,
      }
      await api.put(`/api/blogs/${blogsToUpdate.id}-wrong-id`).send(newBlogObject).expect(400)
    })
  })
})

afterAll(async () => {
  await mongoose.connection.close()
})
