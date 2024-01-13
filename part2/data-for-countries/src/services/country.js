import axios from 'axios'
const baseURL = `https://studies.cs.helsinki.fi/restcountries`
const get = async (name) => {
  const response = await axios.get(`${baseURL}/api/name/${name}`)
  return response.data
}
const getAll = async () => {
  const response = await axios.get(`${baseURL}/api/all`)
  return response.data
}

export default { get, getAll }
