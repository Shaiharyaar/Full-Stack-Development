import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import SubHeading from './components/SubHeading'
import AnecdoteForm from './forms/AnecdoteForm'
import { initializeAnecdotes } from './redux/reducers/anecdoteReducer'
const App = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())
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
