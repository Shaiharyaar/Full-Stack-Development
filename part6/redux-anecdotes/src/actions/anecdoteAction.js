const getId = () => (100000 * Math.random()).toFixed(0)

export const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0,
  }
}

export const voteAnecdote = (id) => {
  const payload = {
    id,
  }
  return {
    type: 'VOTE_ANECDOTE',
    payload,
  }
}

export const createAnecdote = (anecdote) => {
  const payload = asObject(anecdote)
  return {
    type: 'CREATE_ANECDOTE',
    payload,
  }
}
