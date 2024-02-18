import PropTypes from 'prop-types'
import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    createBlog({
      title,
      author,
      url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          type='text'
          value={title}
          name='Title'
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type='text'
          value={author}
          name='Author'
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input type='text' value={url} name='Url' onChange={({ target }) => setUrl(target.value)} />
      </div>
      <button type='submit'>Create Blog</button>
    </form>
  )
}

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
}

export default BlogForm
