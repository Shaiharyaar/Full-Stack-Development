import PropTypes from 'prop-types'
const AnecdoteList = ({ list, vote }) => {
  return (
    <div>
      {list.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

AnecdoteList.propTypes = {
  list: PropTypes.arrayOf(PropTypes.object),
  vote: PropTypes.func,
}

export default AnecdoteList
