import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <p>title:
          <input
            id="title"
            value={title}
            onChange={event => setTitle(event.target.value)}
          />
        </p>
        <p>author:
          <input
            id="author"
            value={author}
            onChange={event => setAuthor(event.target.value)}
          />
        </p>
        <p>url:
          <input
            id="url"
            value={url}
            onChange={event => setUrl(event.target.value)}
          />
        </p>
        <button id="create-button" type="submit">create</button>
      </form>
    </div>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired
}

export default BlogForm
