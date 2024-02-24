/* eslint-disable indent */
import { useDispatch, useSelector } from 'react-redux'
import SubHeading from '../components/SubHeading'

import { useParams } from 'react-router-dom'
import { setBlogList, updateBlog } from '../redux/reducers/blogReducer'
import AddComment from '../components/AddComment'
import commentService from '../services/comment'
import { ListGroup } from 'react-bootstrap'

const Blog = () => {
  const dispatch = useDispatch()
  const id = useParams().id
  const blogs = useSelector(state => state.blog.list)

  const blog = blogs.find(b => b.id === id)

  const onLikePress = () => {
    try {
      const payload = {
        title: blog.title,
        author: blog.author,
        likes: blog.likes + 1,
        url: blog.url,
        user: blog.user.id
      }

      dispatch(updateBlog(blog.id, payload))
    } catch (error) {
      console.log({ error: error.message })
    }
  }

  const onCommentSubmit = async e => {
    e.preventDefault()
    const comment = e.target.comment.value
    if (comment.trim() !== '') {
      const updatedBlog = {
        ...blog,
        comments: [...blog.comments, comment]
      }
      await commentService.update(blog.id, updatedBlog)
      const updatedBlogs = blogs.map(b => (b.id === blog.id ? updatedBlog : b))
      dispatch(setBlogList(updatedBlogs))
    } else {
      alert('Comment is empty')
    }
  }
  if (!blog) return null
  return (
    <div>
      <SubHeading title={`${blog.title} ${blog.author}`} />
      <ListGroup>
        <ListGroup.Item>
          <a href={blog.url} target={'_blank'} rel="noreferrer">
            {blog.url}
          </a>
        </ListGroup.Item>
        <ListGroup.Item>
          {blog.likes} likes<button onClick={onLikePress}>like</button>
        </ListGroup.Item>
        <ListGroup.Item>
          added by {blog?.user?.name ?? 'Anonymous'}
        </ListGroup.Item>

        <h3>{'comments'}</h3>
        <AddComment onSubmit={onCommentSubmit} />
        {blog.comments.length ? (
          <ListGroup as={'ol'} numbered style={{ marginTop: '10px' }}>
            {blog.comments.map((comment, key) => (
              <ListGroup.Item as={'li'} key={key}>
                {comment}
              </ListGroup.Item>
            ))}
          </ListGroup>
        ) : (
          <span>{'no comments'}</span>
        )}
      </ListGroup>
    </div>
  )
}

export default Blog
