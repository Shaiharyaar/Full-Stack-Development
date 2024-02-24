import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { ListGroup } from 'react-bootstrap'
import SubHeading from '../components/SubHeading'
const Blogs = () => {
  const id = useParams().id
  const blogs = useSelector(state => state.blog.list)
  const userBlogs = blogs.filter(blog => blog.user.id === id)

  if (!userBlogs.length) return null

  return (
    <div>
      <SubHeading title={userBlogs[0].user.name ?? 'Anonymous'} />
      <h3>{'Added blogs'}</h3>
      <ListGroup>
        {userBlogs &&
          userBlogs.map(blog => (
            <ListGroup.Item key={blog.id}>{blog.title}</ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  )
}

export default Blogs
