import { useEffect } from 'react'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import SubHeading from './components/SubHeading'
import AnecdoteForm from './forms/AnecdoteForm'
import anecdoteService from './services/anecdotes'
import { useDispatch } from 'react-redux'
import { setAnecdote } from './redux/reducers/anecdoteReducer'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    anecdoteService.getAll().then((anecdote) => dispatch(setAnecdote(anecdote)))
  }, [dispatch])

  return (
    <div>
      <SubHeading title={'Anecdotes'} />
      <Filter />
      <Notification />
      <AnecdoteList />
      <SubHeading title={'create new'} />
      <AnecdoteForm />
    </div>
  )
}

export default App
