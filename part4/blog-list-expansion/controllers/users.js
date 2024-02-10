const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { title: 1, url: 1, likes: 1 })

  response.json(users)
})

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  if (!username && !password) {
    response.status(400).json({ error: 'Username and password are required' })
  } else if (password && password.length < 3 && username && username.length < 3) {
    response.status(400).json({ error: 'Username and password must be at least 3 characters' })
  } else if (!password) {
    response.status(400).json({ error: 'Password is required' })
  } else if (password.length < 3) {
    response.status(400).json({ error: 'Password must be at least 3 characters long' })
  } else {
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const user = new User({
      username,
      name,
      password: passwordHash,
    })

    const savedUser = await user.save()
    response.status(201).json(savedUser)
  }
})

module.exports = usersRouter
