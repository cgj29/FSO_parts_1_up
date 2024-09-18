const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const app = require('../app')
const helper = require('./test_helper')
const bcrypt = require('bcryptjs')
const User = require('../models/user')

const api = supertest(app)

describe('when there is initally one user in db', () => {
  beforeEach(async () => {
    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
  })

  test('creation success with a fresh username', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length +1)
    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })

  test('creation fails when username and/or password is too short', async () => {
    const usersAtStart = await helper.usersInDb()

    const testUserFull = {
      username: 'mluukai',
      name: 'Matti Luukainen',
      password: 'salainen'
    }
    const tooShortPassword = { ...testUserFull, password: testUserFull.password.slice(0,2) }
    assert(tooShortPassword.password.length < 3)
    const resultTooShortPassword = await api
      .post('/api/users')
      .send(tooShortPassword)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    assert(resultTooShortPassword.body.error.includes('username and password not greater than min length of 3 chars'))

    const tooShortName = { ...testUserFull, username: testUserFull.username.slice(0,2) }
    assert(tooShortName.username.length < 3)
    const resultTooShortUsername = await api
      .post('/api/users')
      .send(tooShortName)
      .expect(401)
      .expect('Content-Type', /application\/json/)
    assert(resultTooShortUsername.body.error.includes('username and password not greater than min length of 3 chars'))

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
  })

  test('creation of a username fails when that username already exists', async() => {
    const usersAtStart = await helper.usersInDb()
    const duplicateUserNameA = {
      username: 'mluukai',
      name: 'Matti Luukainen',
      password: 'salainen'
    }

    await api
      .post('/api/users')
      .send(duplicateUserNameA)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtMiddle = await helper.usersInDb()
    assert.strictEqual(usersAtStart.length+1, usersAtMiddle.length)

    const duplicateUserNameB = {
      username: 'mluukai',
      name: 'Matti Luukainen The Second of His Name',
      password: 'salainen2'
    }

    const resultDuplicateUsername = await api
      .post('/api/users')
      .send(duplicateUserNameB)
      .expect(401)
      .expect('Content-Type', /application\/json/)

    assert(resultDuplicateUsername.body.error.includes('username already exists'))
    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtMiddle.length)
  })

})

after(async () => {
  await mongoose.connection.close()
})