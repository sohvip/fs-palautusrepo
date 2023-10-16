import Togglable from './Togglable'
import PropTypes from 'prop-types'

const Blog = ({ blog, setLike, deleteBlog, user }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  return (
    <div style={blogStyle}>
      <div className="blog">
        {blog.title}
      </div>
      <Togglable buttonLabel="view">
        <p>{blog.url}</p>
        <p>likes {blog.likes} <button onClick={setLike}>like</button></p>
        <p>{blog.author}</p>
        {user !== blog.user.username ? null : <button onClick={deleteBlog}>delete</button>}
      </Togglable>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  setLike: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
}

export default Blog