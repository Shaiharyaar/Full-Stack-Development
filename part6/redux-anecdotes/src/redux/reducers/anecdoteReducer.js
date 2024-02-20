import { createSlice } from '@reduxjs/toolkit'
import anecdotesService from '../../services/anecdotes'
import { setNotification } from './notificationReducer'
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
    appendAnecdote(state, action) {
      return [...state, action.payload]
    },
    updateAnecdote(state, action) {
      return state.map((anecdote) =>
        anecdote.id !== action.payload.id ? anecdote : action.payload
      )
    },
    setAnecdote(state, action) {
      return action.payload
    },
  },
})

export const { appendAnecdote, updateAnecdote, setAnecdote: setAnecdotes } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = (anecdote) => {
  return async (dispatch) => {
    const newAnecdote = await anecdotesService.createNew(anecdote)
    dispatch(appendAnecdote(newAnecdote))
    dispatch(setNotification(`You added anecdote "${anecdote}"`, 5000))
  }
}

export const voteAnecdote = (anecdote) => {
  return async (dispatch) => {
    const id = anecdote.id

    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    }

    const res = await anecdotesService.update(id, updatedAnecdote)
    dispatch(updateAnecdote(res))
  }
}

export default anecdoteSlice.reducer
