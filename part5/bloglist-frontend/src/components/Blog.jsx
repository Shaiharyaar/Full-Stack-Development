import BlogTogglable from './BlogTogglable'

const Blog = ({ blog, onLikePress, onRemovePress }) => {
  const blogStyle = {
    padding: '10px 16px',
    border: '1px solid #777',
    borderRadius: 5,
    marginBottom: 6,
  }

  const deleteButtonStyle = {
    color: 'white',
    backgroundColor: 'red',
  }

  return (
    <div style={blogStyle}>
      <BlogTogglable label={`${blog.title} ${blog.author}`}>
        <a href={blog.url} target={'_blank'} rel={'noreferrer'}>
          {blog.url}
        </a>
        <div>
          likes {blog.likes} <button onClick={onLikePress}>{'like'}</button>
        </div>
        <div>{blog?.user?.name ?? 'Anonymous'}</div>
        <button style={deleteButtonStyle} onClick={onRemovePress}>
          {'remove'}
        </button>
      </BlogTogglable>
    </div>
  )
}
export default Blog
