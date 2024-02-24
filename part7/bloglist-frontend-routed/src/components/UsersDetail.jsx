import { useEffect } from 'react'
import { useResource } from '../hooks'
import { Table } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const UsersDetail = () => {
  const [users, usersActions] = useResource('/api/users')

  const blogs = useSelector(state => state.blog.list)

  useEffect(() => {
    usersActions.getAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blogs])

  return (
    <Table striped>
      <thead>
        <tr>
          <th></th>
          <th>blogs created</th>
        </tr>
      </thead>
      <tbody>
        {users &&
          users.map(u => (
            <tr key={u.id}>
              <td>
                <Link to={`/user/${u.id}`}>{u.name ?? 'Anonymous'}</Link>
              </td>
              <td>{u.blogs.length}</td>
            </tr>
          ))}
      </tbody>
    </Table>
  )
}

export default UsersDetail
