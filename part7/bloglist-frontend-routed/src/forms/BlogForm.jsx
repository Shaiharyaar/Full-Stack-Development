import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
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
    <Form onSubmit={addBlog}>
      <Form.Group>
        <Form.Label>Title:</Form.Label>
        <Form.Control
          id={'blog-title-id'}
          type="text"
          value={title}
          name="Title"
          placeholder={'Enter title'}
          onChange={({ target }) => setTitle(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>author</Form.Label>
        <Form.Control
          id={'blog-author-id'}
          type="text"
          value={author}
          name="Author"
          placeholder={'Enter author name'}
          onChange={({ target }) => setAuthor(target.value)}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label>url</Form.Label>
        <Form.Control
          id={'blog-url-id'}
          type="text"
          value={url}
          name="Url"
          placeholder={'Enter url'}
          onChange={({ target }) => setUrl(target.value)}
        />
      </Form.Group>
      <Button id={'blog-submit-btn-id'} variant={'primary'} type="submit">
        Create Blog
      </Button>
    </Form>
  )
}

BlogForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired
}

export default BlogForm
