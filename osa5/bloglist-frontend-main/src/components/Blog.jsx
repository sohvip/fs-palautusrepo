import Togglable from "./Togglable"

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
      <div>
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

export default Blog