import React from 'react'
import Blog from './Blog'

const Blogs = ({ list, user, onLikePress, onRemovePress }) => {
  return (
    <>
      {list
        .sort((a, b) => b.likes - a.likes)
        .map((blog) => (
          <div key={blog.id}>
            <Blog
              blog={blog}
              user={user}
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
