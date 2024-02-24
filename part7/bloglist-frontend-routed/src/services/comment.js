import axios from 'axios'
const baseUrl = '/api/blogs'

const update = async (id, updatedBlog) => {
  const res = await axios.put(`${baseUrl}/${id}/comments`, updatedBlog)
  return res.data
}

export default { update }
