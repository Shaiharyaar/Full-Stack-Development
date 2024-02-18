import { useState } from 'react'

const Blog = ({ blog, onLikePress, onRemovePress }) => {
  const [show, setShow] = useState(false)

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

  const toggleShow = () => setShow(!show)

  return (
    <div style={blogStyle} className={'blog'}>
      <div className={'blog-header'}>
        <span className={'blog-title'}>{blog.title}</span>{' '}
        <span className={'blog-author'}>{blog.author}</span>{' '}
        <button className={'blog-toggle-btn'} onClick={toggleShow}>
          {show ? 'hide' : 'view'}
        </button>
        <div style={{ display: show ? '' : 'none' }}>
          <a className={'blog-url'} href={blog.url} target={'_blank'} rel={'noreferrer'}>
            {blog.url}
          </a>
          <div className={'blog-likes'}>
            likes {blog.likes}{' '}
            <button className={'blog-like-btn'} onClick={onLikePress}>
              {'like'}
            </button>
          </div>
          <div className={'blog-user'}>{blog?.user?.name ?? 'Anonymous'}</div>
          <button style={deleteButtonStyle} onClick={onRemovePress}>
            {'remove'}
          </button>
        </div>
      </div>
    </div>
  )
}
export default Blog
