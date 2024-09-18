const { test, describe } = require('node:test')
const assert = require('node:assert')
const listHelper = require('../utils/list_helper')

describe('dummy test set 1', () => {
  test('dummy returns one', () => {
    assert.strictEqual(listHelper.dummy([]), 1)
  })
})

const emptyList = []
const listWithOneBlog = [
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'https://homepages.cwi.nl/~storm/teaching/reader/Dijkstra68.pdf',
    likes: 5,
    __v: 0
  }
]
const listWithManyBlogs = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

describe('total likes', () => {
  test('when there are no blogs, total likes is 0', () => {
    assert.strictEqual(listHelper.totalLikes(emptyList), 0)
  })
  test('when list has only one blog, equals like of that blog', () => {
    assert.strictEqual(listHelper.totalLikes(listWithOneBlog), listWithOneBlog[0]['likes'])
  })
  test('when there are many blogs, the returned total is the total', () => {
    assert.strictEqual(listHelper.totalLikes(listWithManyBlogs),  36)
  })
})

describe('favorite blog', () => {
  test('when there are no blogs, default answer is returned', () => {
    assert.strictEqual(listHelper.favoriteBlog(emptyList), 'No blogs to review')
  })

  test('when there is one blogs, that blog is returned', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithOneBlog), {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('When there are many blogs, the returned blog is the most liked', () => {
    assert.deepStrictEqual(listHelper.favoriteBlog(listWithManyBlogs), {
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      likes: 12,
    })
  })
})

describe('author with the most blogs', () => {
  test('when there are no blogs, default answer is returned', () => {
    assert.strictEqual(listHelper.mostBlogs(emptyList), 'No blogs to review')
  })

  test('when there is one blogs, its author is returned', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithOneBlog), {
      author: 'Edsger W. Dijkstra',
      blogs: 1,
    })
  })

  test('When there are many blogs, the returned author has the most blogs', () => {
    assert.deepStrictEqual(listHelper.mostBlogs(listWithManyBlogs), {
      author: 'Robert C. Martin',
      blogs: 3,
    })
  })
})

describe('author with the most likes', () => {
  test('when there are no blogs, default answer is returned', () => {
    assert.strictEqual(listHelper.mostLikes(emptyList), 'No blogs to review')
  })

  test('when there is one blogs, its author is returned', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithOneBlog), {
      author: 'Edsger W. Dijkstra',
      likes: 5,
    })
  })

  test('when there are many blogs, the author with the most likes is returned', () => {
    assert.deepStrictEqual(listHelper.mostLikes(listWithManyBlogs), {
      author: 'Edsger W. Dijkstra',
      likes: 17,
    })
  })
})