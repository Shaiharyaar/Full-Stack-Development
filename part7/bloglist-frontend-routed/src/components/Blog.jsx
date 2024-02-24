import { Link } from 'react-router-dom'

const Blog = ({ blog, user, onRemovePress }) => {
  const blogStyle = {
    padding: '10px 16px',
    border: '1px solid #777',
    borderRadius: 5,
    marginBottom: 6
  }

  const deleteButtonStyle = {
    color: 'white',
    backgroundColor: 'red'
  }

  return (
    <tr style={blogStyle} className={'blog'}>
      <td className={'blog-header'}>
        <Link to={`/blog/${blog.id}`}>
          <span className={'blog-title'}>{blog.title}</span>{' '}
          <span className={'blog-author'}>{blog.author}</span>{' '}
        </Link>
      </td>
      <td>
        {blog?.user?.username === user.username && (
          <button
            id={'blog-remove-id'}
            style={deleteButtonStyle}
            onClick={onRemovePress}
          >
            {'remove'}
          </button>
        )}
      </td>
    </tr>
  )
}
export default Blog
