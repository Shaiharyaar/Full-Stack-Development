import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAnecdotes = async () => axios.get(baseUrl).then((res) => res.data)

const createAnecdote = async (data) => axios.post(baseUrl, data).then((res) => res.data)

const updateAnecdote = async (updatedAnecdote) =>
  axios.put(`${baseUrl}/${updatedAnecdote.id}/`, updatedAnecdote).then((res) => res.data)

export { getAnecdotes, createAnecdote, updateAnecdote }
