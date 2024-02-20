import { asObject } from '../actions/anecdoteAction'

const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
]

const initialState = anecdotesAtStart.map(asObject)

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CREATE_ANECDOTE':
      return [...state, action.payload]
    case 'VOTE_ANECDOTE': {
      const id = action.payload.id

      const anecdoteToChange = state.find((a) => a.id === id)
      const updatedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      return state.map((anecdote) => (anecdote.id !== id ? anecdote : updatedAnecdote))
    }

    default:
      return state
  }
}

export default reducer
