const { test, describe, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const assert = require('node:assert')
const bcrypt = require('bcryptjs')
const jwt =  require('jsonwebtoken')


const app = require('../app')
const helper = require('./test_helper')
const listHelper = require('../utils/list_helper')
const Blog = require('../models/blog')
const User = require('../models/user')


const api = supertest(app)

describe('api tests', async () => {
  let token

  beforeEach(async () => {
    await Blog.deleteMany({})
    const blogObjects = helper.initialBlogs.map(b => new Blog(b))
    const promiseArray = blogObjects.map(b => b.save())
    await Promise.all(promiseArray)

    await User.deleteMany({})
    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    const savedUser = await user.save()
    /**
     * create token for user
     */
    const userForToken = {
      username: savedUser.username,
      id: savedUser._id
    }
    token = jwt.sign(userForToken, process.env.SECRET)
  })

  test('blogs are returned as a json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
  })

  test('each blog has a unique identifier, id', async () => {
    const response = await helper.blogsInDb()
    const result = listHelper.uniqueBlogIds(response)
    assert.strictEqual(result, 'every blog has a unique id')
  })

  test('posting to databse works correctly', async () => {
    const postedBlog = {
      title: 'Testing Blog for HTTP Post',
      author: 'Connor Juckniess',
      url: 'https://homepages.cwi.nl/~storm/teaching/connor.pdf',
      likes: 1,
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(postedBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length +1)
    const blogsAtEndTitles = blogsAtEnd.map(b => b.title)
    assert(blogsAtEndTitles.includes(postedBlog.title))
  })

  test('posting a blog without likes set the default values to 0', async () => {
    const postedBlog = {
      title: 'Testing Blog for HTTP Post with no likes',
      author: 'Connor Juckniess',
      url: 'https://homepages.cwi.nl/~storm/teaching/connor.pdf',
    }

    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(postedBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const addedBlog = await Blog.find({ 'title': postedBlog.title })
    assert.strictEqual(addedBlog[0].likes, 0)
  })

  test('a blog without title or url results in 400', async () => {
    let badTestBlog = {
      // title: 'Testing Blog for HTTP Post',
      author: 'Connor Juckniess',
      url: 'https://homepages.cwi.nl/~storm/teaching/connor.pdf',
      likes: 1,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(badTestBlog)
      .expect(400)


    badTestBlog = {
      title: 'Testing Blog for HTTP Post',
      author: 'Connor Juckniess',
      // url: 'https://homepages.cwi.nl/~storm/teaching/connor.pdf',
      likes: 1,
    }
    await api
      .post('/api/blogs')
      .set('Authorization', `Bearer ${token}`)
      .send(badTestBlog)
      .expect(400)
  })

  describe('deletion of a blog', () => {
    test('succeeds with a 204 status when id is valid', async () => {
      const blogsAtStart = await helper.blogsInDb()
      /**
       * post new blog with author
       */
      const blogToBeDeleted = {
        title: 'Test Suite: to be deleted',
        author: 'Unknown Unknown-sons',
        url: 'https://empty.string.com',
        likes: 2
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(blogToBeDeleted)
        .expect(201)
        .expect('Content-Type', /application\/json/)


      const blogsAtMiddle = await helper.blogsInDb()
      assert.strictEqual(blogsAtStart.length+1, blogsAtMiddle.length)
      const toBeDeletedReturnedBlog = await Blog.find({ 'title': 'Test Suite: to be deleted' })
      const toBeDeletedReturnedId = toBeDeletedReturnedBlog[0].toJSON().id
      await api
        .delete(`/api/blogs/${toBeDeletedReturnedId}`)
        .set('Authorization', `Bearer ${token}`)
        .expect(204)

      const blogsAtEnd = await helper.blogsInDb()
      const contents = blogsAtEnd.map(b => b.title)
      assert(!contents.includes(blogToBeDeleted.title))
      assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    })

    test('fails with 401 if deletion is not authorized', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const badTestBlog = {
        title: 'No authorization Header',
        author: 'Unknown Unknown-sons',
        url: 'https://empty.string.com',
        likes: 2
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(badTestBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtMiddle = await helper.blogsInDb()
      assert.strictEqual(blogsAtStart.length+1, blogsAtMiddle.length)
      const toBeDeletedReturnedBlog = await Blog.find({ 'title': 'No authorization Header' })
      const toBeDeletedReturnedId = toBeDeletedReturnedBlog[0].toJSON().id
      const deleteTestResult = await api
        .delete(`/api/blogs/${toBeDeletedReturnedId}`)
        .expect(401)
        .expect('Content-Type', /application\/json/)
      assert(deleteTestResult.body.error.includes('token invalid'))
    })

    test('fails with 401 if deletion uses a different authorization', async () => {
      const passwordHash2 = await bcrypt.hash('sekretDOS', 10)
      const user2 = new User({ username: 'root2', passwordHash2 })
      const savedUser2 = await user2.save()
      const user2ForToken = {
        username: savedUser2.username,
        id: savedUser2._id
      }
      const token2 = jwt.sign(user2ForToken, process.env.SECRET)

      const blogsAtStart = await helper.blogsInDb()
      const badTestBlog = {
        title: 'No authorization Header',
        author: 'Unknown Unknown-sons',
        url: 'https://empty.string.com',
        likes: 2
      }
      await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${token}`)
        .send(badTestBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

      const blogsAtMiddle = await helper.blogsInDb()
      assert.strictEqual(blogsAtStart.length+1, blogsAtMiddle.length)
      const toBeDeletedReturnedBlog = await Blog.find({ 'title': 'No authorization Header' })
      const toBeDeletedReturnedId = toBeDeletedReturnedBlog[0].toJSON().id
      const deleteTestResult = await api
        .delete(`/api/blogs/${toBeDeletedReturnedId}`)
        .set('Authorization', `Bearer ${token2}`)
        .expect(401)
        .expect('Content-Type', /application\/json/)
      assert(deleteTestResult.body.error.includes('blog user does not match request user'))
    })
  })

  describe('a blog can be updated', () => {
    test('a blog can have its likes updated', async () => {
      const blogsAtStart = await helper.blogsInDb()
      const blogToUpdate = blogsAtStart[0]
      const newLikes = (((blogToUpdate.likes) + 3) * 4)
      const editedBlog = { ... blogToUpdate, likes: newLikes }

      await api
        .put(`/api/blogs/${blogToUpdate.id}`)
        .send(editedBlog)
      const blogsAtEnd = await helper.blogsInDb()
      const retrievedBlog = blogsAtEnd.filter((b) => b.id === blogToUpdate.id)[0]
      assert(retrievedBlog.likes !== blogToUpdate.likes)
      assert.strictEqual(retrievedBlog.likes, ((blogToUpdate.likes) +3) *4)
    })
  })
})

//TODO add test for deleting a blog

after(async () => {
  await mongoose.connection.close()
})