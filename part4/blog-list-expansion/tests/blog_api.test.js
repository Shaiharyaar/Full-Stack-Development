const testHelper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)
const bcrypt = require('bcrypt')

const User = require('../models/user')
const Blog = require('../models/blog')

describe('blogs api calls', () => {
  beforeAll(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash(testHelper.userInfo.password, 10)
    const user = new User({ username: testHelper.userInfo.username, password: passwordHash })
    await user.save()
  })

  beforeEach(async () => {
    await Blog.deleteMany({})
    const user = await api.post('/api/login/').send(testHelper.userInfo)
    const token = user.body.token
    for (let blog of testHelper.blogs) {
      await api.post('/api/blogs').send(blog).set('Authorization', `Bearer ${token}`).expect(201)
    }
  })

  describe('when there is initially some blogs saved', () => {
    test('blogs are returned as json', async () => {
      const user = await api.post('/api/login/').send(testHelper.userInfo)
      const token = user.body.token

      await api
        .get('/api/blogs/')
        .set('Authorization', `Bearer ${token}`)
        .expect(200)
        .expect('Content-Type', /application\/json/)
    })

    test('new blog can be added', async () => {
      const user = await api.post('/api/login/').send(testHelper.userInfo)
      const token = user.body.token
      console.log({ token })
      const newBlog = {
        title: 'React patterns part 2',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 0,
      }

      await api
        .post('/api/blogs')
        .send(newBlog)
        .set('Authorization', `Bearer ${token}`)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtEnd = await testHelper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(testHelper.blogs.length + 1)

      const contents = blogsAtEnd.map((n) => n.title)
      expect(contents).toContain(newBlog.title)
    })

    test('adding a blog without token fails with status code 401', async () => {
      const newBlog = {
        title: 'React patterns part 2',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 0,
      }

      const result = await api.post('/api/blogs').send(newBlog).expect(401)

      expect(result.body.error).toContain('invalid token')

      const blogsAtEnd = await testHelper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(testHelper.blogs.length)
    })
    test('adding a blog without token fails with status code 401', async () => {
      const newBlog = {
        title: 'React patterns part 2',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 0,
      }

      const result = await api.post('/api/blogs').send(newBlog).expect(401)

      expect(result.body.error).toContain('invalid token')

      const blogsAtEnd = await testHelper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(testHelper.blogs.length)
    })

    test('adding a blog with invalid token fails with status code 401', async () => {
      const newBlog = {
        title: 'React patterns part 2',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 0,
      }

      const result = await api
        .post('/api/blogs')
        .set('Authorization', 'Bearer wrong-token-data')
        .send(newBlog)
        .expect(401)

      expect(result.body.error).toContain('invalid token')

      const blogsAtEnd = await testHelper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(testHelper.blogs.length)
    })

    test('missing likes property value is 0', async () => {
      const user = await api.post('/api/login/').send(testHelper.userInfo)
      const token = user.body.token

      const newBlog = {
        title: 'React patterns part 3',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
      }
      await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(201)

      const blogs = await testHelper.blogsInDb()
      expect(blogs).toHaveLength(testHelper.blogs.length + 1)

      const findBlog = blogs.find((blog) => blog.title === newBlog.title)
      expect(findBlog.likes).toEqual(0)
    })

    test('missing url response as 400', async () => {
      const user = await api.post('/api/login/').send(testHelper.userInfo)
      const token = user.body.token

      const newBlog = {
        title: 'React patterns part 4',
        author: 'Michael Chan',
      }

      await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)
    })

    test('missing title response as 400', async () => {
      const user = await api.post('/api/login/').send(testHelper.userInfo)
      const token = user.body.token

      const newBlog = {
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
      }
      await api.post('/api/blogs').set('Authorization', `Bearer ${token}`).send(newBlog).expect(400)
    })
  })
  describe('deletion a specific blog', () => {
    test('succeeds with status code 204 if id is valid', async () => {
      const user = await api.post('/api/login/').send(testHelper.userInfo)
      const token = user.body.token

      const blogsAtStart = await testHelper.blogsInDb()
      const blogToDelete = blogsAtStart[0]

      await api
        .delete(`/api/blogs/${blogToDelete.id}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await testHelper.blogsInDb()
      expect(blogsAtEnd).toHaveLength(testHelper.blogs.length - 1)

      const titles = blogsAtEnd.map((r) => r.title)
      expect(titles).not.toContain(blogToDelete.title)
    })
  })

  describe('updating a specific blog', () => {
    test('201 status if id is valid', async () => {
      const user = await api.post('/api/login/').send(testHelper.userInfo)
      const token = user.body.token

      const blogsAtStart = await testHelper.blogsInDb()

      const blogsToUpdate = blogsAtStart[0]
      const newBlogObject = {
        likes: blogsToUpdate.likes + 1,
      }
      await api
        .put(`/api/blogs/${blogsToUpdate.id}`)
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogObject)
        .expect(201)

      const blogsAtEnd = await testHelper.blogsInDb()
      const individualObject = blogsAtEnd.find((blog) => blogsToUpdate.id === blog.id)
      expect(individualObject.likes).toEqual(newBlogObject.likes)
    })
    test('400 status if id is not valid', async () => {
      const user = await api.post('/api/login/').send(testHelper.userInfo)
      const token = user.body.token

      const blogsAtStart = await testHelper.blogsInDb()
      const blogsToUpdate = blogsAtStart[0]
      const newBlogObject = {
        likes: blogsToUpdate.likes + 1,
      }
      await api
        .put(`/api/blogs/${blogsToUpdate.id}-wrong-id`)
        .set('Authorization', `Bearer ${token}`)
        .send(newBlogObject)
        .expect(400)
    })
  })
})

afterAll(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})
