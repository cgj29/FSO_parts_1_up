const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request,response) => {
  const { username, password } = request.body
  /**
   * finds username from database
   */
  const user = await User.findOne({ username })

  /**
   * checks that 1) user found in the database is not a null value (ie a user with that username exists)
   * and 2) the password entered
   * and the saved password hash match
   */
  const passwordCorrect = user === null
    ? false
    : await bcrypt.compare(password, user.passwordHash)
  /**
   * if user if falsey (ie a null value) or password is incorrect
   * then a 401 error is returned
   */
  if (!(user && passwordCorrect)){
    return response.status(401).json({
      error: 'invald username or password'
    })
  }

  const userForToken = {
    username: user.username,
    id: user._id
  }

  /**
   * set an experiation on token 60*60*12 seconds (aka 12 hrs)
   */

  const token = jwt.sign(
    userForToken,
    process.env.SECRET,
    { expiresIn: 60*60*12 }
  )
  /**
   * the created token contains the user name and user id in a digitally signed form
   * this token is signed using a string from the environmental variable SECRET.
   * This ensures that only parties who know the secret (ie our backend) can generate
   * a valid token
   */

  response
    .status(200)
    .send({ token, username: user.username, name: user.name })
})

module.exports = loginRouter