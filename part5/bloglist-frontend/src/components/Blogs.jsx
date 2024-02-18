import React from 'react'
import Blog from './Blog'

const Blogs = ({ list }) => {
  return (
    <>
      {list.map((blog) => (
        <div key={blog.id}>
          <Blog blog={blog} />
          {/* <button onClick={handleDelete(blog)}>{'Delete'}</button> */}
        </div>
      ))}
    </>
  )
}

export default Blogs
