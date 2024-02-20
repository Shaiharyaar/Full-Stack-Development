import axios from 'axios'
import { asObject } from '../redux/reducers/anecdoteReducer'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createNew = async (data) => {
  const object = asObject(data)
  const response = await axios.post(baseUrl, object)
  return response.data
}

export default { getAll, createNew }
