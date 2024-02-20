import { useDispatch } from 'react-redux'
import { createAnecdote } from '../redux/reducers/anecdoteReducer'
const AnecdoteForm = () => {
  const dispatch = useDispatch()

  const onSubmit = async (e) => {
    e.preventDefault()
    const anecdote = e.target.anecdote.value
    e.target.anecdote.value = ''
    dispatch(createAnecdote(anecdote))
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
