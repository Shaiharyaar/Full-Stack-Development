import { useDispatch } from 'react-redux'
import { createAnecdote } from '../redux/reducers/anecdoteReducer'
import { updateNotification } from '../redux/reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    const newAnecdote = await anecdoteService.createNew(anecdote)
    console.log({ newAnecdote })
    // dispatch(createAnecdote(newAnecdote))
    // dispatch(updateNotification(`You added anecdote "${anecdote}"`))
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <input name={'anecdote'} />
      </div>
      <button type={'submit'}>create</button>
    </form>
  )
}

export default AnecdoteForm
