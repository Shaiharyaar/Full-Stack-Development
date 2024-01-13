import axios from 'axios'
const baseURL = `http://localhost:3001/persons`
const getAll = async () => {
  const response = await axios.get(baseURL)
  return response.data
}
const create = async (data) => {
  const response = await axios.post(baseURL, data)
  return response.data
}
const update = async (id, data) => {
  const response = await axios.put(`${baseURL}/${id}/`, data)
  return response.data
}
const remove = async (id) => {
  const response = await axios.delete(`${baseURL}/${id}/`)
  return response.data
}

export default { getAll, create, update, remove }
