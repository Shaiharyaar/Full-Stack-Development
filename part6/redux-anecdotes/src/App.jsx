// @ts-nocheck
import { useDispatch, useSelector } from 'react-redux'
import { voteAnecdote } from './actions/anecdoteAction'
import AnecdoteList from './components/AnecdoteList'
import SubHeading from './components/SubHeading'
import AnecdoteForm from './forms/AnecdoteForm'
const App = () => {
  const anecdotes = useSelector((state) => state)
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(voteAnecdote(id))
  }

  return (
    <div>
      <SubHeading title={'Anecdotes'} />
      <AnecdoteList list={anecdotes} vote={vote} />
      <SubHeading title={'create new'} />
      <AnecdoteForm />
    </div>
  )
}

export default App
