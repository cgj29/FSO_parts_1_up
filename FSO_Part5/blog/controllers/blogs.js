const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const middleware = require('../utils/middleware')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', {
      username: 1,
      name: 1
    })
  response.json(blogs)
})

blogsRouter.get('/:id', async(request, response) => {
  const blog = await Blog.findById(request.params.id).populate(
    'user', { username:1,  name:1 }
  )
  if (!blog.id){
    return response.status(401).json({ error: 'blog not found' })
  }
  return response.json(blog)
})

blogsRouter.post('/', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const body = request.body
  const newBlog = new Blog({
    ...body,
    user: request.user,
    likes: body.likes || 0
  })

  if((!newBlog.title) || (!newBlog.url)){
    response.status(400).end()
  } else {
    const savedBlog = await newBlog.save()
    request.user.blogs = request.user.blogs.concat(savedBlog.id)
    await request.user.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', middleware.tokenExtractor, middleware.userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (!blog.id){
    return response.status(401).json({ error: 'blog not found' })
  }
  if (request.user.toJSON().id === blog.user.toString()){
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'blog user does not match request user' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }
  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

module.exports = blogsRouter