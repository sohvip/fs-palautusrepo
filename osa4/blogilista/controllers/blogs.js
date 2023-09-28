const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})

blogsRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)

    if (blog.title === undefined) {
      response.status(400).end()
    } else if (blog.url === undefined) {
      response.status(400).end()
    } else {
      if (blog.likes === undefined) {
        blog.likes = 0
      }
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndRemove(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, body, { new: true })
  response.status(200).json(updatedBlog)
})

module.exports = blogsRouter
