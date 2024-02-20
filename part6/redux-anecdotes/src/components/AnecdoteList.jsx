// @ts-nocheck
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from '../redux/reducers/anecdoteReducer'
import { updateNotification } from '../redux/reducers/notificationReducer'
const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state.anecdotes)
  const filterWord = useSelector((state) => state?.filter)

  const vote = (anecdote) => {
    dispatch(voteAnecdote(anecdote.id))
    dispatch(updateNotification(`You voted '${anecdote.content}'`))
  }
  return (
    <div>
      {anecdotes &&
        anecdotes.map(
          (anecdote) =>
            anecdote.content.toLowerCase().includes(filterWord.toLowerCase()) && (
              <div key={anecdote.id}>
                <div>{anecdote.content}</div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote)}>vote</button>
                </div>
              </div>
            )
        )}
    </div>
  )
}

AnecdoteList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  vote: PropTypes.func,
}

export default AnecdoteList
