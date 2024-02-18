import React from 'react'
import Blog from './Blog'

const Blogs = ({ list, onLikePress, onRemovePress }) => {
  return (
    <>
      {list
        .sort((a, b) => a.likes - b.likes)
        .map((blog) => (
          <div key={blog.id}>
            <Blog
              blog={blog}
              onLikePress={onLikePress(blog)}
              onRemovePress={onRemovePress(blog)}
            />
            {/* <button onClick={handleDelete(blog)}>{'Delete'}</button> */}
          </div>
        ))}
    </>
  )
}

export default Blogs
