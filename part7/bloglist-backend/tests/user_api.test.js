const bcrypt = require('bcrypt')
const User = require('../models/user')
const testHelper = require('./test_helper')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../index')
const api = supertest(app)

describe('some users api calls', () => {
  describe('when there is initially one user in db', () => {
    beforeEach(async () => {
      await User.deleteMany({})

      const passwordHash = await bcrypt.hash('sekret', 10)
      const user = new User({ username: 'root', password: passwordHash })

      await user.save()
    })

    test('creation succeeds with a fresh username', async () => {
      const usersAtStart = await testHelper.usersInDb()

      const newUser = {
        username: 'Sherry123',
        password: 'suomea'
      }

      await api
        .post('/api/users')
        .send(newUser)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const usersAtEnd = await testHelper.usersInDb()
      expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(u => u.username)
      expect(usernames).toContain(newUser.username)
    })
  })

  test('creation fails with proper statuscode and message if username and password are undefined', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      name: 'Su'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Username and password are required')

    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
  test('creation fails with proper statuscode and message if username is undefined and password is valid', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      name: 'Su',
      password: '123'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'User validation failed: username: Path `username` is required.'
    )

    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
  test('creation fails with proper statuscode and message if username is valid and password is undefined', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: '12',
      name: 'Su'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('Password is required')

    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
  test('creation fails with proper statuscode and message if username and password are invalid', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: '12',
      name: 'Su',
      password: 'su'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'Username and password must be at least 3 characters'
    )

    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
  test('creation fails with proper statuscode and message if username is invalid', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: '12',
      name: 'Superuser',
      password: 'suomea'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      '`username` (`' +
        newUser.username +
        '`) is shorter than the minimum allowed length (3).'
    )

    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
  test('creation fails with proper statuscode and message if password is invalid', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'hello123',
      name: 'Superuser',
      password: 'su'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain(
      'Password must be at least 3 characters long'
    )

    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
  test('creation fails with proper statuscode and message if username is not unique', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'root',
      name: 'Superuser',
      password: 'suomea123'
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(result.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toEqual(usersAtStart)
  })
  test('creation passes with proper statuscode and message if username and password are valid', async () => {
    const usersAtStart = await testHelper.usersInDb()

    const newUser = {
      username: 'hey123',
      name: 'Superuser',
      password: 'skill123'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const usersAtEnd = await testHelper.usersInDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
})

afterAll(async () => {
  await User.deleteMany({})
  await mongoose.connection.close()
})
