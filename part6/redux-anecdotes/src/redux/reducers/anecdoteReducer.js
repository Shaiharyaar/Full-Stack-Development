import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

const initialState = []

const anecdoteSlice = createSlice({
  name: 'anecdote',
  initialState,
  reducers: {
    createAnecdote(state, action) {
      return [...state, action.payload]
    },
    voteAnecdote(state, action) {
      const id = action.payload
      const anecdoteToChange = state.find((a) => a.id === id)
      const updatedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anecdote) => (anecdote.id !== id ? anecdote : updatedAnecdote))
    },
    setAnecdote(state, action) {
      return action.payload
    },
  },
})

export const { createAnecdote, voteAnecdote, setAnecdote } = anecdoteSlice.actions

export default anecdoteSlice.reducer
