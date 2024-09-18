
const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  if( username.length < 3 || password.length < 3 ){
    return response
      .status(401)
      .json({ error: 'username and password not greater than min length of 3 chars' })
  }
  const matchingUser = await User.findOne({ 'username' : username })
  if (matchingUser){
    return response
      .status(401)
      .json({ error: 'username already exists' })
  }
  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username, name, passwordHash
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

usersRouter.get('/', async (request, response) => {
  const users = await User
    .find({}).populate('blogs', {
      title: 1,
      author: 1,
      url: 1,
      likes: 1,
    })
  response.json(users)
})

usersRouter.get('/:id', async (request, response) => {
  const user = await User.findById(request.params.id)
  if (!user.id) {
    return response.status(401).json({ error: 'user not found' })
  }
  return response.json(user)
})

module.exports = usersRouter