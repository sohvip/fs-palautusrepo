const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
  })

usersRouter.post('/', async (request, response, next) => {
  const { username, name, password } = request.body

  if (username === undefined) {
    return response.status(400).json({ error: 'username needed' })
  }

  if (username.length < 3) {
    return response.status(400).json({ error: 'username is too short' })
  }

  if (await User.findOne({ username })) {
    return response.status(400).json({
      error: 'username is already in use'
    })
  }

  if (password === undefined) {
    return response.status(400).json({ error: 'password needed' })
  }

  if (password.length < 3) {
    return response.status(400).json({ error: 'password is too short' })
  }

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = usersRouter
