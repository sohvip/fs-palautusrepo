const mongoose = require('mongoose')
const supertest = require('supertest')
const bcrypt = require('bcrypt')
const helper = require('./test_helper')
const app = require('../app')

const api = supertest(app)

const Blog = require('../models/blog')
const User = require('../models/user')

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(helper.initialBlogs)
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })
    await user.save()
})

test('blogs are returned as json', async () => {
    await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('a specific note is within the returned blogs', async () => {
    const response = await api.get('/api/blogs')

    const content = response.body.map(r => r.title)

    expect(content).toContain('React patterns')
})

test('id field is named id', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body[0].id).toBeDefined()
})

test('blog is added', async () => {
    const user = {
        username: "root",
        password: "sekret"
    }

    const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }

    const response = await api
        .post('/api/login')
        .send(user)
        .expect(200)

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${response.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)

    const contents = blogsAtEnd.map(b => b.title)
    expect(contents).toContain('Canonical string reduction')
})

test('missing likes field equals 0 likes', async () => {
    const user = {
        username: "root",
        password: "sekret"
    }

    const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          __v: 0
    }

    const response = await api
        .post('/api/login')
        .send(user)
        .expect(200)

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${response.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd[blogsAtEnd.length - 1].likes).toBe(0)
})

test('new blog with missing title or url field gives error', async () => {
    const user = {
        username: "root",
        password: "sekret"
    }

    const response = await api
        .post('/api/login')
        .send(user)
        .expect(200)

    const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          __v: 0
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${response.body.token}`)
        .send(newBlog)
        .expect(400)

    const newBlog_2 = {
        _id: "5a422b3a1b54a676234d17f9",
            title: "Canonical string reduction",
            author: "Edsger W. Dijkstra",
            __v: 0
    }

    await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${response.body.token}`)
        .send(newBlog_2)
        .expect(400)

})

test('deletion succeeds with status code 204', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const user = {
        username: "root",
        password: "sekret"
    }

    const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    }

    const login = await api
        .post('/api/login')
        .send(user)
        .expect(200)

    const response = await api
        .post('/api/blogs')
        .set('Authorization', `Bearer ${login.body.token}`)
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogId = response.body.id

    await api
        .delete(`/api/blogs/${blogId}`)
        .set('Authorization', `Bearer ${login.body.token}`)
        .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    const titles = blogsAtEnd.map(b => b.title)

    expect(titles).not.toContain(response.body.title)
})

test('blog is modified successfully', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToModify = blogsAtStart[0]
    const blogId = blogToModify.id

    const modifiedBlog = {
        likes: 15
    }

    await api
        .put(`/api/blogs/${blogId}`)
        .send(modifiedBlog)
        .expect(200)
    
    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(blogsAtStart.length)

    expect(blogsAtEnd[0].likes).toBe(15)
})

test('adding blog isnt possible without id', async () => {
    const newBlog = {
        _id: "5a422b3a1b54a676234d17f9",
          title: "Canonical string reduction",
          author: "Edsger W. Dijkstra",
          url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
          likes: 12,
          __v: 0
    }

    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(401)
})

afterAll(async () => {
    await mongoose.connection.close()
})
