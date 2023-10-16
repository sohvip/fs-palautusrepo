import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }

  return (
    <div className="error">
      {message}
    </div>
  )
}

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const addBlog = blogObject => {
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(response => {
        setBlogs(blogs.concat(response))
      })
    setMessage(`a new blog ${blogObject.title} by ${blogObject.author} added`)
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }

  const handelLike = blogObject => {
    const requestData = {
      user: blogObject.user.id,
      likes: blogObject.likes + 1,
      author: blogObject.author,
      title: blogObject.title,
      url: blogObject.url
    }
    blogService
      .like(requestData, blogObject.id)
      .then(response => {
        setBlogs(blogs.map(blog => blog.id === blogObject.id ? response : blog))
      })
  }

  const deletingBlog = blogId => {
    if (window.confirm('Do you really want to delete this blog?')) {
      blogService
        .deleteBlog(blogId)
        .then(() => {
          setBlogs(allBlogs => allBlogs.filter(blog => blog.id !== blogId))
        })
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessage('wrong username or password')
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          id="username"
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          id="password"
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button id="login-button" type="submit">login</button>
    </form>
  )

  const blogFormRef = useRef()

  const blogForm = () => {
    return (
      <Togglable buttonLabel="new blog" ref={blogFormRef}>
        <BlogForm
          createBlog={addBlog}
        />
      </Togglable>
    )
  }

  if (user === null) {
    return (
      <div>
        <Notification message={message} />
        <h2>Log in to application</h2>
        {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification message={message} />
      <div>
        {user.name} logged in
        <button id="logout-button" onClick={() => {
          window.localStorage.removeItem('loggedBlogappUser')
          setUser(null)}}>
          logout
        </button>
      </div>
      <br></br>
      <h2>create new</h2>
      <div>
        {blogForm()}
      </div>
      <br></br>
      <div>
        {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} setLike={() => handelLike(blog)} deleteBlog={() => deletingBlog(blog.id)} user={user.username}/>
        )}
      </div>
    </div>
  )
}

export default App
