const BlogForm = ({
    addBlog,
    title,
    handleTitleChange,
    author,
    handleAuthorChange,
    url,
    handleUrlChange
    }) => {
    return (
        <div>
            <form onSubmit={addBlog}>
                <p>title:
                <input
                    value={title}
                    onChange={handleTitleChange}
                /></p>
                <p>author:
                <input
                    value={author}
                    onChange={handleAuthorChange}
                /></p>
                <p>url:
                <input
                    value={url}
                    onChange={handleUrlChange}
                /></p>
                <button type="submit">create</button>
            </form>
        </div>
    )
}

export default BlogForm
