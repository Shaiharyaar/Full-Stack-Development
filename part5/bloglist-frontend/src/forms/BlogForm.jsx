import PropTypes from 'prop-types'
import React, { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (e) => {
    e.preventDefault()
    handleSubmit({
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
          placeholder={'Enter title'}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          type='text'
          value={author}
          name='Author'
          placeholder={'Enter author name'}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          type='text'
          value={url}
          name='Url'
          placeholder={'Enter url'}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button type='submit'>Create Blog</button>
    </form>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
}

export default BlogForm
