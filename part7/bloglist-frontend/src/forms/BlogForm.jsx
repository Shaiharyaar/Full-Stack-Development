import PropTypes from 'prop-types'
import React, { useState } from 'react'

const BlogForm = ({ handleSubmit }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = e => {
    e.preventDefault()
    handleSubmit({
      title,
      author,
      url
    })
      .then(res => {
        if (res) {
          setTitle('')
          setAuthor('')
          setUrl('')
        }
      })
      .catch(err => {
        console.log({ err })
      })
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        title
        <input
          id={'blog-title-id'}
          type="text"
          value={title}
          name="Title"
          placeholder={'Enter title'}
          onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
        author
        <input
          id={'blog-author-id'}
          type="text"
          value={author}
          name="Author"
          placeholder={'Enter author name'}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
        url
        <input
          id={'blog-url-id'}
          type="text"
          value={url}
          name="Url"
          placeholder={'Enter url'}
          onChange={({ target }) => setUrl(target.value)}
        />
      </div>
      <button id={'blog-submit-btn-id'} type="submit">
        Create Blog
      </button>
    </form>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default BlogForm
