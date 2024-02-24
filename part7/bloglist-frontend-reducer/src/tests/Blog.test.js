import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import Blog from '../components/Blog'
import BlogForm from '../forms/BlogForm'
import userEvent from '@testing-library/user-event'

const blog = {
  title: 'Blog title',
  author: 'Shaiharyaar',
  url: 'www.facebook.com',
  likes: 0
}
test('renders blog', () => {
  render(<Blog blog={blog} />)

  const title = screen.getAllByText(`${blog.title}`)
  const author = screen.getAllByText(`${blog.author}`)
  expect(title).toBeDefined()
  expect(author).toBeDefined()
})

test('renders title and author, not url and likes', () => {
  const { container } = render(<Blog blog={blog} />)

  const title = container.querySelector('.blog-title')
  const author = container.querySelector('.blog-author')
  const url = container.querySelector('.blog-url')
  const likes = container.querySelector('.blog-likes')

  expect(title).toBeVisible()
  expect(author).toBeVisible()
  expect(url).not.toBeVisible()
  expect(likes).not.toBeVisible()
})

test('url, likes, and user visible after clicking on show button', async () => {
  const { container } = render(<Blog blog={blog} />)

  const showHideBtn = container.querySelector('.blog-toggle-btn')
  await userEvent.click(showHideBtn)

  const url = container.querySelector('.blog-url')
  const likes = container.querySelector('.blog-likes')
  const user = container.querySelector('.blog-user')

  expect(url).toBeVisible()
  expect(likes).toBeVisible()
  expect(user).toBeVisible()
})

test('like button is clicked twice', async () => {
  const mockLikeFn = jest.fn()
  const user = userEvent.setup()

  const { container } = render(<Blog blog={blog} onLikePress={mockLikeFn} />)

  const likeBtn = container.querySelector('.blog-like-btn')

  await user.click(likeBtn)
  await user.click(likeBtn)

  expect(mockLikeFn.mock.calls).toHaveLength(2)
})

test('handle blog form submit', async () => {
  const mockSubmitHandler = jest.fn()
  const user = userEvent.setup()

  render(<BlogForm handleSubmit={mockSubmitHandler} />)

  const titleInput = screen.getByPlaceholderText('Enter title')
  const authorInput = screen.getByPlaceholderText('Enter author name')
  const urlInput = screen.getByPlaceholderText('Enter url')

  const createButton = screen.getByText('Create Blog')

  await user.type(titleInput, 'blog title')
  await user.type(authorInput, 'author name')
  await user.type(urlInput, 'some url')

  await user.click(createButton)

  expect(mockSubmitHandler).toHaveBeenCalledTimes(1)
  expect(mockSubmitHandler.mock.calls).toHaveLength(1)
  expect(mockSubmitHandler.mock.calls[0][0]).toEqual({
    title: 'blog title',
    author: 'author name',
    url: 'some url'
  })
})
